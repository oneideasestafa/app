import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SuspenseLoadingScreen () {
  return (
    <div style={{
      position: 'fixed',
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px',
      backgroundColor: 'rgba(14, 14, 14, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    }}>
      <FontAwesomeIcon icon="sync" color="#fff" size="lg" spin />
    </div>
  );
}

export default SuspenseLoadingScreen;