import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { 
  setLastShow, 
  setNextShow, 
  setShowRightNow,
  turnShowOff,
  executeJob
} from './../../redux/actions/show'
import { connect } from 'react-redux';
import Paho from 'paho-mqtt';
import uuidv4 from 'uuid/v4';

function Show (props) {
  const { colors, flash } = props.show;
  const spring = useSpring({ 
    height: colors.running ? '100vh' : '0vh',
    backgroundColor: colors.running ? colors.current.payload : '#313131'
  });
  
  const mqttHost = '192.168.1.3';
  const mqttPort = 9001;
  const mqttClientId = uuidv4();
  const mqttClient = new Paho.Client(mqttHost, mqttPort, mqttClientId);
  const intervals = { colors: null, flash: null };
  const timeouts = { colors: null, flash: null };
  
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
      clearInterval(intervals.colors)
      clearTimeout(timeouts.colors)

      let now = new Date();
      let delay = colors.current.startTime - now.getTime();

      if (delay > 0) {
        timeouts.colors = setTimeout(props.executeJob, delay, colors.current.type);
      } else {
        props.executeJob(colors.current.type);
      }
      
      intervals.colors = setInterval(checkCurrentShow, 1000, colors.current, 'colors');
    }

    if (flash.current) {
      clearInterval(intervals.flash);
      clearTimeout(timeouts.flash);

      let now = new Date();
      let delay = flash.current.startTime - now.getTime();

      if (delay > 0) {
        timeouts.flash = setTimeout(props.executeJob, delay, flash.current.type);
      } else {
        props.executeJob(flash.current.type);
      }
      
      intervals.flash = setInterval(checkCurrentShow, 1000, flash.current, 'flash');
    }

    return () => {
      clearInterval(intervals.colors);
      clearInterval(intervals.flash);
      clearTimeout(timeouts.colors);
      clearTimeout(timeouts.flash);
    }
  }, [colors.current, flash.current]);

  /**
   * Turning Flash ON/OFF 
   */
  useEffect(() => {
    if (flash.running) {
      console.log('switch on');
      window.plugins.flashlight.switchOn(() => console.log('switced on'));
    } else {
      console.log('switch on');
      window.plugins.flashlight.switchOff();
    }

    return () => window.plugins.flashlight.switchOff();
  }, [flash.running]);

  /**
   * Turning Event Off
   */
  function checkCurrentShow (job, type) {
    let now = new Date();

    if (now.getTime() >= parseInt(job.endTime)) {
      console.log(`Stopping show ${job.type}`);
      props.turnShowOff(job)
      clearInterval(intervals[type]);
    } else {
      console.log(`Running show ${job.type}`);
    }
  }
  
  function onMessageArrived (message) {
    const [type, momment, id, payload, startTime, endTime] = message.payloadString.split(',');
    const job = { id, momment, type, payload, startTime, endTime, running: false };

    switch (parseInt(momment)) {
      case 1:
        return props.setShowRightNow(job);
      case 2:
        return props.setNextShow(job);
      case 3:
        return props.setLastShow(job);
      case 0:
        return props.turnShowOff({...job, type: job.payload});
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
  executeJob: (type) => dispatch(executeJob(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);