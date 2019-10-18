import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  executeJob,
  turnShowOff
} from '../../redux/actions/show';

function FlashEvent (props) {
  const { flash } = props;
  // Previous console configuration
  // const tracker = { timeout: null, interval: null };
  
  /**
   * Time Tracker
   */
  // Previous console configuration
   // useEffect(() => {
  //   if (flash.current) {
  //     clearInterval(tracker.interval);
  //     clearTimeout(tracker.timeout);

  //     let now = new Date();
  //     let delay = flash.current.startTime - now.getTime();

  //     if (delay > 0) {
  //       tracker.timeout = setTimeout(props.executeJob, delay, flash.current.type);
  //     } else {
  //       props.executeJob(flash.current.type);
  //     }
      
  //     tracker.interval = setInterval(checkCurrentShow, 1000, flash.current, 'flash');
  //   } else {
  //     clearInterval(tracker.interval);
  //     clearTimeout(tracker.timeout);
  //   }

  //   return () => {
  //     clearInterval(tracker.interval);
  //     clearInterval(tracker.timeout);
  //   }
  // }, [flash.current]);  

  /**
   * Turning Flash OFF on component unmount
   */
  useEffect(() => {
    return () => window.plugins.flashlight.switchOff();
  }, []);

  /**
   * Turning Flash ON/OFF 
   */
  useEffect(() => {
    if (flash.current) {
      let { payload } = flash.current;
      let status = parseInt(payload);
  
      if (status === 1) {
        window.plugins.flashlight.switchOn(() => console.log('switced on'));
      } else {
        window.plugins.flashlight.switchOff();
      }
    } else {
      window.plugins.flashlight.switchOff();
    }

    if (flash.current && flash.current.vibrate) {
      navigator.vibrate(250);
    }
  }, [flash.current]);

  /**
   * Turning Event Off
   */
  // Previous console configuration
  // function checkCurrentShow (job) {
  //   let now = new Date();
    
  //   if (now.getTime() >= parseInt(job.endTime)) {
  //     console.log(`Stopping show ${job.type}`);
  //     props.turnShowOff(job);
  //     clearInterval(tracker.interval);
  //   } else {
  //     console.log(`Running show ${job.type}`);
  //   }
  // }
  
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