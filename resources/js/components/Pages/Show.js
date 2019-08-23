import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { 
  setLastShow, 
  setNextShow, 
  setShowRightNow,
  turnShowOff 
} from './../../redux/actions/show'
import { connect } from 'react-redux';
import Paho from 'paho-mqtt';
import uuidv4 from 'uuid/v4';

function Show (props) {
  const { colors, flash } = props.show;
  const spring = useSpring({ 
    height: colors.current ? '100vh' : '0vh',
    backgroundColor: colors.current ? colors.current.payload : '#313131'
  });
  
  const mqttHost = 'mqtt.oneshow.com.ar';
  const mqttPort = 11344;
  const mqttClientId = uuidv4();
  const mqttClient = new Paho.Client(mqttHost, mqttPort, mqttClientId);
  const trackers = { colors: null, flash: null };
  
  /**
   * Connection to mqtt broker
   */
  useEffect(() => {
    function onMqttConnection () {
      let { Empresa_id, _id } = props.event;
      mqttClient.subscribe(`/${Empresa_id}/${_id}`);
    }

    mqttClient.connect({
      onSuccess: onMqttConnection
    })

    mqttClient.onMessageArrived = onMessageArrived;

    return () => mqttClient.disconnect();
  }, [])

  /**
   * Time Tracker
   */
  useEffect(() => {
    if (colors.current) {
      if (trackers.colors) 
        clearInterval(trackers.colors)
      trackers.colors = setInterval(checkCurrentShow, 1000, colors.current, 'colors');
    }

    if (flash.current) {
      if (trackers.flash) 
        clearInterval(trackers.flash)
      trackers.flash = setInterval(checkCurrentShow, 1000, flash.current, 'flash');
    }

    return () => {
      clearInterval(trackers.colors);
      clearInterval(trackers.flash);
    }
  }, [colors, flash]);

  /**
   * Turning Flash ON/OFF 
   */
  useEffect(() => {
    if (flash.current) {
      window.plugins.flashlight.switchOn();
    } else {
      window.plugins.flashlight.switchOff();
    }

    return () => window.plugins.flashlight.switchOff();
  }, [flash.current]);

  /**
   * Turning Event Off
   */
  function checkCurrentShow (job, type) {
    let now = new Date();

    console.log('now', now.getTime());
    console.log('job', job.endTime);

    if (now.getTime() >= parseInt(job.endTime)) {
      console.log(`Stopping show ${job.type}`);
      props.turnShowOff(job)
      clearInterval(trackers[type]);
    } else {
      console.log(`Running show ${job.type}`);
    }
  }
  
  function onMessageArrived (message) {
    const [type, momment, id, payload, startTime, endTime] = message.payloadString.split(',');
    const job = { id, momment, type, payload, startTime, endTime };

    switch (parseInt(momment)) {
      case 1:
        return props.setShowRightNow(job);
      case 2:
        return props.setNextShow(job);
      case 3:
        return props.setLastShow(job);
      case 0:
        return props.turnShowOff(job);
    }
  }

  return (
    <animated.div style={{width: '100%', ...spring}}>
    </animated.div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current,
  show: state.show,
});

const mapDispatchToProps = dispatch => ({
  setLastShow: (job) => dispatch(setLastShow(job)),
  setNextShow: (job) => dispatch(setNextShow(job)),
  setShowRightNow: (job) => dispatch(setShowRightNow(job)),
  turnShowOff: (job) => dispatch(turnShowOff(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);