import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import './Chatroom.css';
import ChatPage from './ChatPage.js';
//import chatbg from './image/chatbg.svg';
import ava1 from './image/iconGreen.svg';
import ava2 from './image/icon-Blue.svg';
import ava3 from './image/iconPink.svg';
import ava4 from './image/iconRed.svg';
import exit from './image/Back.svg';

class Chatroom extends Component {
    constructor(props){
        super(props);
        
         this.state = {
            myname: "",
            mode:0,
            allnames:[],
            allmsgs:[],
            avatar:[ava1,ava2,ava3,ava4],
            avaIndex:0,
            msg:"",
            time:""
        }
        
        this.joinChat = this.joinChat.bind(this);        
        this.handleName = this.handleName.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendMsg = this.sendMsg.bind(this);
        this.avaChange = this.avaChange.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }
    
    componentWillUnmount(){
        this.socket.disconnect();
    }
    
    componentDidMount() {
 
        this.Clock = setInterval( () => this.GetTime(), 1000 );
        
    }
    
    joinChat(){
        this.setState({
            mode:1
        })
        
        this.socket = mySocket("https://castlechatsocket.herokuapp.com/");
        var uinfo = {
            name:this.state.myname,
            ava: this.state.avaIndex
        }
        this.socket.emit("uName", uinfo);
        this.socket.on("names", (data)=>{
            this.setState({
                allnames:data
            });    
        })
        
        this.socket.on("allmsgs", (data)=>{
            this.setState({
                allmsgs:data
            })
        })
        
       /* 
       this.socket.on("imgs", (data)=>{
            this.setState({
                allimgs:data
            })
        })
        */
    }
    
   handleName(evt){
        this.setState({
            myname:evt.target.value
        })
    }
    
     handleMyMsg(evt){
        this.setState({
            msg:evt.target.value
        })
    }
    
    leaveRoom(){
        this.setState({
            mode:2
        })
        this.socket.disconnect();
    }
    
    sendMsg(){
        var msg = this.state.myname+" "+"("+this.state.time+")"+": " +this.state.msg;
        this.socket.emit("msg", msg);         
    }
    
    /*
    avaChange(evt){
        this.setState({
            myimg:evt.target.src
        })
    }
    */
    
    GetTime() {
 
        var date, TimeType, hour, minutes, fullTime;

        date = new Date();
        hour = date.getHours(); 

            if(hour <= 11)
            {

              TimeType = 'AM';

            }
            else{

              TimeType = 'PM';

            }

                if( hour > 12 )
                {
                  hour = hour - 12;
                } 
                if( hour == 0 )
                {
                    hour = 12;
                } 

                minutes = date.getMinutes();

                if(minutes < 10)
                {
                  minutes = '0' + minutes.toString();

                }

                fullTime = hour.toString() + ':' + minutes.toString() + ':' + ' ' + TimeType.toString();

                this.setState({
                  time: fullTime
        })
    }
    
    avaChange(i){
        this.setState({
            avaIndex:i
        })
    }
    
    render() {
        var comp = null;
        var allava = this.state.avatar.map((obj,i)=>{
            return(
                 <img ref="avaImg" src={obj} alt="img" key={i}  width={50} height={50}  onClick={this.avaChange.bind(this, i)}/>
            )
        });
        if(this.state.mode === 0){
            comp = (
                <div>
                     <input type="text" placeholder="type in your username" onChange={this.handleName}/>
                    <button onClick={this.joinChat}>Join Chat</button>
                    <br/>
                    <div>
                        <p>Choose your own avatar</p>
                    </div>
                    {allava}
                </div>
            )
        }else if(this.state.mode === 1){
            var allmsgs = this.state.allmsgs.map((obj, i)=>{
                return (
                    <div key={i} >
                        {obj}
                    </div>
                )
            })
            
            var allNames = this.state.allnames.map((obj, i)=>{
                return(
                    <div key={i}>
                        <img src={this.state.avatar[obj.ava]} width={30} alt="img"/> 
                        {obj.name}
                    </div>
                )
            })

            comp = (
                <div id="chatBox">
                    <div id="chatUser">
                        <img src={exit} alt="exitarrow" onClick={this.leaveRoom} width={50}/>
                        Online: <hr/>
                        {allNames}
                    </div>
                    <div id="chatMsg">{allmsgs}</div>
                    <div id="chatinput">
                        <input className='type' type="text" placeholder="type your msg here" onChange={this.handleMyMsg}/>
                        <button onClick={this.sendMsg}>Send</button>
                    </div>
                </div>
            );
        } else if (this.state.mode === 2){
            comp = (
                <ChatPage/>
            )
        }
        
        return (
            
            <div className="TheApp">
                {comp}
            </div>
        );
    }
}

export default Chatroom;