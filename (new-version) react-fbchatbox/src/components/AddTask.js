import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions';
import $ from 'jquery';
var md5 = require('md5');


const AddTask = ({ dispatch, state }) => 
{

  
    var message_hash = md5(new Date());

    let inputText, inputExecutor, inputOnline;

    const submitTask = (e) => {
        e.preventDefault();

        if (!inputText.value.trim())
            return;
 
        dispatch(addTask({
            text: inputText.value,
            online: inputOnline.value,
            // executor: inputExecutor.value.trim() ? inputExecutor.value : 'All'
            executor: message_hash
        }));

        inputText.value = '';
        inputExecutor.value = '';
        inputOnline.value = '';
    };

    return (
        <div className="form-container">
            <form onSubmit={submitTask}>
                <input className="task-form-text" placeholder="Name" 
                    ref={node => inputText = node} 
                    style={{ width: "170px"}}
                />
                <input className="task-form-executor" placeholder={ "Message Id:  " +  message_hash.substring(0,10) } 
                    ref={node => inputExecutor = node}
                    disabled
                />
                <input className="task-form-executor" placeholder="online(TRUE) or active X m/h ago" 
                    ref={node => inputOnline = node} 
                    style={{ width: "220px"}}
                />
                {/*
                <span> Online? </span>
                <input id="checkBox" type="checkbox" />
                <div id="online-status">
                    <input id="checkBox" style={{ width: "50px"}} />
                    <select>
                      <option selected value="m">Minutes</option>
                      <option value="h">Hours</option>
                      <option value="d">Days</option>
                    </select>   
                </div>
                */}
                <input className="task-form-submit" type="submit" value="Add"/>
            </form>
        </div>
    );
};

export default connect()(AddTask);