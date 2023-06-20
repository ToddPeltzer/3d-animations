import Jumbotron from "./components/jumbotron";
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
import WebgiViewer from "./components/WebgiViewer";

function App() {


  return (
    <div className="App">
      <Jumbotron />
      <SoundSection />
      <DisplaySection />
      <WebgiViewer />
    </div>
  );
}

export default App;
