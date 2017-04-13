import React, { Component } from 'react';
import logo from './logo.svg';
import './Chatlist.css';
import contacts from './contacts.json';
import Chat from './Chat';
import $ from 'jquery';

var chatnames = [];
var chatcolors = [];
var chatid = [];
var chatactive = [];
var activecolor = "#f2f2f2";
var unactive = ""
var activeid=0;

class Chatlist extends Component {
    currentchat (name,id,active,color)
    {
      if(chatnames.indexOf(name) === -1)
      {
        chatnames.push(name);
        chatcolors.push(color);
        chatid.push(id);
        chatactive.push(active);
      }
      console.log(chatnames);
      activecolor=color;
      activeid=id;
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
      $("#"+id).show();
      $(".chat "+id).show();
      $("#card").hide();
      $("#pay").hide();
      // $(".mychat").css("backgroundColor",activecolor);
      this.forceUpdate();
    }
    changecolor(active, id)
    {
      activecolor = "#f2f2f2";
      $(".chat-navbar").css("backgroundColor",activecolor);
      $(".chat-navbar").css("color","black");
      $("#card").hide();
      $("#pay").hide();
    }
    render() {
    var style1 = {
      width: "100%",
      overflow: "hidden"
    };
    var style2 = {
      width: "276px",
      float: "left"
    };
    var style3 = {
      // marginLeft: "300px",
      width: "100%"
    };
    var style4 = {
      width: "276px",
      float: "left",
      paddingLeft: "110px"
    };
    return (
      <div style={style1}>
          <div className="chatlist" style={style2}>
            <div className="chatlist-navbar" onClick={() => this.changecolor(activecolor,activeid)}>
            <p id="chattitle"> Chat 
            <span className="glyphicon glyphicon-cog"></span><span className="glyphicon glyphicon-pencil">
            </span>
            </p>
            </div>
            <div className="chatlist" >
              <p> CONTACTS </p>
              <ul>
              {contacts.map( contact =>
                    <span><li id="contact" key={contact.id} onClick={() => this.currentchat(contact.name, contact.id, contact.active, contact.color)}><img height="32px" width="32px"
                    src={contact.picture} 
                    /> {contact.name } 
                    <span className="lastactive"><span hidden={contact.active !== "yes"}><img 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Ski_trail_rating_symbol-green_circle.svg" 
                     height="7px" width="7px" />
                    </span>
                    <span hidden={contact.active === "yes"}>{contact.active}m</span>
                    </span></li></span>
              )}
              </ul>
                <div id="search">
                <input placeholder="Search" />
              </div>
            </div>
          </div>
          <div style={style3} hidden={chatnames.length === 0}>
              <div hidden={chatnames.length < 1} id="chat-tab" style={style2}>
                  <Chat name={chatnames[0]} active={chatactive[0]} color={chatcolors[0]} id={chatid[0]} />
              </div>
              <div hidden={chatnames.length < 2} id="chat-tab" style={style2}>
                    <Chat name={chatnames[1]} active={chatactive[1]} color={chatcolors[1]} id={chatid[1]} />
              </div>
          </div>
      </div>
      )
    }
}


export default Chatlist;
