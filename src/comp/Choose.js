import React, { Component } from 'react';
import './Choose.css';
import Quiz from './Quiz.js';
import App from '../App.js';
import Game from './Game.js';

class Choose extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            mode:0
        }
        
        this.ShowQuizroom = this.ShowQuizroom.bind(this);
        this.ShowGameroom = this.ShowGameroom.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }
  
    ShowQuizroom(){
        this.setState({
            mode:1
        })
    }
    
    ShowGameroom(){
        this.setState({
            mode:2
        })
    }
    
    leaveRoom(){
        this.setState({
            mode:3
        })
    }

    render() {
        var comp = null;
        
        if(this.state.mode === 1){
            comp = (
                <Quiz />
            )
        } else if (this.state.mode === 2){
            comp = (
                <Game />
            )
        } else if (this.state.mode === 3){
           comp = (
                <App />
            )
        } else {
            comp = (
                <div>
                    <button onClick={this.ShowQuizroom}>Quiz</button>
                    <button onClick={this.ShowGameroom}>Game</button>
                    <button onClick={this.leaveRoom}>Leave</button>
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

export default Choose;