import React, {Component} from "react";
import Chatlogs from './Chatlogs';
import $ from 'jquery';
// import socket from 'socket.io';
import io from 'socket.io-client';
import Gif from './Gif';

const socket = io();


const Card = ({ 
    id, 
    text, 
    executor,
    online,
    onChangeClick,
    img,
    color_chat,
    active_chat,
    onRemoveClick,
    onChangeChat
}) => {
    let span_style;
    let navbar_style;
    let showGif = false;
    if(active_chat)
    {
      span_style = {
        color: "white"
      }
      navbar_style = {
        backgroundColor: color_chat,
        color: "white"
      }
    }
    else
    {
      span_style = {
        color: "black"
      }
      navbar_style = {
        backgroundColor: "white",
        color: "black"
      }      
    }
    function typingmessage(input="clicked on message box")
    {
      console.log(input);
    }
    
    function sendmessage(author)
    {
      console.log("sending message");
      //var socket = io();
      socket.emit('chat message', $('#message-' + author).val(), author);
      $('#message-' + author).val('');  
      /*
      socket.on('chat message', function(msg, message_id)
      {
          $('#messages' + author).append($('<li>').text(msg));
      });   
      */
    }
    let author = executor;
    function handleKeyPress(e) {
        if (e.key === 'Enter') 
        {
          sendmessage(author);
        }
        else
        {
          typingmessage("typing message");
        }
      }
    return (
          <div className="chat card" onClick={() => onChangeChat(id, text)}>
            <div className="chatnav-open" style={navbar_style}>
                <div><span className="" style={{ float: "left", padding: "5px"}}>
                <img height="8px" width="8px" hidden={online !== "TRUE"}
                src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Ski_trail_rating_symbol-green_circle.svg"
                />
                  <span style={{ paddingLeft: "3px"}, span_style}>
                  {text}
                  </span>
                </span>
                <div style={{ float: "right"}}>
                  <span className="fa fa-plus chat-icons-top" style={span_style}></span>
                  <span className="fa fa-video-camera chat-icons-top" style={span_style}></span>
                  <span className="fa fa-phone chat-icons-top" style={span_style}></span> 
                  <span className="fa fa-cog chat-icons-tope" style={span_style}></span>
                  <span className="fa fa-remove chat-icons-top" id="close" onClick={() => onChangeClick(id)} style={span_style}></span>
                </div>
                </div> 
            </div>
            <div style={{ height: "300px", overflowY: "auto"}}> 
              <Chatlogs id={executor} color={color_chat} pic={img}/>
            </div>
            <div id="input-fields" autoComplete="off">
              <input placeholder="Type a message..." className="message" id={"message-" + author} onClick={() => typingmessage() } onKeyPress={ handleKeyPress }  autoComplete="off"
              type="text" 
              />
              <span className="fa fa-thumbs-up chat-icons-bot" id="bottom"></span>
              <span className="fa fa-camera chat-icons-bot" id="bottom"></span> 
              <span className="fa fa-paperclip chat-icons-bot" id="bottom"></span> 
              <span className="fa fa-folder-open chat-icons-bot" id="bottom"></span>
              <span className="fa fa-usd chat-icons-bot" id="bottom"></span> 
              <span className="fa fa-youtube chat-icons-bot" id="bottom" onClick={() => opengif(id) }></span> 
            </div>
          </div>
    );
};

export default Card;