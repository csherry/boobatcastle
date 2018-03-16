import React, { Component } from 'react';
import './Stick.css';
import mySocket from 'socket.io-client';
import Rooms from './Rooms.js';

class stick extends Component {
    constructor(props){
        super(props);
        this.state={
            myImg:require("./image/bathappy.svg"),
            myImg2:require("./image/ghostsss.svg"),
            myImg3:require("./image/skull.svg"),
            myImg4:require("./image/blow.svg"),
            myImg5:require("./image/besom.svg"),
            myImg6:require("./image/tomb.svg"),
            allusers:[],
            myId: null,
            showDisplay: false
        }
        this.handleImage = this.handleImage.bind(this);
        this.handDisplay = this.handDisplay.bind(this);
    }
    
    handDisplay(roomString){
        this.setState({
            showDisplay:true
        })
        
        this.socket.emit("joinroom", roomString);
    }
    
    componentDidMount(){
        this.socket = mySocket("http://localhost:3003");
        
        this.socket.on("userjoined", (data)=>{
            this.setState({
                allusers:data
            })
        })
        
        this.socket.on("yourid", (data)=>{
            this.setState({
                myId:data
            });
            
            this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
                if(this.state.myId === null){
                    //fail
                    return false;
                }
                this.refs["u"+this.state.myId].style.left = ev.pageX + "px";
                this.refs["u"+this.state.myId].style.top = ev.pageY + "px";


                this.socket.emit("mymove", {
                    x:ev.pageX,
                    y:ev.pageY,
                    id:this.state.myId,
                    src: this.refs["u"+this.state.myId].src
                })
            })
        })
        
        this.socket.on("newmove", (data)=>{
            this.refs["u"+data.id].style.left =data.x + "px";
            this.refs["u"+data.id].style.top =data.y + "px";
            this.refs["u"+data.id].src =data.src;
        })
        
        /*this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
            if(this.state.myId === null){
                //fail
                return false;
            }
            this.refs["u"+this.state.myId].style.left = ev.pageX + "px";
            this.refs["u"+this.state.myId].style.top = ev.pageY + "px";
            
            
            this.socket.emit("mymove", {
                x:ev.pageX,
                y:ev.pageY,
                id:this.state.myId,
                src: this.refs["u"+this.state.myId].src
            })
        })*/
    }
    
    handleImage(evt){
        this.refs["u"+this.state.myId].src = evt.target.src;
    }
    
    render() {
        console.log(this.state.myId);
        var allimgs = this.state.allusers.map((obj, i)=>{
            return(
                <img ref={"u"+obj} className="allImgs" src={this.state.myImg} height={50} key={i}/>
            )
        });
        
        var comp = null;
        
        if (this.state.showDisplay === false){
            comp =(
                <Rooms handDisplay={this.handDisplay}/>
            )
        } else {
             comp = (
                <div>
                    <div ref="thedisplay" id="display">
                        {allimgs}
                        <img ref="myImg" id="myImg" src={this.state.myImg} height={50}/>    
                    </div>
                    <div id="controls">
                        {this.state.myId}
                        <img src={this.state.myImg} height={50} onClick={this.handleImage}/>
                        <img src={this.state.myImg2} height={60} onClick={this.handleImage}/>
                        <img src={this.state.myImg3} height={60} onClick={this.handleImage}/>
                        <img src={this.state.myImg4} height={60} onClick={this.handleImage}/>
                        <img src={this.state.myImg5} height={60} onClick={this.handleImage}/>
                        <img src={this.state.myImg6} height={60} onClick={this.handleImage}/>
                    </div>
                </div>
            )
        }
        
       
        
        return (
            <div className="App">
               {comp}
            </div>
        );
    }
}

export default stick;