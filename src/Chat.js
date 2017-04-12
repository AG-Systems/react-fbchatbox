import React, { Component } from 'react';
import logo from './logo.svg';
import './Chat.css';
import chatlogs from './chatlogs.json';
import Chatlist from './Chatlist';
import $ from "jquery";


var chatcolor = "#498fff";

var imageurl = ["", "", "", "","", ""];
$.ajax({
            url: "//api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC",
            type: "GET",
            success: function(response) {
                imageurl[0] = response.data[0].images.fixed_height.url;
                imageurl[1] = response.data[1].images.fixed_height.url;
                imageurl[2] = response.data[2].images.fixed_height.url;
                imageurl[3] = response.data[3].images.fixed_height.url;
                imageurl[4] = response.data[4].images.fixed_height.url;
            }
});
var colorofchat = {
  /* backgroundColor: "#f2f2f2", */
  color: "black"
};

class Card extends Component {
  search(event)
  {
    // fetch(`//api.giphy.com/v1/gifs/search?q=${text}&api_key=dc6zaTOxFJmzC`)
    if(event.target.value.length > 0)
    {
          $.ajax({
                      url: "//api.giphy.com/v1/gifs/search?q=$" + event.target.value + "&api_key=dc6zaTOxFJmzC",
                      type: "GET",
                      success: function(response) {
                          imageurl[0] = response.data[0].images.fixed_height.url;
                          imageurl[1] = response.data[1].images.fixed_height.url;
                          imageurl[2] = response.data[2].images.fixed_height.url;
                          imageurl[3] = response.data[3].images.fixed_height.url;
                          imageurl[4] = response.data[4].images.fixed_height.url;
                      }
          });
          console.log(event.target.value);
          // imageurl = event.target.value;
    }
    else
    {
        $.ajax({
                    url: "//api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC",
                    type: "GET",
                    success: function(response) {
                        imageurl[0] = response.data[0].images.fixed_height.url;
                        imageurl[1] = response.data[1].images.fixed_height.url;
                        imageurl[2] = response.data[2].images.fixed_height.url;
                        imageurl[3] = response.data[3].images.fixed_height.url;
                        imageurl[4] = response.data[4].images.fixed_height.url;
                    }
        });    
    }
  };
  sendgif()
  {
      
      $("#card").hide();
  };
  render(){
      var cardstyle={
        height: "299px",
        width: "278px",
        backgroundColor: "white",
        zIndex: 100,
        boxShadow: "0 0 0 1px rgba(0, 0, 0, .1), 0 1px 10px rgba(0, 0, 0, .35)",
        marginLeft: "100px",
        position: "absolute",
        marginTop: "-300px",
        overflowY: "scroll",
        overflowX: "hidden"
      };
    return(
      <div style={cardstyle} hidden={true} id="card">
            <input placeholder="Search GIFs across apps..." onChange={this.search} onClick={this.search}/>
            <img src={imageurl[0]} width="278px" onClick={this.sendgif}/>
            <img src={imageurl[1]} width="278px" onClick={this.sendgif}/>
            <img src={imageurl[2]} width="278px" onClick={this.sendgif}/>
            <img src={imageurl[3]} width="278px" onClick={this.sendgif}/>
            <img src={imageurl[4]} width="278px" onClick={this.sendgif}/>
      </div>
      );
  }
}

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
                      <li key={message.id} ><img height="32px" width="32px"src={message.picture} hidden={message.name === "Me"}/>
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
  gif()
  {
      $.ajax({
            url: "//api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC",
            type: "GET",
            success: function(response) {
                //console.log("This works too")
                //debugger
                console.log(response.data[0].images.fixed_height.url);
                imageurl[0] = response.data[0].images.fixed_height.url;
                imageurl[1] = response.data[1].images.fixed_height.url;
                imageurl[2] = response.data[2].images.fixed_height.url;
                imageurl[3] = response.data[3].images.fixed_height.url;
                imageurl[4] = response.data[4].images.fixed_height.url;
            }
        });
      
      $("#card").toggle();
  };
  sendphoto()
  {
     $("input[type='file']").click();
  };
  sendfile()
  {
    
  };
  camera()
  {
    alert("Camera not detected");
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
    var hiddenstyle={
         display: "none"
    };
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
            <Card />
            <div id="input-fields">
              <input placeholder="Type a message..." />
              <span className="glyphicon glyphicon-thumbs-up" id="bottom"></span>
              <span className="glyphicon glyphicon-camera" id="bottom" onClick={this.camera}></span> 
              <span className="glyphicon glyphicon-paperclip" id="bottom"></span> 
              <span className="glyphicon glyphicon-folder-open" id="bottom" type='file' onClick={this.sendphoto}></span> 
              <span className="glyphicon glyphicon-expand" id="bottom" onClick={this.gif}></span> 
            </div>
            <input type='file'  style={hiddenstyle} />
          </div>
        );
  }
}

export default Chat;