import React, { Component } from 'react';
import App from '../App.js';

class Rooms extends Component {
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
        if (this.state.mode === 1){
            comp = (
                <App />
            )     
        } else if (this.state.mode === 0){
            <div>
                <button onClick={this.props.handDisplay.bind(this, "room1")}>Sticker Room 1</button>
                <button onClick={this.props.handDisplay.bind(this, "room2")}>Sticker Room 2</button>
                <button onClick={this.props.handDisplay.bind(this, "room3")}>Sticker Room 3</button>
                <button onClick={this.props.handDisplay.bind(this, "room4")}>Sticker Room 4</button>
                <button onClick={this.props.handDisplay.bind(this, "room5")}>Sticker Room 5</button>  
            </div>
        }
            
        return (
            <div>
                {comp}
            </div>
        );
    }
}

export default Rooms;