import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Maps from './components/Maps/Maps';
import Manager from './components/Manager/Manager';
import About from './components/About/About';
import Rejister from './components/Rejister/Rejister';
import Contect from './components/Contect/Contect';
import NavBar from './components/NavBar/NavBar';
import LogIn from './components/LogIn/LogIn';
import AddBike from './components/AddBike/AddBike';
import AddUser from './components/AddUser/AddUser';
import Home from './components/Home/Home';
import AddOption from './components/AddOpinion/AddOption';
import Jj from './components/AddUser/Jj';
import AddStation from './components/AddStation/AddStation';
function App() {
  return (<>

  <button class="ui circular google plus icon button">
    <i class="google plus icon"></i>
  </button>
    <NavBar />

    <Routes>
    <Route path="" element={<NavBar />}></Route>
      <Route path='home' element={<Home />} />
      <Route path='app' element={<App />} />
      <Route path='navbar' element={<NavBar />} />
      <Route path='maps' element={<Maps />} />
      <Route path='logIn' element={<LogIn />} />
      <Route path='manager' element={<Manager />} />
      <Route path='about' element={<About />} />
      <Route path='rejister' element={<Rejister />} />
      <Route path='contect' element={<Contect/>} />
      <Route path='addbike' element={<AddBike />} />
      <Route path='addUser' element={<AddUser />} />
      <Route path='addOption' element={<AddOption />} />
      <Route path='addStation' element={<AddStation />} />
      <Route path='Addjj' element={<Jj />} />
    </Routes>






  </>

  );
}

export default App;
