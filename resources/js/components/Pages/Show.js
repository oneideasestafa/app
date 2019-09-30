import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MusicEvent from '../organisms/MusicEvent';
import FlashEvent from '../organisms/FlashEvent';
import ColorEvent from '../organisms/ColorEvent';
import VideoEvent from '../organisms/VideoEvent';
import PictureEvent from '../organisms/PictureEvent';
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

function Show (props) {
  const [isLoading, setLoading] = useState(true);  
  const mqttHost = process.env.MIX_MQTT_HOST;
  const mqttPort = parseInt(process.env.MIX_MQTT_PORT);
  const mqttClientId = uuidv4();
  const mqttClient = new Paho.Client(mqttHost, mqttPort, mqttClientId);

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
      useSSL: process.env.NODE_ENV === 'development' ? false : true,
      onSuccess: onMqttConnection
    })

    mqttClient.onMessageArrived = onMessageArrived;

    return () => mqttClient.disconnect();
  }, [])
  
  function onMessageArrived (message) {
    console.log('message arrived', message.payloadString);
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
      <ColorEvent />
      <FlashEvent />
      <MusicEvent />
      <VideoEvent />
      <PictureEvent />
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