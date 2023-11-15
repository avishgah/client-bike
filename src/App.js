import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Maps from './components/Maps/Maps';
import Manager from './components/Manager/Manager';
import About from './components/About/About';
import Contect from './components/Contect/Contect';
import NavBar from './components/NavBar/NavBar';
import LogIn from './components/LogIn/LogIn';
import AddBike from './components/AddBike/AddBike';
import AddUser from './components/AddUser/AddUser';
import Home from './components/Home/Home';
import AddOption from './components/AddOpinion/AddOption';
import Jj from './components/AddUser/Jj';
import AddStation from './components/AddStation/AddStation';
import ResponsiveAppBar from './Ex';
import How from './components/how-work/How';
import Pay from './components/payds/Pay';
import Out from './components/Maps/out';
import Connection from './components/Connection';
import StepperNav from './components/Rejister/StepperNav';
import PicId from './components/Rejister/PicId';
import Payment2 from './components/Rejister/Payment2';
import Register from './components/Rejister/Register';



function App() {
  return (<>
    {/* <Out/> */}
    <ResponsiveAppBar />
    {/* <AddStation/> */}
    {/* <Maps /> */}
    
    <Routes>
      <Route path="" element={<Home />}></Route>
      <Route path='home' element={<Home />} />
      <Route path='app' element={<App />} />
      <Route path='navbar' element={<NavBar />} />
      <Route path='maps' element={<Maps />} />
      <Route path='logIn' element={<LogIn />} />
      <Route path='manager' element={<Manager />} />
      <Route path='about' element={<About />} />
      <Route path='contect' element={<Contect />} />
      <Route path='addbike' element={<AddBike />} />
      <Route path='addUser' element={<AddUser />} />
      <Route path='addOption' element={<AddOption />} />
      <Route path='addStation' element={<AddStation />} />
      <Route path='Connection' element={<Connection />} />
      <Route path='Stepper' element={<StepperNav />} />
      <Route path='Addjj' element={<Jj />} />
      <Route path='How' element={<How />} />
      <Route path='Home/How' element={<How />} />
      <Route path='Pay' element={<Pay />} />
      <Route path='Home/Pay' element={<Pay />} />


      <Route path='PicId' element={<PicId />} />
      <Route path='Payment2' element={<Payment2 />} />
      <Route path='Register' element={<Register />} />






    </Routes>






  </>

  );
}

export default App;
