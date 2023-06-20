import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
//these imports are from the initial template recommended by Sketchfab and found in the src -> index.ts file of https://github.com/pixotronics/webgi-vanilla-starter/blob/master/src/index.ts
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  addBasePlugins,
  CanvasSnipperPlugin,
  mobileAndTabletCheck,
} from "webgi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger);

const WebgiViewer = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const [viewerRef, setViewerRef] = useState(null);
  const [targetRef, setTargetRef] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [positionRef, setPositionRef] = useState(null);
  const canvasContainerRef = useRef(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  //defining funtion we are going to trigger in the app component
  useImperativeHandle(ref, () => ({
    triggerPreview() {
      setPreviewMode(true);
      //adding pointer events when the user is in try me mode
      canvasContainerRef.current.style.pointerEvents = "all";
      //setting opacity to 0 when the user is in try me mode for everything except the 3d model
      props.contentRef.current.style.opacity = "0";
      gsap.to(positionRef, {
        x: 13.04,
        y: -2.01,
        z: 2.29,
        duration: 2,
        onUpdate: () => {
          //marking the viewer for rendering
          viewerRef.setDirty();
          //position of target has been updated
          cameraRef.positionTargetUpdated(true);
        },
      });
      gsap.to(targetRef, {
        x: 0.11,
        y: 0.0,
        z: 0.0,
        duration: 2,
      });
      //setting 3d model controls to true so user can rotate the model around
      viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true });
    },
  }));

  const memoizedScrollAnimation = useCallback(
    (position, target, isMobile, onUpdate) => {
      if (position && target && onUpdate) {
        scrollAnimation(position, target, isMobile, onUpdate);
      }
    },
    []
  );

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    setViewerRef(viewer);

    const isMobileOrTablet = mobileAndTabletCheck();
    setIsMobile(isMobileOrTablet);

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin);

    //getting active camera
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;

    setCameraRef(camera);
    setPositionRef(position);
    setTargetRef(target);

    // Add available plugins individually.
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    await viewer.addPlugin(BloomPlugin);
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)

    // or use this to add all main ones at once.
    // await addBasePlugins(viewer)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    // await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline();

    await manager.addFromPath("/scene-black.glb");

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    //disable controls so users cant mess with 3D model
    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

    if (isMobileOrTablet) {
      position.set(-16.7, 1.17, 11.7);
      target.set(0, 1.37, 0);
      props.contentRef.current.className = "mobile-or-tablet";
    }

    //when loading site, make position of page top
    window.scrollTo(0, 0);

    let needsUpdate = true;

    //camer and viewer need to be updated
    const onUpdate = () => {
      needsUpdate = true;
      viewer.setDirty();
    };

    //update position of camera if update is needed
    viewer.addEventListener("preFrame", () => {
      if (needsUpdate) {
        camera.positionTargetUpdated(true);
        needsUpdate = false;
      }
    });
    memoizedScrollAnimation(position, target, isMobileOrTablet, onUpdate);
  }, []);

  useEffect(() => {
    setupViewer();
  }, []);

  const handleExit = useCallback(() => {
    //removing pointer events when the user exits try me mode
    canvasContainerRef.current.style.pointerEvents = "none";
    //setting opacity to 1 when the user exits the 3d model
    props.contentRef.current.style.opacity = "1";
    viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
    setPreviewMode(false);

    //position back to original spot before preview
    gsap.to(positionRef, {
      //get x, y, z from WebgiViewer (in this case Sketchfab).
      //upload or go to the 3d model of choice and then go to animations. position how you want the model to look, then click add current view. This will give you the posiition and target of camera values.
      x: !isMobile ? 1.56 : 9.36,
      y: !isMobile ? 5.0 : 10.95,
      z: !isMobile ? 0.01 : 0.09,
      scrollTrigger: {
        //what section is triggering animation
        trigger: ".display-section",
        //where we want to trigger animation on that section
        start: "top bottom",
        //where we want to end the animation
        end: "top top",
        //add delay
        scrub: 2,
        //for performance purposes
        immediateRender: false,
      },
      //updating viewer which triggers event listener and then updates the camera
      onUpdate: () => {
        viewerRef.setDirty();
        cameraRef.positionTargetUpdated(true);
      },
    });
    //where the animation is going to be next
    gsap.to(targetRef, {
      //get x, y, z from WebgiViewer (in this case Sketchfab).
      //upload or go to the 3d model of choice and then go to animations. position how you want the model to look, then click add current view. This will give you the posiition and target of camera values.
      x: !isMobile ? -0.55 : -1.62,
      y: !isMobile ? 0.32 : 0.02,
      z: !isMobile ? 0.0 : -0.06,
      scrollTrigger: {
        //what section is triggering animation
        trigger: ".display-section",
        //where we want to trigger animation on that section
        start: "top bottom",
        //where we want to end the animation
        end: "top top",
        //add delay
        scrub: 2,
        //for performance purposes
        immediateRender: false,
      },
    });
  }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef]);

  return (
    <div ref={canvasContainerRef} id="webgi-canvas-container">
      <canvas id="webgi-canvas" ref={canvasRef} />
      {previewMode && (
        <button className="button" onClick={handleExit}>
          Exit
        </button>
      )}
    </div>
  );
});

export default WebgiViewer;
