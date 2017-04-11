import React, { Component } from 'react';
import logo from './logo.svg';
import './Chat.css';
import chatlogs from './chatlogs.json';
import Chatlist from './Chatlist';
import $ from "jquery";

var currentuser = "";

var colorofchat = {
  backgroundColor: "#f2f2f2",
  color: "black"
};
class Chatlogs extends Component {
  render() {
    var otherchat = {
        backgroundColor: "#498fff",
        border: "2px solid #498fff"
    };
    var mychat = {
        backgroundColor: "#e0e0e0",
        border: "2px solid #e0e0e0",
        float: "right"
    };
    return (
      <div>
        <br />
          <ul>
          {chatlogs.map( message =>
                      <li key={message.id} ><img src={message.picture} hidden={message.name === "Me"}/>
                      <span className="speech" style={mychat}> {message.message} </span></li>
          )}
          </ul>
      </div>
    );
  }
}

class Chat extends Component {
  close(mainid)
  {
    name = "";
    $("#"+mainid).hide();
    
  };
  color(activecolor)
  {
     colorofchat = {
      backgroundColor: activecolor,
      color: "white"
    };
    this.forceUpdate();
  };
  render() {
        return (
          <div className="chat" hidden={this.props.name === ""} onClick={() => this.color(this.props.color)} id={this.props.id}>
            <div className="chat-navbar" style={colorofchat}>
            <p id="chattitle"><span id="active">
            <img height="7px" width="7px" hidden={this.props.active != "yes"}
            src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Ski_trail_rating_symbol-green_circle.svg"
            /></span> 
              {this.props.name}
              <span className="glyphicon glyphicon-remove" id="close" onClick={() => this.close(this.props.id)}></span>
              <span className="glyphicon glyphicon-cog"></span> 
              <span className="glyphicon glyphicon-earphone"></span> 
              <span className="glyphicon glyphicon-facetime-video"></span> 
              <span className="glyphicon glyphicon-plus"></span> 
            </p> 
            </div>
              <div id="chatlogs">
                <Chatlogs convo={this.props.name}/>
              </div>
            <div id="input-fields">
              <input placeholder="Type a message..." />
              <span className="glyphicon glyphicon-thumbs-up" id="bottom"></span>
              <span className="glyphicon glyphicon-camera" id="bottom"></span> 
              <span className="glyphicon glyphicon-paperclip" id="bottom"></span> 
              <span className="glyphicon glyphicon-folder-open" id="bottom"></span> 
            </div>
          </div>
        );
  }
}

export default Chat;