import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import MusicPlayer from './../organisms/MusicPlayer';
import FlashHandler from './../organisms/FlashHandler';
import { 
  setLastShow, 
  setNextShow, 
  setShowRightNow,
  turnShowOff,
  executeJob,
  wipeJobs,
  fetchJobs
} from './../../redux/actions/show';
import { connect } from 'react-redux';
import Paho from 'paho-mqtt';
import uuidv4 from 'uuid/v4';

library.add(faSync);

function Show (props) {
  const { colors, flash } = props.show;
  
  const spring = useSpring({ 
    height: colors.running ? '100vh' : '0vh',
    backgroundColor: colors.running ? colors.current.payload : '#313131'
  });

  const [isLoading, setLoading] = useState(true);
  
  const mqttHost = '192.168.1.3';
  const mqttPort = 9001;
  const mqttClientId = uuidv4();
  const mqttClient = new Paho.Client(mqttHost, mqttPort, mqttClientId);
  const intervals = { colors: null, flash: null };
  const timeouts = { colors: null, flash: null };

  /**
   * Fetching jobs from database
   */
  useEffect(() => {
    props.fetchJobs(props.event._id, new Date())
      .then(() => setLoading(false));
    
    return () => props.wipeJobs();
  }, [])
  
  /**
   * Connection to mqtt broker
   */
  useEffect(() => {
    function onMqttConnection () {
      console.log('Connected');
      let { Empresa_id, _id } = props.event;
      mqttClient.subscribe(`/${Empresa_id}/${_id}`);
    }

    mqttClient.connect({
      // useSSL: true,
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
    } else {
      clearInterval(intervals.colors)
      clearTimeout(timeouts.colors)
    }

    // if (flash.current) {
    //   clearInterval(intervals.flash);
    //   clearTimeout(timeouts.flash);

    //   let now = new Date();
    //   let delay = flash.current.startTime - now.getTime();

    //   if (delay > 0) {
    //     timeouts.flash = setTimeout(props.executeJob, delay, flash.current.type);
    //   } else {
    //     props.executeJob(flash.current.type);
    //   }
      
    //   intervals.flash = setInterval(checkCurrentShow, 1000, flash.current, 'flash');
    // } else {
    //   clearInterval(intervals.flash);
    //   clearTimeout(timeouts.flash);
    // }

    return () => {
      clearInterval(intervals.colors);
      // clearInterval(intervals.flash);
      clearTimeout(timeouts.colors);
      // clearTimeout(timeouts.flash);
    }
  }, [colors.current /*, flash.current */]);

  /**
   * Turning Flash ON/OFF 
   */
  // useEffect(() => {
  //   if (flash.running) {
  //     window.plugins.flashlight.switchOn(() => console.log('switced on'));
  //   } else {
  //     window.plugins.flashlight.switchOff();
  //   }

  //   return () => window.plugins.flashlight.switchOff();
  // }, [flash.running]);

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

  if (isLoading) {
    return (
      <div className="abs-center">
        <FontAwesomeIcon icon="sync" size="lg" spin />
      </div>
    );
  }

  return (
    <div>
      <animated.div style={{width: '100%', ...spring}}>
      </animated.div>
      <FlashHandler />
      <MusicPlayer />
    </div>
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
  wipeJobs: () => dispatch(wipeJobs()),
  fetchJobs: (event, time, apiKey) => dispatch(fetchJobs(event, time, apiKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);