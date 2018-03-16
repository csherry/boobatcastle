import React, { Component } from 'react';
import './LandingPage.css';
import {TweenLite, Power1, Circ, TimelineLite} from "gsap";
import ChatPage from './ChatPage.js';

class LandingPage extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            ShowPage:false
        }
        
        this.ShowChat = this.ShowChat.bind(this);
    }
    
    ShowChat(){
        this.setState({
            ShowPage: true
        })
    }
    
    componentDidMount(){
        var mountain = document.getElementById("mountain"),
            sherry = document.getElementById("sherry"),
            trotro = document.getElementById("trotro"),
            darkcouldL = document.getElementById("darkcouldL"),
            blackflat = document.getElementById("blackflat"),
            castle = document.getElementById("castle"),
            towerLeft = document.getElementById("towerLeft"),
            towerRight = document.getElementById("towerRight"),
            gate = document.getElementById("gate"),
            graveBig = document.getElementById("graveBig"),
            graveSmall = document.getElementById("graveSmall"),
            treeBig = document.getElementById("treeBig"),
            tree2 = document.getElementById("tree2"),
            moon = document.getElementById("moon"),
            darkcouldR = document.getElementById("darkcouldR"),
            lightcouldR = document.getElementById("lightcouldR"),
            lightcouldL = document.getElementById("lightcouldL");
        var tl = new TimelineLite();
        
//        TweenLite.from(sherry, 2, {opacity:100 , x: -300, ease:Power1.easeIn});
//        TweenLite.from(trotro, 3, {opacity:100 , y: -1000, ease:Power1.easeOut, delay: 1});
//        TweenLite.to(darkcouldL, 2, { ease: Back.easeOut.config(2), x: 40 });
//        TweenLite.to(lightcouldL, 2, { ease: Back.easeOut.config(2), x: 40 });
//        TweenLite.to(darkcouldR, 2, { ease: Back.easeOut.config(2), x: -40 });
//        TweenLite.to(lightcouldR, 2, { ease: Back.easeOut.config(2), x: -40 });

        tl
            .from(darkcouldL, 0, {opacity:100})
            .from(moon, 0, { ease: Circ.easeOut, y: -10, autoAlpha:0 })
            .from(mountain, 3, {opacity:0})
            .add('tree2')
            .from(tree2, 1, {opacity:0})
            .from(treeBig, 1, {opacity:0}, 'tree2')
            .add('towerLeft')
            .from(towerLeft, 1, {opacity:0})
            .from(towerRight, 1, {opacity:0}, 'towerLeft')
            .from(castle, 1, {opacity:0}, 'towerLeft')
            .from(gate, 1, {opacity:0}, 'towerLeft')
            .add('darkcouldL')
            .from(darkcouldL, 1, {opacity:100 , ease: Circ.easeOut, x: -500, autoAlpha:0 })
            .from(lightcouldL, 1, {opacity:100 , ease: Circ.easeOut, x: -500, autoAlpha:0 }, 'darkcouldL')
            .add('darkcouldR')
            .from(darkcouldR, 1, {opacity:100 , ease: Circ.easeOut, x: 40, autoAlpha:0 })
            .from(lightcouldR, 1, {opacity:100 , ease: Circ.easeOut, x: 40, autoAlpha:0 }, 'darkcouldR');
        
        TweenLite.fromTo(moon, 6.5, {opacity:100 }, {opacity:0 })
        
        tl
            .add('graveBig')
            .from(graveBig, 1, {opacity:0})
            .from(graveSmall, 1, {opacity:0}, 'graveBig')
            .from(sherry, 1.5, {opacity:100, x: -300, autoAlpha:0, ease:Power1.easeIn})
            .from(trotro, 2, {opacity:100 , y: -1000, autoAlpha:0, ease:Power1.easeOut})
            .from(blackflat, 1, {opacity:100 , y: -100, autoAlpha:0, ease:Power1.easeOut});
//            .from(bat1, 2, {bezier:{curviness:1.25, values:[{x:23, y:26}, {x:10, y:15}], autoRotate:true}, ease:Power1.easeOut});
        
//        blackflat.addEventListener('click', function(){
//            
//        })
    }
    
    render() {
        var comp = null;
        if (this.state.ShowPage === true){
            comp = (
                <ChatPage />
            )
                
        } else {
            comp = (
               
            );
        }
        return (
            <div>
                
            </div>
        );
    }
}

export default LandingPage;
