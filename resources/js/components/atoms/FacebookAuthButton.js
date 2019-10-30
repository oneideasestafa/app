import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { socialAuthentication } from './../../redux/actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FacebookAuthButton (props) {
  const classNames = classnames('btn', 'text-white', {
    'btn-block': props.block
  });

  function handleFacebookAuth (e) {
    e.preventDefault();

    props.onStart();

    facebookConnectPlugin.login(['public_profile'], success => {
      const { authResponse } = success;

      props.socialAuthentication('facebook', authResponse.accessToken)
        .catch(e => {          
          props.onError();
        });

    }, error => {});
  }
  
  return (
    <button 
      className={`${classNames} ${props.className}`}
      style={{ backgroundColor: '#1877f2' }}
      onClick={handleFacebookAuth}
    >
      <FontAwesomeIcon
        icon={['fab', 'facebook-f']}
        color="#fff"
        pull="left"
      />
      Inicia sesión con Facebook
    </button>
  );
}

const mapDispatchToProps = dispatch => ({
  socialAuthentication: (provider, accessToken) => dispatch(socialAuthentication(provider, accessToken))
});

export default connect(null, mapDispatchToProps)(FacebookAuthButton);