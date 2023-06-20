import React from "react";
import { useRef } from "react";
import Loader from "./components/Loader";
import Nav from './components/Nav';
import Jumbotron from "./components/jumbotron";
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
import WebgiViewer from "./components/WebgiViewer";

function App() {

  //connecting 
  const webgiViewerRef = useRef();
  const contentRef = useRef();
  const handlePreview = () => {
    webgiViewerRef.current.triggerPreview();
  }

  return (
    <div className="App">
      <Loader />
      <div ref={contentRef} id="content">
        <Nav />
        <Jumbotron />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview}/>
      </div>
      <WebgiViewer 
        ref={webgiViewerRef}
        contentRef={contentRef}
      />
    </div>
  );
}

export default App;
