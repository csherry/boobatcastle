import React, { Component } from 'react';
import './Game.css';
import Choose from './Choose.js';
import StartGame from './StartGame.js'

class Game extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            mode:0
        }

        this.ShowGameroom = this.ShowGameroom.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
    }
 
    ShowGameroom(){
        this.setState({
            mode:1
        })
    }
    
    leaveRoom(){
        this.setState({
            mode:2
        })
    }

    render() {
        var comp = null;
        
        if(this.state.mode === 1){
            comp = (
                <StartGame />
            )
        } else if (this.state.mode === 2){
            comp = (
                <Choose />
            )
        } else {
            comp = (
                <div>
                    <button onClick={this.ShowGameroom}>Start</button>
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

export default Game;