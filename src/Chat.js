import React, { Component } from 'react';
import logo from './logo.svg';
import './Chat.css';
import chatlogs from './chatlogs.json';
import Chatlist from './Chatlist';
import $ from "jquery";

var chatcolor = "#498fff";

var colorofchat = {
  /* backgroundColor: "#f2f2f2", */
  color: "black"
};
class Chatlogs extends Component {
  render() {
    var otherchat = {
        //backgroundColor: chatcolor,
        //border: "2px solid " + chatcolor,
        float: "right"
    };
    var mychat = {
        backgroundColor: "#e0e0e0",
        border: "2px solid #e0e0e0"
    };
    return (
      <div>
        <br />
          <ul>
          {chatlogs.map( message =>
                      <li key={message.id} ><img src={message.picture} hidden={message.name === "Me"}/>
                      <span className="speech" style={mychat} hidden={message.name === "Me"}> {message.message} </span>
                      <span className="speech mychat" style={{float: "right",backgroundColor: message.color}} hidden={message.name !== "Me"}> &nbsp; {message.message} </span>
                      </li>
                      
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
  color(activecolor,id)
  {
     colorofchat = {
      backgroundColor: activecolor,
      color: "white"
    };
    for(var z = 0; z < 3; z++)
    {
          if(z !== id) 
          {
            $("#tab"+z).css("backgroundColor","#f2f2f2");
            $("#tab"+z).css("color","black");
          }
    }
    $("#tab"+id).css("backgroundColor",activecolor);
    $("#tab"+id).css("color","white");  
    chatcolor = activecolor;
    this.forceUpdate();
  };
  render() {
        return (
          <div className={"chat " + this.props.id} hidden={this.props.name === ""} onClick={() => this.color(this.props.color, this.props.id)} id={this.props.id}>
            <div className={"chat-navbar " + this.props.id} id={"tab"+this.props.id} style={colorofchat}>
            <p id="chattitle"><span className="active">
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