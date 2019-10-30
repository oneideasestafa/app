import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { socialAuthentication } from './../../redux/actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GoogleAuthButton (props) {
  const classNames = classnames('btn', 'text-white', {
    'btn-block': props.block
  });

  function handleGoogleAuth (e) {
    e.preventDefault();

    props.onStart();

    window.plugins.googleplus.login({
      webClientId: process.env.MIX_APP_GOOGLE_CLIENT_ID,
      offline: true
    }, success => {
      const { accessToken } = success;

      props.socialAuthentication('google', accessToken)
        .catch(e => {          
          props.onError();
        });
      
    }, error => {})
  }

  
  return (
    <button 
      className={`${classNames} ${props.className}`}
      style={{ backgroundColor: '#db4437' }}
      onClick={handleGoogleAuth}
    >
      <FontAwesomeIcon
        icon={['fab', 'google']}
        color="#fff"
        pull="left"
      /> 
      Inicia sesión con Google
    </button>
  );
}

const mapDispatchToProps = dispatch => ({
  socialAuthentication: (provider, accessToken) => dispatch(socialAuthentication(provider, accessToken))
});

export default connect(null, mapDispatchToProps)(GoogleAuthButton);