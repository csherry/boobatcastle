import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import './Quiz.css';
import Choose from './Choose.js';

class Quiz extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            screen:0,
            host:null,
            qobj:{q:null, o1:null, o2:null, o3:null, o4:null}
        }
        
        this.leaveRoom = this.leaveRoom.bind(this);
    }
    
    componentDidMount(){
        this.socket = mySocket('https://castlequizsocket.herokuapp.com/');
        
        this.socket.on("newq", (data)=>{
            this.setState({
                qobj:data
            })  
        })
        
        this.socket.on("result", (data)=>{
            alert(data);
        })
    }
    
    handleRoom=(roomStr)=>{
        this.setState({
            screen:1
        })
        
        //emit: send info to server
        //on: server send sth to client
        this.socket.emit('joinroom', roomStr);
    }
    
    handleHost=(isHost)=>{
        this.setState({
            screen:2,
            host:isHost
        })
    }
    
    handleQ=()=>{
        var obj = {
            q:this.refs.q.value,
            o1:this.refs.o1.value,
            o2:this.refs.o2.value,
            o3:this.refs.o3.value,
            o4:this.refs.o4.value,
            o4:this.refs.o4.value,
            a:this.refs.a.value
        }
        
        this.socket.emit("qsumbit", obj);
    }
    
    handleA=(optionNum)=>{
        this.socket.emit("answer", optionNum);
    }
    
    leaveRoom(){
        this.setState({
            screen:3
        })
    }

    render() {
        var comp = null;
        
        if(this.state.screen === 0){
            comp = (
                <div>
                    <button onClick={this.handleRoom.bind(this, 'room1')}>Room 1</button>
                    <button onClick={this.handleRoom.bind(this, 'room2')}>Room 2</button>
                    <button onClick={this.leaveRoom}>Leave</button>
                </div>
            )
        } else if (this.state.screen === 1){
            comp = (
                <div>
                    <button onClick={this.handleHost.bind(this, true)}>Host</button>
                    <button onClick={this.handleHost.bind(this, false)}>Player</button>
                    <button onClick={this.leaveRoom}>Leave</button>
                </div>
            )
        } else if (this.state.screen === 2){
            if (this.state.host === true){
                comp = (
                    <div>
                        <input ref='q' type='text' placeholder='Question' />
                        <input ref='o1' type='text' placeholder='Option 1' />
                        <input ref='o2' type='text' placeholder='Option 2' />
                        <input ref='o3' type='text' placeholder='Option 3' />
                        <input ref='o4' type='text' placeholder='Option 4' />
                        <select ref='a'>
                            <option value='1'>Option 1</option>
                            <option value='2'>Option 2</option>
                            <option value='3'>Option 3</option>
                            <option value='4'>Option 4</option>
                        </select>
                        <button onClick={this.handleQ}>Sumbit the Question</button>
                        <button onClick={this.leaveRoom}>Leave</button>
                    </div>
                )
            } else if (this.state.host === false){
                comp = (
                    <div>
                        <div>{this.state.qobj.q}</div>
                        <button onClick={this.handleA.bind(this, 1)}>{this.state.qobj.o1}</button>
                        <button onClick={this.handleA.bind(this, 2)}>{this.state.qobj.o2}</button>
                        <button onClick={this.handleA.bind(this, 3)}>{this.state.qobj.o3}</button>
                        <button onClick={this.handleA.bind(this, 4)}>{this.state.qobj.o4}</button>
                        <button onClick={this.leaveRoom}>Leave</button>
                    </div>
                )
            }
        } else if (this.state.screen === 3){
            comp = (
                <Choose />
            )
        }
        
        return (
            <div>
                {comp}
            </div>
        );
    }
}

export default Quiz;