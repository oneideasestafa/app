import React from 'react';
import { connect } from 'react-redux';
import Paho from 'paho-mqtt';
import uuidv4 from 'uuid/v4';

class Show extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      message: ''
    };

    // Class functions
    this.onMessageArrived = this.onMessageArrived.bind(this);
    this.onMqttConnection = this.onMqttConnection.bind(this);

    // MQTT attributes
    this.mqttClient = null;
    this.mqttHost = '192.168.1.3';
    this.mqttPort = 9001;
    this.mqttClientId = uuidv4();
  }

  componentDidMount () {
    this.mqttClient = new Paho.Client(this.mqttHost, this.mqttPort, this.mqttClientId);
    this.mqttClient.onMessageArrived = this.onMessageArrived;

    this.mqttClient.connect({
      onSuccess: this.onMqttConnection,
    })
  }

  onMqttConnection () {
    const { Empresa_id, _id } = this.props.event;
    this.mqttClient.subscribe(`/${Empresa_id}/${_id}`);
  }

  onMessageArrived (message) {
    const [ type, payload, ...params] = message.payloadString.split(',');

    if (type === 'COL')
      return 
  }

  componentWillUnmount () {
    this.mqttClient.disconnect();
  }

  render () {
    return <h1>{this.state.message}</h1>;
  }
}

const mapStateToProps = state => ({
  event: state.events.current
});

export default connect(mapStateToProps)(Show);