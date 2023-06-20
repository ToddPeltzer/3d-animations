import React from "react";

function DisplaySection({triggerPreview}) {

    const handleTop = () => {
        const element = document.querySelector('.jumbotron-section');
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    return ( 
        <div className="display-section wrapper">
            <h2 className="title">New</h2>
            <p className="text">Brilliant</p>
            <span className="description">A display that's up to 2x brighter in the sun.</span>
            <button className="button" onClick={triggerPreview}>Try me!</button>
            {/* will scroll user back to top and also reverse the animation that has played so far */}
            <button onClick={handleTop} className="back-button">TOP</button>
        </div>
     );
}

export default DisplaySection;