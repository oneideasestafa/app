import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

function LoadingScreen (props) {
  if (!props.loading)
    return null;

  return (
    <div style={{
      position: 'absolute',
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

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(LoadingScreen);