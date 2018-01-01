import React from 'react';
import { connect } from 'react-redux';
import { changeTaskStatus, removeTask, changeToActiveChat } from '../actions';
import Chat from './Chat';

const List = ({ 
    status, 
    children, 
    tasks,
    changeStatus,
    remove,
    changeActivty
}) => (
        <div className="card-deck">
        {tasks.map((task) => 
            <Chat
                key={task.id}
                {...task}
                onChangeClick={changeStatus}
                onRemoveClick={remove}
                onChangeChat={changeActivty}
            />
        )}
        </div>
);

const mapStateToProps = (state, ownProps) => {
    return { 
        tasks: state.filter(t => t.status === ownProps.status) 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (id) => {
            dispatch(changeTaskStatus(id));
        },
        remove: (id) => {
            dispatch(removeTask(id));
        },
        changeActivty: (id) => {
            dispatch(changeToActiveChat(id));
        }
    };
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(List);