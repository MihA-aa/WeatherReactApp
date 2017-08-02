import React, { Component, PropTypes } from 'react';
import marked from 'marked';

class Item extends Component {
    showLocation() {
        this.props.taskCallbacks.show(this.props.city, this.props.country);
    }
    deleteLocation(){
        this.props.taskCallbacks.delete(this.props.city, this.props.country);
    }
    render() {
        return (
            <div className="todo-item">
                <button className="checkbox icon" onClick={() => this.showLocation()}>
                    <i className="material-icons">{'remove_red_eye'}</i>
                </button>
                <span className="title">{this.props.country + " - " + this.props.city}</span>
                <div className="actions">
                    <button className="delete icon" onClick={() => this.deleteLocation()}>
                        <i className="material-icons">delete</i>
                    </button>
                </div>
            </div>
        );
    }
}

Item.propTypes = {
    city: PropTypes.string,
    country: PropTypes.string,
    taskCallbacks: PropTypes.object,
};
export default Item;
