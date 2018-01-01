import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

 
                 
const Title = ({ cardsCount, usersOnline }) => (
    <div className="project-info">
        <h1>Facebook Desktop Chat</h1>
        <p>There are {cardsCount} chats available</p>
        <p id="usersOnlineId">There are 1 real users online</p>
        <span>Type name, and if they are online or not. Click on chat to open another chat</span>
        <p>
            <span>(Uses socket.io to have a real time chat experience with other users)</span>
        </p>
    </div>
);

const mapStateToProps = (state) => {
    return { 
        cardsCount: state.length
    };
};

var realUsersOnline = (state) =>
{
    const socket = io();
    socket.on('users online', (listOfUsers) => 
                 {
                    usersOnline: listOfUsers
                 })    
};
export default connect(mapStateToProps, realUsersOnline)(Title);