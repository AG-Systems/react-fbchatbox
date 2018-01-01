import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import Chatlist from './Chatlist';
import Chatopen from './Chatopen';

const Board = () => (
    <div className="project-board card-deck">
        {/*
        <List status="TODO"> 
            Todo tasks
        </List>
        */}
        <Chatlist status="TODO">
            Chat
        </Chatlist>
        {/*
        <List status="DOING"> 
            Doing tasks
        </List>
        */}
        <Chatopen status="DOING">
            Open chats
        </Chatopen>
    </div>
);

export default Board;