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

import Footer from './Footer';


import History from './components/PrivteArea/History';
import Navb from './components/PrivteArea/Navb';
import Price from './components/PrivteArea/Price';
import Profile from './components/PrivteArea/Profil';
import { useSelector } from 'react-redux';
import Problems from './components/PrivteArea/Problems';
import Order from './components/PrivteArea/Orders/Order';

import List_Bikes from './components/Manager/List_Bikes';

import G from '../src/components/Manager/G';
import List_Station from './components/Manager/List_Station';
import List_Users from './components/Manager/List_Users';
import List_Opinion from './components/Manager/List_Opinion';
import NavManger from './components/Manager/NavManger';
import RegisterAdd from './components/Manager/RegisterAdd';

import CardOpinion from './components/Manager/CardOpinion';
import { Fragment } from 'react';
function App() {
  let currentUser = useSelector(state => state.ur.user);


  return (<>
    <div className='wrapper'>
      {/* <Out/> */}
      <ResponsiveAppBar />

      {/* <List_Station/> */}

      {/* <List_Bikes /> */}


      {/* <List_Opinion /> */}

      {/* <CardOpinion/> */}

      {/* <NavManger/> */}
      {/* <Contect /> */}

      {/* <Problems/> */}
      {/* <NavBar/> */}
      {/* <AddStation/> */}
      {/* <List_Users/> */}
      {/* <Maps /> */}
      {/* <Order /> */}
      {/* <Navb/> */}
      {/* <RegisterAdd /> */}
      {/* <Register/> */}
      {/* <AddUser/> */}

      {currentUser != null ? <Navb /> : null}


      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path='home' element={<Home />} />
        <Route path='app' element={<App />} />
        <Route path='navbar' element={<NavBar />} />
        <Route path='maps' element={<Maps />} />
        <Route path='logIn' element={<LogIn />} />
        <Route path='Manager' element={<Manager />} />
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


        <Route path='History' element={<History />} />
        <Route path='Order' element={<Order />} />
        <Route path='Navb' element={<Navb />} />
        <Route path='Navb/Profil' element={<Profile />} />
        <Route path='Profil' element={<Profile />} />
        <Route path='Price' element={<Price />} />
        <Route path='Problems' element={<Problems />} />



        {/* managaer */}
        <Route path='lBike' element={<List_Bikes />} />
        <Route path='lStation' element={<List_Station />} />
        <Route path='lUser' element={<List_Users />} />
        <Route path='navM' element={<NavManger />} />

      </Routes>
    </div>

    <Fragment>
      <div  className="footer">

      <Footer />
      </div>
    </Fragment>





  </>

  );
}

export default App;
