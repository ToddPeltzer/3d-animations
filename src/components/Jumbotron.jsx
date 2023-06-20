import React from "react";
import Iphone from '../assets/images/iphone-14.jpg';
import HoldingIphone from '../assets/images/iphone-hand.png';

function Jumbotron() {

    const handleLearnMore = () => {
        const element = document.querySelector('.sound-section');

        window.scrollTo({
            //top of the sound section. '?' means if it isnt present then dont run
            top: element?.getBoundingClientRect().top,
            //left 0 since no left or right scrolling
            left: 0,
            //smooth scrolling
            behavior: 'smooth'
        })
    }

    return ( 
        <div className="jumbotron-section wrapper">
            <h2 className="title">New</h2>
            <img className="logo" src={Iphone} alt="iPhone 14 Pro"/>
            <p className="text">Big and bigger.</p>
            <span className="description">From $41.62/mo. for 24 mo. or $999 before trade-in</span>
            <ul className="links">
                <li>
                    <button className="button">Buy</button>
                </li>
                <li>
                    {/* scrolls the user down to the sound section while playing the animation */}
                    <a onClick={handleLearnMore} className="link">Learn more</a>
                </li>
            </ul>
            <img className="iphone-img" src={HoldingIphone} alt="iPhone"/>
        </div>
    );
}

export default Jumbotron;