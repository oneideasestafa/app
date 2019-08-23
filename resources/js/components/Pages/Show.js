import React, { useReducer, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import Paho from 'paho-mqtt';
import uuidv4 from 'uuid/v4';

const initialState = { 
  isOpen: false,
  isFlashOn: false,
  color: '#313131',
  jobs: []
};

function reducer (state, action) {
  console.log('action', action);

  switch (action.type) {
    case 'SET_COLOR_SHOW':
      return {
        ...state,
        isOpen: true,
        color: action.payload.job.payload,
        jobs: [...state.jobs, action.payload.job]
      }
    case 'TURN_FLASH_ON':
      return {
        ...state,
        isFlashOn: true,
        jobs: [...state.jobs, action.payload.job]
      }
    case 'TURN_JOB_OFF':
      const job = state.jobs.find(j => j.id === action.payload.id);
      
      if (job.type === 'FLH')
        window.plugins.flashlight.switchOff();
      
      return {
        ...state,
        isOpen: job.type === 'COL' ? false : state.isOpen,
        color: job.type === 'COL' ? '#313131' : state.color,
        isFlashOn: job.type === 'FLH' ? false : state.isFlashOn,
        jobs: state.jobs.filter(j => j.id !== job.id)
      }
    default:
      return state;
  }
}

function Show (props) {
  const [show, dispatch] = useReducer(reducer, initialState);
  
  const spring = useSpring({ 
    height: show.isOpen ? '100vh' : '0vh',
    backgroundColor: show.color
  });
  
  const mqttHost = '192.168.1.3';
  const mqttPort = 9001;
  const mqttClientId = uuidv4();
  const mqttClient = new Paho.Client(mqttHost, mqttPort, mqttClientId);
  
  function onMessageArrived (message) {
    const [type, id, payload, ...params] = message.payloadString.split(',');
    const job = { id, type, payload };

    switch (type) {
      case 'COL':
        dispatch({type: 'SET_COLOR_SHOW', payload: { job }});
        break;
      case 'FLH':
        window.plugins.flashlight.switchOn(() => {
          dispatch({type: 'TURN_FLASH_ON', payload: { job }})
        });
        break;
      case 'REMOVE':
        dispatch({type: 'TURN_JOB_OFF', payload: { id: job.id }});
        break;
      default:
        return;
    }
  }

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

  return (
    <animated.div style={{width: '100%', ...spring}}>
    </animated.div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current
});

export default connect(mapStateToProps)(Show);