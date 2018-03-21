import React, { Component } from 'react';

class Rooms extends Component {
    constructor(props){
        super(props);
    }
    

    render() {
        return (
            <div>
                <button onClick={this.props.handDisplay.bind(this, "room1")}>Sticker Room 1</button>
                <button onClick={this.props.handDisplay.bind(this, "room2")}>Sticker Room 2</button>
                <button onClick={this.props.handDisplay.bind(this, "room3")}>Sticker Room 3</button>
                <button onClick={this.props.handDisplay.bind(this, "room4")}>Sticker Room 4</button>
                <button onClick={this.props.handDisplay.bind(this, "room5")}>Sticker Room 5</button>
            </div>
        );
    }
}

export default Rooms;