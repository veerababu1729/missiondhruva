import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import HomeDesign from './components/HomeDesign';
import Hport from './components/Hports';
import Port from './components/Port';
import Op from './components/Op';
import Branded from './components/Branded';
import Login from './components/Login';
import Register from './components/Register';
import NavDesignSub from './components/NavDesignSub';
import NavDesign from './components/NavDesign';
import LoginSub from './components/LoginSub';
import Update from './components/Update';
import AddNew from './components/AddNew';
import About from './components/About';
import Forgot from './components/Forgot';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* <App/> */}
      
      <Route path='/' element={<HomeDesign/>}/>
      <Route path='/Hport' element={<Hport/>}/>
      <Route path='/port' element={<Port/>}/>
      <Route path='/Op' element={<Op/>}/>
      <Route path='/Branded' element={<Branded/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/LoginSub' element={<LoginSub/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/nav' element={<NavDesignSub/>}/>
      <Route path='/AddNew' element={<AddNew/>}/>
      <Route path='/Update' element={<Update/>}/>
      <Route path='/About' element={<About/>}/>
      <Route path='/Forgot' element={<Forgot/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
