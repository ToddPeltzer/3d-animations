import gsap from "gsap";

export const scrollAnimation = (position, target, isMobile, onUpdate) => {
    const tl = gsap.timeline();

    //initial animation position
    tl.to(position, {
        //get x, y, z from WebgiViewer (in this case Sketchfab).
        //upload or go to the 3d model of choice and then go to animations. position how you want the model to look, then click add current view. This will give you the posiition and target of camera values.
        x: !isMobile ? -3.38 : -7.0,
        y: !isMobile ? -10.74 : -12.2,
        z: !isMobile ? -5.93 : -6.0,
        scrollTrigger: {
            //what section is triggering animation
            trigger: '.sound-section',
            //where we want to trigger animation on that section
            start: 'top bottom',
            //where we want to end the animation
            end: 'top top',
            //add delay
            scrub: 2,
            //for performance purposes
            immediateRender: false
        },
        //updating viewer which triggers event listener and then updates the camera
        onUpdate
    })
    //where the animation is going to be next
    .to(target, {
        //get x, y, z from WebgiViewer (in this case Sketchfab).
        //upload or go to the 3d model of choice and then go to animations. position how you want the model to look, then click add current view. This will give you the posiition and target of camera values.
        x: !isMobile ? 1.52 : 0.7,
        y: !isMobile ? 0.77 : 1.9,
        z: !isMobile ? -1.08 : 0.7,
        scrollTrigger: {
            //what section is triggering animation
            trigger: '.sound-section',
            //where we want to trigger animation on that section
            start: 'top bottom',
            //where we want to end the animation
            end: 'top top',
            //add delay
            scrub: 2,
            //for performance purposes
            immediateRender: false
        },
        //updating viewer which triggers event listener and then updates the camera
        onUpdate
    })
    //make the mainstage/jumbotron fade out 
    .to('.jumbotron-section', {
        opacity: 0,
        scrollTrigger: {
            //what section is triggering animation
            trigger: '.sound-section',
            //where we want to trigger animation on that section
            start: 'top bottom',
            //where we want to end the animation
            end: 'top top',
            //add delay
            scrub: 2,
            //for performance purposes
            immediateRender: false
        }
    })
    //set the section opacity so it fades in (initial opacity is 0)
    .to('.sound-section-content', {
        opacity: 1,
        scrollTrigger: {
            //what section is triggering animation
            trigger: '.sound-section',
            //where we want to trigger animation on that section
            start: 'top bottom',
            //where we want to end the animation
            end: 'top top',
            //add delay
            scrub: 2,
            //for performance purposes
            immediateRender: false
        }
    })
    .to(position, {
        //get x, y, z from WebgiViewer (in this case Sketchfab).
        //upload or go to the 3d model of choice and then go to animations. position how you want the model to look, then click add current view. This will give you the posiition and target of camera values.
        x: !isMobile ? 1.56 : 9.36,
        y: !isMobile ? 5.0 : 10.95,
        z: !isMobile ? 0.01 : 0.09,
        scrollTrigger: {
            //what section is triggering animation
            trigger: '.display-section',
            //where we want to trigger animation on that section
            start: 'top bottom',
            //where we want to end the animation
            end: 'top top',
            //add delay
            scrub: 2,
            //for performance purposes
            immediateRender: false
        },
        //updating viewer which triggers event listener and then updates the camera
        onUpdate
    })
    //where the animation is going to be next
    .to(target, {
        //get x, y, z from WebgiViewer (in this case Sketchfab).
        //upload or go to the 3d model of choice and then go to animations. position how you want the model to look, then click add current view. This will give you the posiition and target of camera values.
        x: !isMobile ? -0.55 : -1.62,
        y: !isMobile ? 0.32 : 0.02,
        z: !isMobile ? 0.0 : -0.06,
        scrollTrigger: {
            //what section is triggering animation
            trigger: '.display-section',
            //where we want to trigger animation on that section
            start: 'top bottom',
            //where we want to end the animation
            end: 'top top',
            //add delay
            scrub: 2,
            //for performance purposes
            immediateRender: false
        },
        //updating viewer which triggers event listener and then updates the camera
        onUpdate
    })
    .to('.display-section', {
        opacity: 1,
        scrollTrigger: {
            //what section is triggering animation
            trigger: '.display-section',
            //where we want to trigger animation on that section
            start: 'top bottom',
            //where we want to end the animation
            end: 'top top',
            //add delay
            scrub: 2,
            //for performance purposes
            immediateRender: false
        }
    })
}