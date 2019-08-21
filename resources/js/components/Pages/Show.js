import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import Paho from 'paho-mqtt';
import uuidv4 from 'uuid/v4';

function Show (props) {
  const [color, setColor] = useState('transparent');
  const spring = useSpring({ 
    height: color === 'transparent' ? '0vh' : '100vh',
  });
  const mqttHost = '192.168.1.3';
  const mqttPort = 9001;
  const mqttClientId = uuidv4();
  const mqttClient = new Paho.Client(mqttHost, mqttPort, mqttClientId);
  
  useEffect(() => {
    function onMessageArrived (message) {
      const [type, payload, ...params] = message.payloadString.split(',');
      setColor(payload);
    }

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
    <animated.div style={{backgroundColor: color, width: '100%', ...spring}}>
    </animated.div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current
});

export default connect(mapStateToProps)(Show);