import React, { Component } from 'react';
import './StartGame.css';
import Game from './Game.js';

class StartGame extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            mode:0,
            time: {}, 
            newtime: {},
            seconds: 5,
            newseconds: 15,
            p1score: 0,
            p2socre: 0
        }
        
        this.timer = 0;
        this.newtimer = 0;
        this.leaveRoom = this.leaveRoom.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.newstartTimer = this.newstartTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.newcountDown = this.newcountDown.bind(this);
        this.player1 = this.player1.bind(this);
        this.player2 = this.player2.bind(this);
    }
    
    componentWillUnmount(){
        this.socket.disconnect();
    }
    
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ 
            time: timeLeftVar 
        });
        
        let newtimeLeftVar = this.secondsToTime(this.state.newseconds);
        this.setState({ 
            newtime: newtimeLeftVar 
        });
    }
    
    secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }
    
    startTimer() {
        if (this.timer == 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    
    newstartTimer() {
        if (this.newtimer == 0) {
            this.newtimer = setInterval(this.newcountDown, 1000);
        }
    }
    
    countDown() {
        alert("The more time you click your competitor, the more score you will get!")
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        if(seconds == 0) { 
            clearInterval(this.timer);
            alert("Start!");
        }
    }
    
    newcountDown() {
        let newseconds = this.state.newseconds - 1;
        this.setState({
            newtime: this.secondsToTime(newseconds),
            newseconds: newseconds,
        });

        if(newseconds == 0) { 
            clearInterval(this.newtimer);
            alert("Stop!");
        }
    }
    
    player1(){
        var p1num = 0;
        p1num++;
        this.setState({
            p1score: p1num
        })
    }
    
    player2(){
        var p2num = 0;
        p2num++;
        this.setState({
            p2score: p2num
        })
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
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1366 768'>
        <g className='cls-1-06'>
            <g id='图层_2' dataName='图层 2'>
                <g id='bangbang'>
                    <rect id='BG' className='cls-2-06' width='1366' height='768' />
                    <g id='player1Ready' onClick={this.startTimer}>
                        <rect className='cls-3-06' x='185.41' y='644' width='204' height='70' rx='22.9'
                        ry='22.9' />
                        <path className='cls-2-06' d='M248.27,681.15v10h-4.78v-25.7h6.26q4,0,5.86,1.88t1.89,5.75q0,4.87-3.29,6.8l4.94,11.27H254l-4.06-10Zm0-4.11h1.23a2.87,2.87,0,0,0,2.43-1,4.63,4.63,0,0,0,.74-2.86,4,4,0,0,0-.78-2.8,3.17,3.17,0,0,0-2.42-.83h-1.2Z'
                        />
                        <path className='cls-2-06' d='M268.43,691.5a7.06,7.06,0,0,1-5.79-2.61q-2.12-2.61-2.12-7.39t1.92-7.58a6.17,6.17,0,0,1,5.34-2.72,6.09,6.09,0,0,1,5,2.33,10.27,10.27,0,0,1,1.85,6.53v2.5h-9.4a6.39,6.39,0,0,0,1.07,3.89,3.4,3.4,0,0,0,2.81,1.27,9.11,9.11,0,0,0,4.68-1.42v3.85A10.28,10.28,0,0,1,268.43,691.5Zm-.69-16.7a1.91,1.91,0,0,0-1.65,1.06,7.15,7.15,0,0,0-.76,3.3h4.75a7.09,7.09,0,0,0-.65-3.25A1.87,1.87,0,0,0,267.74,674.8Z'
                        />
                        <path className='cls-2-06' d='M287.36,691.15l-.93-2.67h-.11a6.64,6.64,0,0,1-2.14,2.37,5.45,5.45,0,0,1-2.79.65,4.05,4.05,0,0,1-3.4-1.62,7.25,7.25,0,0,1-1.24-4.5,5.83,5.83,0,0,1,1.7-4.6,8,8,0,0,1,5.07-1.66l2.6-.11v-1.41q0-2.74-2.37-2.74a8.12,8.12,0,0,0-4,1.37L278.08,673a11.64,11.64,0,0,1,6.35-1.85,6.09,6.09,0,0,1,4.74,1.78,7.24,7.24,0,0,1,1.63,5.05v13.15Zm-4.06-3.3a2.35,2.35,0,0,0,2-1.15,5.47,5.47,0,0,0,.76-3.07V682l-1.44.07a3.27,3.27,0,0,0-2.35.91,3.56,3.56,0,0,0-.75,2.46Q281.58,687.85,283.3,687.85Z'
                        />
                        <path className='cls-2-06' d='M299.72,691.5a4.77,4.77,0,0,1-4.27-2.67,14.78,14.78,0,0,1-1.56-7.44,15.31,15.31,0,0,1,1.53-7.49,4.68,4.68,0,0,1,4.22-2.71,4,4,0,0,1,2.31.66,6,6,0,0,1,1.8,2.22H304q-.21-2.67-.21-3.74V663.8h4.68v27.35H305l-.79-2.55h-.16A4.7,4.7,0,0,1,299.72,691.5Zm1.51-4a2,2,0,0,0,1.9-1.19,11.1,11.1,0,0,0,.65-4.32v-.62a13.25,13.25,0,0,0-.61-4.8,2.06,2.06,0,0,0-2-1.39q-1.3,0-1.89,1.59a14,14,0,0,0-.59,4.63,13.17,13.17,0,0,0,.6,4.56A2,2,0,0,0,301.23,687.55Z'
                        />
                        <path className='cls-2-06' d='M310.44,671.57h4.85L318,682.63a25.32,25.32,0,0,1,.65,4.13h.11q0-.42.16-1.5t.23-1.7q.09-.62,2.43-12h4.92l-5.61,21a12.25,12.25,0,0,1-2.71,5.55,6.08,6.08,0,0,1-4.5,1.69,9.39,9.39,0,0,1-2.48-.3v-3.92a5.75,5.75,0,0,0,1.62.21q2.36,0,3.09-3.09l.33-1.23Z'
                        />
                    </g>
                    <g id='player2Ready' onClick={this.newstartTimer}>
                        <rect className='cls-3-06' x='981' y='644' width='204' height='70' rx='22.9'
                        ry='22.9' />
                        <path className='cls-2-06' d='M1043.86,681.15v10h-4.78v-25.7h6.26q4,0,5.86,1.88t1.89,5.75q0,4.87-3.29,6.8l4.94,11.27h-5.12l-4.06-10Zm0-4.11h1.23a2.87,2.87,0,0,0,2.43-1,4.63,4.63,0,0,0,.74-2.86,4,4,0,0,0-.78-2.8,3.17,3.17,0,0,0-2.42-.83h-1.2Z'
                        />
                        <path className='cls-2-06' d='M1064,691.5a7.06,7.06,0,0,1-5.79-2.61q-2.12-2.61-2.12-7.39t1.92-7.58a6.17,6.17,0,0,1,5.34-2.72,6.09,6.09,0,0,1,5,2.33,10.27,10.27,0,0,1,1.85,6.53v2.5h-9.4a6.39,6.39,0,0,0,1.07,3.89,3.4,3.4,0,0,0,2.81,1.27,9.11,9.11,0,0,0,4.68-1.42v3.85A10.28,10.28,0,0,1,1064,691.5Zm-.69-16.7a1.91,1.91,0,0,0-1.65,1.06,7.15,7.15,0,0,0-.76,3.3h4.75a7.09,7.09,0,0,0-.65-3.25A1.87,1.87,0,0,0,1063.34,674.8Z'
                        />
                        <path className='cls-2-06' d='M1083,691.15l-.93-2.67h-.11a6.64,6.64,0,0,1-2.14,2.37,5.45,5.45,0,0,1-2.79.65,4.05,4.05,0,0,1-3.4-1.62,7.25,7.25,0,0,1-1.24-4.5,5.83,5.83,0,0,1,1.7-4.6,8,8,0,0,1,5.07-1.66l2.6-.11v-1.41q0-2.74-2.37-2.74a8.12,8.12,0,0,0-4,1.37l-1.62-3.23a11.64,11.64,0,0,1,6.35-1.85,6.09,6.09,0,0,1,4.74,1.78,7.24,7.24,0,0,1,1.63,5.05v13.15Zm-4.06-3.3a2.35,2.35,0,0,0,2-1.15,5.47,5.47,0,0,0,.76-3.07V682l-1.44.07a3.27,3.27,0,0,0-2.35.91,3.56,3.56,0,0,0-.75,2.46Q1077.17,687.85,1078.89,687.85Z'
                        />
                        <path className='cls-2-06' d='M1095.31,691.5a4.77,4.77,0,0,1-4.27-2.67,14.78,14.78,0,0,1-1.56-7.44,15.31,15.31,0,0,1,1.53-7.49,4.68,4.68,0,0,1,4.22-2.71,4,4,0,0,1,2.31.66,6,6,0,0,1,1.8,2.22h.28q-.21-2.67-.21-3.74V663.8h4.68v27.35h-3.48l-.79-2.55h-.16A4.7,4.7,0,0,1,1095.31,691.5Zm1.51-4a2,2,0,0,0,1.9-1.19,11.1,11.1,0,0,0,.65-4.32v-.62a13.25,13.25,0,0,0-.61-4.8,2.06,2.06,0,0,0-2-1.39q-1.3,0-1.89,1.59a14,14,0,0,0-.59,4.63,13.17,13.17,0,0,0,.6,4.56A2,2,0,0,0,1096.82,687.55Z'
                        />
                        <path className='cls-2-06' d='M1106,671.57h4.85l2.71,11.06a25.32,25.32,0,0,1,.65,4.13h.11q0-.42.16-1.5t.23-1.7q.09-.62,2.43-12h4.92l-5.61,21a12.25,12.25,0,0,1-2.71,5.55,6.08,6.08,0,0,1-4.5,1.69,9.39,9.39,0,0,1-2.48-.3v-3.92a5.75,5.75,0,0,0,1.62.21q2.36,0,3.09-3.09l.33-1.23Z'
                        />
                    </g>
                    <g id='player1Icon' onClick = {this.player2}>
                        <path className='cls-4-06' d='M287.56,378.34h.13q8.17.27,16.35.18a376,376,0,0,0,63-6l-6.73-12.59,6.39-18.65a376,376,0,0,1-63,6q-7.95.09-15.9-.17h-.5q-7.95.25-15.9.17a376,376,0,0,1-63-6l6.39,18.65-6.73,12.59a376.05,376.05,0,0,0,63,6q8.18.09,16.35-.18Z'
                        />
                        <path className='cls-5-06' d='M287.56,378.34h.13q8.17.27,16.35.18a376,376,0,0,0,63-6l-6.73-12.59,6.39-18.65a376,376,0,0,1-63,6q-7.95.09-15.9-.17h-.5q-7.95.25-15.9.17a376,376,0,0,1-63-6l6.39,18.65-6.73,12.59a376.05,376.05,0,0,0,63,6q8.18.09,16.35-.18Z'
                        />
                        <g>
                            <path className='cls-4-06' d='M287.56,387.24a376,376,0,0,0,63-5.35V350.65a376,376,0,0,1-63,5.35,376,376,0,0,1-63-5.35v31.23A376,376,0,0,0,287.56,387.24Z'
                            />
                            <path className='cls-4-06' d='M287.56,387.24a376,376,0,0,0,63-5.35V350.65a376,376,0,0,1-63,5.35,376,376,0,0,1-63-5.35v31.23A376,376,0,0,0,287.56,387.24Z'
                            />
                        </g>
                        <g className='cls-6-06'>
                            <path className='cls-4-06' d='M270.35,347.26a376.13,376.13,0,0,1-61.92-6l6.39,18.65-6.73,12.59q8.19,1.48,16.42,2.6v6.81a376,376,0,0,0,63,5.35q11.06,0,22.1-.67Z'
                            />
                            <path className='cls-7-06' d='M270.35,347.26a376.13,376.13,0,0,1-61.92-6l6.39,18.65-6.73,12.59q8.19,1.48,16.42,2.6v6.81a376,376,0,0,0,63,5.35q11.06,0,22.1-.67Z'
                            />
                        </g>
                        <g>
                            <path className='cls-7-06' d='M287.56,354.5,335,347.32s-.3-.51-.8-1.45c13.08-4.63,28.87-17.57,16-14.27A20.6,20.6,0,0,1,324.11,314a74.78,74.78,0,0,1-.54-13.79c.91-16.14-5.66-23.49-12.74-20.19-4.53,2.11-13.9,3.17-23.27,3.17s-18.74-1.06-23.27-3.17c-7.07-3.3-13.65,4.05-12.74,20.19A74.77,74.77,0,0,1,251,314a20.6,20.6,0,0,1-26.13,17.59c-12.88-3.3,2.92,9.65,16,14.27-.5.94-.8,1.45-.8,1.45Z'
                            />
                            <path className='cls-8-06' d='M287.56,359.94c16.86.06,71.31-2.25,88.72-18.58,20.7-19.41,16.12-32.71-2.78-32-15.29.58-21.72,26.65-58.65,37.93a93.57,93.57,0,0,1-54.59,0C223.33,336,216.9,310,201.61,309.37c-18.9-.72-23.48,12.58-2.78,32C216.25,357.69,270.69,360,287.56,359.94Z'
                            />
                            <path className='cls-9-06' d='M287.56,320.12c21.91-1,36.76-4.81,36.76-4.81s2.33,4.54,6.71,11.94a72,72,0,0,1-17,6.8,101.19,101.19,0,0,1-52.88,0,72,72,0,0,1-17-6.8c4.38-7.4,6.71-11.94,6.71-11.94S265.65,319.14,287.56,320.12Z'
                            />
                            <polygon className='cls-2-06' points='287.56 322.74 289.67 325.51 292.96 326.67 290.98 329.53 290.9 333.02 287.56 332.02 284.21 333.02 284.14 329.53 282.15 326.67 285.44 325.51 287.56 322.74'
                            />
                            <circle className='cls-2-06' cx='302.72' cy='327.88' r='2.37' />
                            <circle className='cls-2-06' cx='272.4' cy='327.88' r='2.37' />
                            <circle className='cls-2-06' cx='314.77' cy='325.51' r='2.37' />
                            <circle className='cls-2-06' cx='260.34' cy='325.51' r='2.37' />
                            <path className='cls-10-06' d='M259.57,346.9a48.27,48.27,0,0,0,6.92-16.64c2-9.73-1.47-32.41,1.26-36.91s8.18-1.68,14.4-1.26,13.79-1.57,13.79-1.57-12.79-.31-19.6-2.62a19.78,19.78,0,0,1-9.85-7h0a17.94,17.94,0,0,1-2.2-.83c-7.07-3.3-13.65,4.05-12.74,20.19A74.77,74.77,0,0,1,251,314c-.06.44-.13.88-.21,1.32,0,0-2.35,4.57-6.71,11.93a19.86,19.86,0,0,1-6.22,3.79,20.32,20.32,0,0,1-6.16,1.28c-13.74-11-20-22.55-30.09-22.94-18.9-.72-23.48,12.58-2.78,32,8.32,7.8,25.1,12.4,42.19,15.07C243.52,356.82,259.57,346.9,259.57,346.9Z'
                            />
                        </g>
                        <g>
                            <path className='cls-2-06' d='M248.32,376.86a15.15,15.15,0,0,1-5.15-.06c-5.39-.84-8.95-4.19-8.05-8.88.86-4.48,5.26-6.76,10.89-5.89a12.67,12.67,0,0,1,4.22,1.27l-.78,1.44a11.11,11.11,0,0,0-3.6-1.14c-4.28-.66-7.5,1-8.18,4.72-.64,3.51,1.63,6.28,6.26,7a12.22,12.22,0,0,0,4.1,0Z'
                            />
                            <path className='cls-2-06' d='M267.72,371.9c-.36,5-4.58,7.38-9.49,6.88-5.08-.52-8.24-4-7.65-8.36.61-4.59,4.6-7.09,9.47-6.59S268,367.58,267.72,371.9Zm-14.56-1.19a6,6,0,1,0,12,1.08,5.77,5.77,0,0,0-5.37-6.45C255.87,364.94,253.56,367.53,253.16,370.71Z'
                            />
                            <path className='cls-2-06' d='M273.57,379.71c-1.67-5.92-2.45-8.89-3.92-14.83l2.5.16c.7,3,1.06,4.49,1.81,7.49.47,1.84.89,3.68,1.17,5.1h.06a51.89,51.89,0,0,1,1.76-5c1.12-2.9,1.67-4.35,2.73-7.27l2.47.06c.83,3,1.25,4.47,2.13,7.44a49.55,49.55,0,0,1,1.27,5h.06c.41-1.6,1-3.22,1.55-5,1-2.94,1.49-4.41,2.44-7.36l2.42,0c-2,5.86-3,8.79-5.25,14.61l-2.6,0c-.93-3.05-1.39-4.58-2.27-7.63a33.61,33.61,0,0,1-1.1-4.79h-.05a34.78,34.78,0,0,1-1.57,4.72c-1.16,3-1.76,4.5-3,7.49Z'
                            />
                            <path className='cls-2-06' d='M294.3,365.61a31.8,31.8,0,0,1,4.31-.44,9.71,9.71,0,0,1,5.08.82,3,3,0,0,1,1.69,2.48c.09,1.4-1,2.71-3,3.38v0c1.8.25,4,1.26,4.1,3.42a3.52,3.52,0,0,1-1.43,3c-1.25,1-3.44,1.57-6.58,1.68a34,34,0,0,1-3.87-.06Zm2.55,5.9,2.19-.08c2.55-.1,4-1.23,3.92-2.63-.09-1.71-1.77-2.28-4.17-2.19a13.48,13.48,0,0,0-2.1.2Zm.22,7a16.4,16.4,0,0,0,2.08,0c2.56-.1,4.88-.95,4.76-3.06s-2.36-2.68-5-2.58l-2,.07Z'
                            />
                            <path className='cls-2-06' d='M325.56,370.1c.67,5-3,8.17-7.89,8.67-5.08.52-8.87-2.22-9.19-6.62-.34-4.62,3-7.88,7.92-8.39S325,365.81,325.56,370.1Zm-14.5,1.81a6,6,0,1,0,12-1.39,5.78,5.78,0,0,0-6.58-5.21C312.53,365.71,310.8,368.72,311.06,371.91Z'
                            />
                            <path className='cls-2-06' d='M333.24,376.5l-1-6.11c-2.89-2.94-4.3-4.43-7.06-7.44l2.67-.38c1.26,1.44,1.9,2.16,3.18,3.59.88,1,1.57,1.77,2.32,2.67h.06c.37-1,.85-2.07,1.37-3.28.79-1.77,1.17-2.65,1.93-4.42l2.66-.49c-1.8,3.75-2.73,5.62-4.69,9.35l1,6.12Z'
                            />
                        </g>
                    </g>
                    <g id='player2Icon' onClick = {this.player1}>
                        <polygon className='cls-7-06' points='1164.88 393.49 1153.93 380.97 1164.88 368.44 1113.79 368.44 1113.79 393.49 1164.88 393.49'
                        />
                        <polygon className='cls-7-06' points='1000.23 393.49 1011.18 380.97 1000.23 368.44 1051.32 368.44 1051.32 393.49 1000.23 393.49'
                        />
                        <rect className='cls-8-06' x='1065.27' y='318.71' width='34.57' height='124.51'
                        transform='rotate(-90 1082.555 380.965)' />
                        <polygon className='cls-10-06' points='1104.87 398.25 1070.3 363.69 1020.3 363.69 1020.3 368.44 1000.23 368.44 1011.18 380.97 1000.23 393.49 1020.3 393.49 1020.3 398.25 1104.87 398.25'
                        />
                        <g>
                            <g id='player2Icon-2' dataName='player2Icon'>
                                <path className='cls-7-06' d='M1082.56,297.09c6-.29,16.33-1.63,24.74-7.1,12.58-8.18,13.63,10.27,14.25,28.51s6.5,25.78,6.5,25.78l-45.49,8.14-45.49-8.14s5.87-7.55,6.5-25.78,1.68-36.68,14.25-28.51C1066.23,295.46,1076.6,296.8,1082.56,297.09Z'
                                />
                                <path className='cls-11-06' d='M1038.56,341.75h88c-1.58-3.14-4-9.36-4.77-19.31h-78.45C1042.52,332.39,1040.14,338.61,1038.56,341.75Z'
                                />
                                <path className='cls-8-06' d='M1082.56,361.06c19.39-.24,59.74-3.46,73.26-15.41,15.69-13.87,1.89-30.13-16-20.1-17.26,9.66-28.32,23.75-57.23,24.21-28.91-.46-40-14.55-57.23-24.21-17.92-10-31.73,6.23-16,20.1C1022.81,357.6,1063.16,360.83,1082.56,361.06Z'
                                />
                                <circle className='cls-2-06' cx='1051.53' cy='332.1' r='3.25' />
                                <circle className='cls-2-06' cx='1067.04' cy='332.1' r='3.25' />
                                <circle className='cls-2-06' cx='1082.56' cy='332.1' r='3.25' />
                                <circle className='cls-2-06' cx='1098.07' cy='332.1' r='3.25' />
                                <circle className='cls-2-06' cx='1113.58' cy='332.1' r='3.25' />
                                <path className='cls-10-06' d='M1062.33,346.59s-1.57-12.37-1.15-19.91,2.62-21.59,15.93-20.23,17.71-2.83,17.71-2.83-8.18,2.93-19.39-2.52a41.14,41.14,0,0,1-10.31-7.46,38.3,38.3,0,0,1-7.3-3.65c-12.58-8.18-13.63,10.27-14.25,28.51,0,1.38-.13,2.68-.24,3.94s-.21,2.28-.35,3.35l-.08.61q-.17,1.29-.38,2.48l-.09.51c-.25,1.39-.53,2.68-.83,3.86l-.14.52q-.23.87-.47,1.67l-.07.24c-5.09-3.44-10-7-15.6-10.14-17.92-10-31.73,6.23-16,20.1,13.52,11.95,53.87,15.18,73.26,15.41l1.94,0C1074.43,357.09,1062.33,346.59,1062.33,346.59Z'
                                />
                            </g>
                            <text className='cls-12-06' transform='translate(1035.22 389.71)'>COWBOY</text>
                        </g>
                    </g>
                    <g id='middleLine'>
                        <rect className='cls-13-06' x='684' y='187' width='6' height='6' />
                        <path className='cls-13-06' d='M690,602.94h-6V590.89h6Zm0-24.11h-6V566.77h6Zm0-24.11h-6V542.66h6Zm0-24.11h-6V518.54h6Zm0-24.11h-6V494.43h6Zm0-24.11h-6V470.31h6Zm0-24.11h-6V446.2h6Zm0-24.11h-6V422.09h6ZM690,410h-6V398h6Zm0-24.11h-6V373.86h6Zm0-24.11h-6V349.74h6Zm0-24.11h-6V325.63h6Zm0-24.11h-6V301.51h6Zm0-24.11h-6V277.4h6Zm0-24.11h-6V253.29h6Zm0-24.11h-6V229.17h6Zm0-24.11h-6V205.06h6Z'
                        />
                        <rect className='cls-13-06' x='684' y='615' width='6' height='6' />
                    </g>
                    <text className='cls-14-06' transform='translate(475.1 96.08)'>
                        <tspan className='cls-15-06'>B</tspan>
                        <tspan x='21.55' y='0'>AN</tspan>
                        <tspan className='cls-16-06' x='80.11' y='0'>G</tspan>
                        <tspan x='106.13' y='0'>!</tspan>
                        <tspan className='cls-17-06' x='127.73' y='0'>B</tspan>
                        <tspan x='149.28' y='0'>AN</tspan>
                        <tspan className='cls-16-06' x='207.84' y='0'>G</tspan>
                        <tspan x='233.85' y='0'>!</tspan>
                        <tspan className='cls-15-06' x='255.45' y='0'>B</tspan>
                        <tspan x='277' y='0'>AN</tspan>
                        <tspan className='cls-18-06' x='335.56' y='0'>G</tspan>
                        <tspan x='361.58' y='0'>!</tspan>
                    </text>
                    <rect id='RBG' className='cls-3-06' width='134' height='768' />
                    <g id='player1'>
                        <path className='cls-2-06' d='M43.12,203.22a5.14,5.14,0,0,1-1.21,3.67,4.56,4.56,0,0,1-3.48,1.28h-.7v5.44H34.95v-15h3.8Q43.12,198.61,43.12,203.22Zm-5.38,2.52h.53a1.94,1.94,0,0,0,1.53-.56,3.59,3.59,0,0,0,0-3.59,1.73,1.73,0,0,0-1.43-.57h-.68Z'
                        />
                        <path className='cls-2-06' d='M47.57,213.6H44.84v-16h2.73Z' />
                        <path className='cls-2-06' d='M55.45,213.6,54.91,212h-.06a3.87,3.87,0,0,1-1.25,1.38,3.18,3.18,0,0,1-1.63.38,2.36,2.36,0,0,1-2-.94,4.22,4.22,0,0,1-.72-2.62,3.4,3.4,0,0,1,1-2.68,4.69,4.69,0,0,1,3-1l1.52-.06v-.82q0-1.6-1.38-1.6a4.74,4.74,0,0,0-2.36.8L50,203a6.79,6.79,0,0,1,3.7-1.08,3.55,3.55,0,0,1,2.76,1,4.23,4.23,0,0,1,.95,2.95v7.67Zm-2.37-1.93a1.37,1.37,0,0,0,1.19-.67,3.19,3.19,0,0,0,.45-1.79v-1l-.84,0a1.92,1.92,0,0,0-1.37.53,2.08,2.08,0,0,0-.44,1.44Q52.08,211.67,53.09,211.67Z'
                        />
                        <path className='cls-2-06' d='M58.5,202.18h2.83l1.58,6.45a14.78,14.78,0,0,1,.38,2.41h.06c0-.16,0-.46.09-.88s.1-.75.13-1,.51-2.57,1.42-7h2.87l-3.27,12.24A7.15,7.15,0,0,1,63,217.66a3.55,3.55,0,0,1-2.62,1,5.48,5.48,0,0,1-1.45-.17v-2.29a3.36,3.36,0,0,0,.94.12q1.37,0,1.8-1.8l.19-.72Z'
                        />
                        <path className='cls-2-06' d='M73.23,213.8a4.12,4.12,0,0,1-3.38-1.52A6.68,6.68,0,0,1,68.62,208a7.58,7.58,0,0,1,1.12-4.42A3.59,3.59,0,0,1,72.86,202a3.55,3.55,0,0,1,2.94,1.36,6,6,0,0,1,1.08,3.81v1.46H71.39a3.72,3.72,0,0,0,.63,2.27,2,2,0,0,0,1.64.74,5.33,5.33,0,0,0,2.73-.83V213A6,6,0,0,1,73.23,213.8Zm-.4-9.74a1.11,1.11,0,0,0-1,.62,4.18,4.18,0,0,0-.44,1.92H74.2a4.13,4.13,0,0,0-.38-1.9A1.09,1.09,0,0,0,72.83,204.06Z'
                        />
                        <path className='cls-2-06' d='M83.55,202a3.19,3.19,0,0,1,1,.15l-.32,2.64a2.27,2.27,0,0,0-.75-.1,1.74,1.74,0,0,0-1.53.78,4.06,4.06,0,0,0-.53,2.28v5.88H78.68V202.18h2.25l.31,1.79h.09a4.15,4.15,0,0,1,1-1.54A1.84,1.84,0,0,1,83.55,202Z'
                        />
                        <path className='cls-2-06' d='M97.26,213.6H94.51v-8.8q0-1.44.14-3.3-.07.1-.53.63T92.35,204l-1.56-1.7,4-3.69h2.48Z'
                        />
                    </g>
                    <text className='cls-19-06' transform='translate(41.62 300.6)'>Score</text>
                    <rect id='LBG' className='cls-3-06' x='1232' width='134' height='768'
                    />
                    <g id='player2'>
                        <path className='cls-2-06' d='M1275.12,203.22a5.15,5.15,0,0,1-1.21,3.67,4.56,4.56,0,0,1-3.48,1.28h-.7v5.44h-2.79v-15h3.8Q1275.12,198.61,1275.12,203.22Zm-5.38,2.52h.53a1.94,1.94,0,0,0,1.53-.56,3.6,3.6,0,0,0,0-3.59,1.73,1.73,0,0,0-1.43-.57h-.68Z'
                        />
                        <path className='cls-2-06' d='M1279.57,213.6h-2.73v-16h2.73Z' />
                        <path className='cls-2-06' d='M1287.46,213.6l-.54-1.56h-.06a3.87,3.87,0,0,1-1.25,1.38,3.18,3.18,0,0,1-1.63.38,2.36,2.36,0,0,1-2-.94,4.22,4.22,0,0,1-.72-2.62,3.4,3.4,0,0,1,1-2.68,4.69,4.69,0,0,1,3-1l1.52-.06v-.82q0-1.6-1.38-1.6a4.73,4.73,0,0,0-2.36.8L1282,203a6.78,6.78,0,0,1,3.7-1.08,3.55,3.55,0,0,1,2.76,1,4.23,4.23,0,0,1,.95,2.95v7.67Zm-2.37-1.93a1.37,1.37,0,0,0,1.19-.67,3.19,3.19,0,0,0,.45-1.79v-1l-.84,0a1.92,1.92,0,0,0-1.37.53,2.08,2.08,0,0,0-.44,1.44Q1284.08,211.67,1285.09,211.67Z'
                        />
                        <path className='cls-2-06' d='M1290.5,202.18h2.83l1.58,6.45a14.77,14.77,0,0,1,.38,2.41h.06c0-.16,0-.46.09-.88s.1-.75.13-1,.51-2.57,1.41-7h2.87l-3.27,12.24a7.15,7.15,0,0,1-1.58,3.24,3.55,3.55,0,0,1-2.62,1,5.47,5.47,0,0,1-1.45-.17v-2.29a3.35,3.35,0,0,0,.94.12q1.37,0,1.8-1.8l.19-.72Z'
                        />
                        <path className='cls-2-06' d='M1305.23,213.8a4.12,4.12,0,0,1-3.38-1.52,6.68,6.68,0,0,1-1.23-4.31,7.58,7.58,0,0,1,1.12-4.42,3.59,3.59,0,0,1,3.12-1.59,3.55,3.55,0,0,1,2.94,1.36,6,6,0,0,1,1.08,3.81v1.46h-5.49a3.73,3.73,0,0,0,.63,2.27,2,2,0,0,0,1.64.74,5.33,5.33,0,0,0,2.73-.83V213A6,6,0,0,1,1305.23,213.8Zm-.4-9.74a1.11,1.11,0,0,0-1,.62,4.17,4.17,0,0,0-.44,1.92h2.77a4.13,4.13,0,0,0-.38-1.9A1.09,1.09,0,0,0,1304.83,204.06Z'
                        />
                        <path className='cls-2-06' d='M1315.55,202a3.2,3.2,0,0,1,1,.15l-.32,2.64a2.27,2.27,0,0,0-.75-.1,1.74,1.74,0,0,0-1.53.78,4.06,4.06,0,0,0-.53,2.28v5.88h-2.73V202.18h2.25l.31,1.79h.09a4.15,4.15,0,0,1,1-1.54A1.84,1.84,0,0,1,1315.55,202Z'
                        />
                        <path className='cls-2-06' d='M1330.58,213.6h-8v-2.08l2.67-3.77a26.89,26.89,0,0,0,1.51-2.31,7.08,7.08,0,0,0,.61-1.45,5.29,5.29,0,0,0,.19-1.43,1.89,1.89,0,0,0-.38-1.29,1.28,1.28,0,0,0-1-.43,1.92,1.92,0,0,0-1,.29,5.7,5.7,0,0,0-1.15,1l-1.56-1.64a6.87,6.87,0,0,1,2-1.67,4.49,4.49,0,0,1,2-.45,3.74,3.74,0,0,1,2.83,1.07,4.11,4.11,0,0,1,1,3,7,7,0,0,1-.18,1.63,7.66,7.66,0,0,1-.56,1.54,13,13,0,0,1-.94,1.61q-.56.84-2.91,3.83v.08h4.91Z'
                        />
                    </g>
                    <text className='cls-19-06' transform='translate(1273.62 300.6)'>Score</text>
                    <g id='back' onClick={this.leaveRoom}>
                        <circle className='cls-20-06' cx='61.37' cy='73.28' r='31.5' />
                        <path className='cls-2-06' d='M83.56,55.22a19.9,19.9,0,0,1-3.42,7.45,18,18,0,0,1-5.6,4.94,15.94,15.94,0,0,1-6.43,2,14.35,14.35,0,0,1-3.1-.07c-.3,0-.59-.09-.88-.15v-7.5L51.38,69.26,38.62,76.62,51.38,84l12.75,7.36V84l.83-.21a28.19,28.19,0,0,0,2.69-.89,27.18,27.18,0,0,0,4.93-2.5A25.85,25.85,0,0,0,80,73.1a23.92,23.92,0,0,0,3.69-8.95A21.88,21.88,0,0,0,83.56,55.22Z'
                        />
                    </g>
                </g>
            </g>
        </g>
</svg>
                m: {this.state.newtime.m} s: {this.state.newtime.s}
                {this.state.p2score}
                {this.state.p1score}
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