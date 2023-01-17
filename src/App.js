import './App.css';
import CreateInterview from './components/CreateInterview';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import EditInterview from './components/EditInterview';

function App() { 
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/interview" element = {<CreateInterview/>}></Route>
        <Route path="/interview/:id" element={<EditInterview/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
