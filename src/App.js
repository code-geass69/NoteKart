import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <div className="container">
          <NoteState>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </NoteState>
        </div>
      </BrowserRouter>

      <Home />

      {/* <h1>Welcome to NoteKart</h1> */}

    </>
  );
}

export default App;
