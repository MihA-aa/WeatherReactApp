import React, { Component, PropTypes } from 'react';
import marked from 'marked';
import Item from './Item';

class List extends Component {
    render() {
        var locations = this.props.locations.map((location) => {
            return <Item key={location.id}
                city={location.city}
                country={location.country}
                taskCallbacks={this.props.taskCallbacks} />
        });
        return (
            <div className="todo-list">
                {locations}
            </div>
        );
    }
}

List.propTypes = {
    locations: PropTypes.arrayOf(PropTypes.object),
    taskCallbacks: PropTypes.object,
};
export default List;
