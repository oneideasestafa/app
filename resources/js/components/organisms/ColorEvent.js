import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { 
  executeJob,
  turnShowOff
} from '../../redux/actions/show';

function ColorEvent (props) {
  const { colors } = props;

  const [isBrightnessAtMax, setBrightness] = useState(false);
  
  const spring = useSpring({ 
    height: colors.running ? '100vh' : '0vh',
    backgroundColor: colors.running ? colors.current.payload : '#313131'
  });
  
  /**
   * When a color command is beign executed
   * put brightness at maximum level
   */
  useEffect(() => {
    if (colors.current && !isBrightnessAtMax) {
      setBrightness(true);
      
      Cordova.exec(prevBright => {
        Cordova.exec(() => {
          console.log('Brightness change');
        }, e => console.log(e), 'Brightness', 'setBrightness', [1]);      

      }, e => console.log(e), 'Brightness', 'getBrightness', []);
    } else if (colors.current === null) {
      setBrightness(false);
    }

    if (colors.current && colors.current.vibrate) {
      navigator.vibrate(250);
    }
  }, [colors.current]);
  
  /**
   * Time Tracker
   */
  // Previous console configuration
  // useEffect(() => {
  //   if (colors.current) {
  //     clearInterval(tracker.interval);
  //     clearTimeout(tracker.timeout);

  //     let now = new Date();
  //     let delay = colors.current.startTime - now.getTime();

  //     if (delay > 0) {
  //       tracker.timeout = setTimeout(props.executeJob, delay, colors.current.type);
  //     } else {
  //       props.executeJob(colors.current.type);
  //     }
      
  //     tracker.interval = setInterval(checkCurrentShow, 1000, colors.current, 'colors');
  //   } else {
  //     clearInterval(tracker.interval);
  //     clearTimeout(tracker.timeout);
  //   }

  //   return () => {
  //     clearInterval(tracker.interval);
  //     clearInterval(tracker.timeout);
  //   }
  // }, [colors.current]);

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
  
  return (
    <animated.div style={{width: '100%', ...spring}}>
    </animated.div>
  );
}

const mapStateToProps = state => ({
  event: state.events.current,
  colors: state.show.colors
});

const mapDispatchToProps = dispatch => ({
  executeJob: (type) => dispatch(executeJob(type)),
  turnShowOff: (job) => dispatch(turnShowOff(job)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorEvent);