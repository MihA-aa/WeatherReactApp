import React, { Component, PropTypes } from 'react';
import marked from 'marked';

class Information extends Component {
    render() {
        return (
            <div className="col-md-12" >
                <div className="form-group">
                    <p className="well lead" >
                        <i>City, State, Country :</i> { this.props.city } {' '}
                        { this.props.state }{' '} { this.props.country } <br/>
                        <i>Current Condition :</i> { this.props.text } <br/>
                        <i>Current Temperature :</i> { this.props.temp } {' '}°C 
                        <br/>
                    </p>
                </div>
            </div>
        )

    }
}

Information.propTypes = {
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    text: PropTypes.string,
    temp: PropTypes.number,
};
export default Information;