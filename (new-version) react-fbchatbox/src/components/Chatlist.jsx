import React from 'react';
import { connect } from 'react-redux';
import { changeTaskStatus, removeTask } from '../actions';

import Chatcontact from './Chatcontact';


const Chatlist = ({ 
    status, 
    children, 
    tasks,
    changeStatus,
    remove
}) => (
    <div className="Chatlist card">
        <div className="chatnav">
            <h5>{children} ({tasks.length})</h5>
        </div>
        <div style={{ overflowY: "auto"}}>
        {tasks.map((task) => 
            <Chatcontact 
                key={task.id}
                {...task}
                onChangeClick={changeStatus}
                onRemoveClick={remove}
            />
        )}
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    return { 
        // tasks: state.filter(t => t.status === ownProps.status) 
        tasks: state.filter(t => t.status) 
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatus: (id) => {
            dispatch(changeTaskStatus(id));
        },
        remove: (id) => {
            dispatch(removeTask(id));
        }
    };
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Chatlist);