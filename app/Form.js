import React, { Component, PropTypes } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            country: '',
            cityIsEmpty: true,
            countryIsEmpty: true
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.taskCallbacks.add(this.state.city, this.state.country);
        this.setState({city : ''});
        this.setState({country : ''});
        this.setState({cityIsEmpty: true});
        this.setState({countryIsEmpty: true});        
    }

    onFieldChange(fieldName, fieldCheck, event) {
        if (event.target.value.trim().length > 0) {
            this.setState({ ['' + fieldCheck]: false })
        } else {
            this.setState({ ['' + fieldCheck]: true })
        }
        this.setState({ ['' + fieldName]: event.target.value });
    }

    getUserLocation() {
        this.props.taskCallbacks.getUserLocation();
    }

    render() {
        return (
            <div  >
                <h2>Get up-to-date weather information for any location </h2>
                <div className="col-md-8">
                    <button type="button" className="btn btn-info getUserInfo"
                        onClick={this.getUserLocation.bind(this)}>
                        Get weather in my location!</button>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        
                        <input type="text" name="city" className="form-control first-input"
                            placeholder="Enter City name ..." value={this.state.city} 
                            onChange={this.onFieldChange.bind(this, 'city', 'cityIsEmpty')} />

                        <input type="text" name="country" className="form-control"
                            placeholder="Enter State. Example CA for California ..." value={this.state.country}
                            onChange={this.onFieldChange.bind(this, 'country', 'countryIsEmpty')} />
                            
                            <br />
                        <button type="submit" className="btn btn-primary" 
                        disabled={this.state.cityIsEmpty || this.state.countryIsEmpty}>Submit</button>
                    </form>
                    <br />
                </div>
            </div>
        );
    }
}
Form.propTypes = {
    taskCallbacks: PropTypes.object
};
export default Form;