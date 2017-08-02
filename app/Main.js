import React, { Component, PropTypes } from 'react';
import List from './List';
import Form from './Form';
import Information from './Information';

class Main extends Component {
    render() {
        let information;
        if (this.props.locationInformation) {
            information = <Information
                city={this.props.locationInformation.city}
                state={this.props.locationInformation.state}
                country={this.props.locationInformation.country}
                text={this.props.locationInformation.text}
                temp={this.props.locationInformation.temp}
            />
        }
        return (
            <div className="main">
                <Form taskCallbacks={this.props.taskCallbacks} />
                {information}
                <List
                    taskCallbacks={this.props.taskCallbacks}
                    locations={this.props.locations}
                />
            </div>
        );
    }
}
Main.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object),
    locationInformation: PropTypes.object,
    taskCallbacks: PropTypes.object
};
export default Main;