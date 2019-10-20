"use strict";
import React from  'react';
import './App.css';
import {Launcher} from 'react-chat-window'



class App extends React.Component  {
  
  
  constructor(props) {
    super(props);
    this.state = {
     message: '',
     name: '',
     messageList: [ ]
     
    }
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.saveMesage = this.saveMesage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  sendMessage(message){
    let newMessage = {
      name: this.state.name,
      message: message.data.text
    }

 
    
    const url = 'http://localhost:4000/messages'
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(newMessage)
    }).then( (value) => {
      console.log(value);
      this.getMessages();
    });
  }

  getMessages(){
    const url = 'http://localhost:4000/messages'
    fetch(url, {
      Accept: 'application/json'
    })
      .then(res => res.json())
      .then((messageList) => {
        console.log(messageList);
        console.log(messageList[0].text)
        this.setState({messageList})
       
          
        })
  }
  

  async saveMesage() {
    let {name,message} = this.state;
     await this.sendMessage({name, message});
     this.getMessages();  
  }
 

    handleMessageChange(event) {
      this.setState({ message: event.target.value })
    }

    handleNameChange(event) {
      console.log(event.target.value)
      this.setState({ name: event.target.value })

    }

  

    
     
     
    
  
   
  render() {
    const { message, name } = this.state;
      return (
    <div className="App">
      <header className="App-header">
        <div className="container">

          <div className="jumbotron">
          <Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this.sendMessage}
        messageList={this.state.messageList}
        showEmoji
      />
            <h1 className="display-4">Send Message</h1>

            <input id="name" className="form-control" value= {name} onChange={this.handleNameChange} placeholder="Name"/>
              
        <br/>
            <textarea id="message" value= {message} class="form-control" onChange={this.handleMessageChange} dplaceholder="Your Message Here">
            </textarea>

            <button id="send" className="btn btn-success" onClick={this.saveMesage}>Send</button>


            <div id="messages">



            </div>
          </div>
        </div>

      </header>
    </div>
      );
    }
  
}




export default App;
