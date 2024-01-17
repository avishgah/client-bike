import './App.css';
import { Route, Routes } from 'react-router-dom';
import Maps from './components/Maps/Maps';
import Contect from './components/Contect/Contect';
import NavBar from './components/NavBar/NavBar';
import AddBike from './components/AddBike/AddBike';
import Home from './components/Home/Home';
import AddStation from './components/AddStation/AddStation';
import ResponsiveAppBar from './Ex';
import How from './components/Home/how-work/How';
import Pay from './components/Home/payds/Pay';
import Out from './components/Maps/out';
import Connection from './components/Connection';

import Footer from './Footer';


import History from './components/PrivteArea/History';
import Navb from './components/PrivteArea/Navb';
import Profile from './components/PrivteArea/Profil';
import { useSelector } from 'react-redux';
import Problems from './components/PrivteArea/Problems';
import Order from './components/PrivteArea/Orders/Order';

import List_Bikes from './components/Manager/List_Bikes';

import List_Station from './components/Manager/List_Station';
import List_Users from './components/Manager/List_Users';
import List_Opinion from './components/Manager/List_Opinion';
import NavManger from './components/Manager/NavManger';

import CardOpinion from './components/Manager/CardOpinion';
import { Fragment } from 'react';
import Private from './components/Home/Private';
import Terms from './components/Home/Terms';
import Question from './components/Home/Question/Quastion';
import Video from './components/Video';
import ForgetPassword from './components/ForgetPassword/ForgetPass';
import PasswordReset from './components/ForgetPassword/PasswordResset';
import { useState } from 'react';
import Sae from './components/Home/Sae';
import Do from './components/Home/Do';
import Pae from './components/Home/Pae';
import RegisterYup from './components/Rejister/RegisterYup';
import FormInput from './components/Rejister/FormInput/FormInput';
import Password from './components/Rejister/Password/Password';

import PeymentYup from './components/Rejister/PeymentYup';
import XL from './components/export to xl/XL';
import List_Contect from './components/Manager/List_Contect';
import Statistic from './components/Home/statistic/Statistic';
function App() {

  const currentUser = useSelector(state => state.ur.user);



  return (<>
    <div className='wrapper'>

      <ResponsiveAppBar />
      {/* <Statistic /> */}
      {currentUser != null ?
        (currentUser.isManager ? <NavManger /> : <Navb />) : null}

      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path='home' element={<Home />} />
        <Route path='statistic' element={<Statistic />} />
        <Route path='Question' element={<Question />} />
        <Route path='Video' element={<Video />} />
        <Route path='app' element={<App />} />
        <Route path='navbar' element={<NavBar />} />
        <Route path='maps' element={<Maps />} />
        <Route path='contect' element={<Contect />} />
        <Route path='addbike' element={<AddBike />} />
        <Route path='addStation' element={<AddStation />} />
        <Route path='Connection' element={<Connection />} />
        <Route path='How' element={<How />} />
        <Route path='Home/How' element={<How />} />
        <Route path='Pay' element={<Pay />} />
        <Route path='Home/Pay' element={<Pay />} />
        <Route path='ForgetPass' element={<ForgetPassword />} />
        <Route path='PasswordReset' element={<PasswordReset />} />

        <Route path='Sae' element={<Sae />} />
        <Route path='Do' element={<Do />} />
        <Route path='Pae' element={<Pae />} />


        <Route path='xl' element={<XL />} />




        <Route path='History' element={<History />} />
        <Route path='Order' element={<Order />} />
        <Route path='Navb' element={<Navb />} />
        <Route path='Navb/Profil' element={<Profile />} />
        <Route path='Profil' element={<Profile />} />
        <Route path='Problems' element={<Problems />} />



        {/* managaer */}
        <Route path='lBike' element={<List_Bikes />} />
        <Route path='lStation' element={<List_Station />} />
        <Route path='lUser' element={<List_Users />} />
        <Route path='lOpinion' element={<List_Opinion />} />
        <Route path='lContect' element={<List_Contect />} />
        <Route path='navM' element={<NavManger />} />
        {/* <Route path='navM' element={<Pro />} /> */}





        <Route path='Private' element={<Private />} />
        <Route path='Terms' element={<Terms />} />



        <Route path='yup' element={<RegisterYup />} />
        <Route path='PeymentYup' element={<PeymentYup />} />
        <Route path='formInput' element={<FormInput />} />
        <Route path='password' element={<Password />} />


      </Routes>
    </div>

    <Fragment>
      <Footer />
    </Fragment>

  </>

  );
}

export default App;
