import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SuspenseErrorBoundary extends React.Component {
  constructor (props) {
    super(props);
    this.state ={
      hasError: false,
      loading: false,
    }

    this.onReload = this.onReload.bind(this);
  }

  static getDerivedStateFromError (error) {
    return { hasError: true };
  }

  onReload (e) {
    this.setState({
      loading: true
    }, () => window.location.replae('/questionEvent'));
  }

  render () {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="container">
        <div className="row align-items-center" style={{ height: '100vh' }}>
          <div className="col-md-6 text-center">
            <div>
              <FontAwesomeIcon 
                icon="exclamation-circle" 
                color="#eb3b5a"
                size="6x"
              />
            </div>
            <h4 className="mt-3 mb-5">
              Algo ha ocurrido con su conexión a internet, por favor inicie la aplicación nuevamente
            </h4>
            <div className="mt-2">
              {this.state.loading ? (
                <FontAwesomeIcon 
                  icon="sync" 
                  color="#fff"
                  size="2x"
                  spin
                />
              ) : (
                <FontAwesomeIcon
                  icon="redo-alt"
                  color="#fff"
                  size="2x"
                  onClick={this.onReload}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuspenseErrorBoundary;