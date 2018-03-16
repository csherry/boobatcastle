import React, { Component } from 'react';
import './Profile.css';
//import mySocket from 'socket.io-client';
//import chatbg from './image/chatbg.svg';
import Chatroom from './Chatroom.js';

class Profile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            ShowPage:false
        }
        
        this.ShowChatroom = this.ShowChatroom.bind(this);
    }
    
    ShowChatroom(){
        this.setState({
            ShowPage: true
        })
    }
    
    render() { 
        var comp = null;
        if (this.state.ShowPage === true){
            comp = (
                <Chatroom />
            )
                
        } else {
            comp = (
                <div className="ChatBG">
                    <button onClick={this.ShowChatroom}></button>
                </div>
            )
        }
        return (
             <div>
                {comp}
            </div>
            
        );
    }
}

export default Profile;