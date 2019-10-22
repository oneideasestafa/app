import React from 'react';

const Home = (props) => {
    return (
        <React.Fragment>
            <div className="row mt-5 pt-5">
                <div className="col-12 mt-5 pt-5">
                </div>
            </div>
            <div className="row mt-5 pt-5">
                <div className="col-12 col-lg-5 offset-lg-3">
                    <button type="submit" className="btn btn-negro btn-box-index" onClick={props.nextPage}>Unirse al juego</button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;