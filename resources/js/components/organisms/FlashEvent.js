import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  executeJob,
  turnShowOff
} from '../../redux/actions/show';

function FlashEvent (props) {
  const { flash } = props;
  const tracker = { timeout: null, interval: null };
  
  /**
   * Time Tracker
   */
  useEffect(() => {
    if (flash.current) {
      clearInterval(tracker.interval);
      clearTimeout(tracker.timeout);

      let now = new Date();
      let delay = flash.current.startTime - now.getTime();

      if (delay > 0) {
        tracker.timeout = setTimeout(props.executeJob, delay, flash.current.type);
      } else {
        props.executeJob(flash.current.type);
      }
      
      tracker.interval = setInterval(checkCurrentShow, 1000, flash.current, 'flash');
    } else {
      clearInterval(tracker.interval);
      clearTimeout(tracker.timeout);
    }

    return () => {
      clearInterval(tracker.interval);
      clearInterval(tracker.timeout);
    }
  }, [flash.current]);  

  /**
   * Turning Flash ON/OFF 
   */
  useEffect(() => {
    if (flash.running) {
      window.plugins.flashlight.switchOn(() => console.log('switced on'));
    } else {
      window.plugins.flashlight.switchOff();
    }

    return () => window.plugins.flashlight.switchOff();
  }, [flash.running]);

  /**
   * Turning Event Off
   */
  function checkCurrentShow (job) {
    let now = new Date();
    
    if (now.getTime() >= parseInt(job.endTime)) {
      console.log(`Stopping show ${job.type}`);
      props.turnShowOff(job);
      clearInterval(tracker.interval);
    } else {
      console.log(`Running show ${job.type}`);
    }
  }
  
  return null;
}

const mapStateToProps = state => ({
  event: state.events.current,
  flash: state.show.flash
});

const mapDispatchToProps = dispatch => ({
  executeJob: (type) => dispatch(executeJob(type)),
  turnShowOff: (job) => dispatch(turnShowOff(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashEvent);