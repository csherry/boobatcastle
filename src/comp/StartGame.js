import React, { Component } from 'react';
import './StartGame.css';
import Game from './Game.js';

class StartGame extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            mode:0
        }

        this.leaveRoom = this.leaveRoom.bind(this);
    }
    
    leaveRoom(){
        this.setState({
            mode:1
        })
    }

    render() {
        var comp = null;
        
        if(this.state.mode === 1){
            comp = (
                <Game />
            )
        } else {
            comp = (
                <div>
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

export default StartGame;