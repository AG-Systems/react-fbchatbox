import React, {Component} from "react";
import axios from 'axios';
import $ from 'jquery';
//import socket from 'socket.io';
import io from 'socket.io-client';


const socket = io();

class Message extends Component
{
     constructor(props) {
        super(props);
        this.state = { 
            ip: ''
            
        } ;
        this.componentDidlMount = this.componentDidMount.bind(this)
      }
    componentDidMount() 
    {
        var self = this;
        axios.get('https://api.ipify.org?format=jsonp')
          .then(function (response) {
                var str = response.data;
                str = str.slice(str.indexOf(":")+2, str.indexOf("}")-1);
                self.setState({ ip: str});
          })
          .catch(function (error) {
            console.log(error);
          });    
    }
    render()
    {
        var msgstyle = {};
        let ip_addy = this.state.ip;
        // console.log(this.state.ip, this.props.author_msg);
        if(this.props.author_msg !== ip_addy)
        {
            msgstyle = {
                backgroundColor: "#e2e2e2",
                color: "black",
                float: "left"
            }
        }
        else
        {
            msgstyle = {
                backgroundColor: this.props.color_chat,
                color: "white",
                float: "right"
            } 
        }
        return(
                <li style={Object.assign({ width: "100%", float: "left"})}>
                   <img src={this.props.profile_pic} hidden={this.props.author_msg === ip_addy} width="35" height="35" style={{float: "left"}} id="profile_pic_message"/>
                   <div style={Object.assign(msgstyle, {borderRadius: "25px", marginTop: "5px", minWidth: "25%", maxWidth: "50%", height: "25px"})}>
                        <p> {this.props.text} </p>
                   </div>
                </li>
            );
    }
}

export default class Chatlogs extends Component
{
      constructor(props) {
        super(props);
        this.state = { 
            chat: [] 
            
        } ;
        this._handleMessageEvent = this._handleMessageEvent.bind(this)
      }
   _handleMessageEvent()
   {
             socket.on('chat message', (inboundMessage, authorOfChat, authorOfMsg) => 
             {
               let object = this.state.chat.slice();
               object.push([inboundMessage, authorOfChat, authorOfMsg])
               this.setState({chat: object})
               console.log(this.state.chat)
             })
            setTimeout(function(){
                this._handleMessageEvent;
            }, 9000);      
     }      
    componentDidMount() {
        this._handleMessageEvent()
    }
    render()
    {

        const messages = this.state.chat.map((msg, index) => {
            if(msg[1] === this.props.id)
            {
                return(
                    <Message text={msg[0]} intent={msg[1]} author_msg={msg[2]} profile_pic={this.props.pic} color_chat={this.props.color} key={index} />
                )
            }
        });        
        return(
            <div id={"messages" + this.props.id}>
                <ul>
                    { messages }
                </ul>
            </div>
            );
    }
}