import React from 'react';

import './../../../../css/pages/Game.css';

const Hexagon = (props) => {
    return (
        <React.Fragment>
            {props.typeQuestion &&
                <div className="row mt-2 pt-2 mb-4 pb-4">
                    <div className="col-12">
                        <div className='hex gradient-bg-question'>
                            <span className="span-text">{props.text}</span>
                        </div>
                    </div>
                </div>
            }
            {!props.typeQuestion &&
                <div className="row mt-2 pt-2">
                    <div className="col-12">
                        <div className='hex gradient-bg' onClick={(e) => {props.getAnswerUser(props.text)}}>
                            <span className="span-text">{props.text}</span>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default Hexagon;