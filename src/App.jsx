import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './Home';
import Nav from './components/Nav';

function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/3d-animations" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
