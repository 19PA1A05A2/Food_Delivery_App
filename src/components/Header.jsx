import React from 'react';
import { useState }  from 'react';
import {MdShoppingBasket,MdAdd,MdLogout} from 'react-icons/md';
import { motion } from 'framer-motion';


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import Logo from '../img/logo.png'
import Avatar from "../img/avatar.png";
import {Link} from 'react-router-dom';
import { actionType } from '../context/reducer';

import { useStateValue } from '../context/StateProvider';


const Header = () => {
  const firebaseAuth= getAuth(app);
  const provider= new GoogleAuthProvider();
  const [{user,cartShow,cartItems},dispatch] = useStateValue();
  const [isMenu,setIsMenu] = useState(false);
  
  const login = async()=>{
    if (!user){
    const {
      user:{refreshToken,providerData},
    }= await signInWithPopup(firebaseAuth,provider);
    
    dispatch({
      type:actionType.SET_USER,
      user:providerData[0],
    });
    localStorage.setItem("user",JSON.stringify(providerData[0]));

  }
   else{
     setIsMenu(!isMenu);
  


  };
}

 const logout =() =>{
  setIsMenu(false)
  localStorage.clear()
  dispatch( {
    type:actionType.SET_USER,
    user : null

  });
 };
 const showCart =() =>{
  dispatch({
    type:actionType.SET_CART_SHOW,
    cartShow:!cartShow,
  });

 }

  return (
    <header className="fixed z-50 w-screen  p-3 px-4 md:p-6 md:px-20 bg-primary">
    { /* destop/tab */}
      <div  className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
         <img src={Logo} className="w-8   object-cover" alt="logo"/>
         <p className="text-headingColor text-xl font-bold" >City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul 
            initial = {{opacity:0 , x:200}}
            animate={{opacity:1,x:0}}
            exit= {{opacity:0, x:0}}
           className="flex items-center gap-8 ">
            <li className="text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out cursor-pointer">Home</li>
            <li className="text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out cursor-pointer">Menu</li>
            <li className="text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out cursor-pointer">About Us</li>
            <li className="text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out cursor-pointer">Service</li>
          </motion.ul>
            <div className="relative flex  items-center justify-center" onClick={showCart}>
              <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer"/>
               {
                cartItems && cartItems.length>0 &&(

                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                bg-cartNumBg flex items-center justify-center" >
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
               </div>
                  
                )
               }
            </div>
          
          <div className="relative">
            <motion.img 
            whileTap={{scale:0.6}}
            src={user ? user.photoURL : Avatar} 
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full cursor-pointer"
             alt="userprofile"
             onClick={login}
             />
             {/* drop-down menu for adminstrator */}
             { isMenu && (
                          
              <motion.div className="w-40 bg-gray-100 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 px-4 py-2 ">

              {  user && user.email === "mattesubbarao2000@gmail.com" && (
                <Link to={"/createItem"} >
                  
              <p className=" flex items-center text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out curser-pointer hover:bg-slate-200 px-4 py-2">Add Item <MdAdd/></p>
              </Link>
              )

            }
              <p className="  px-4 py-2 flex items-center justify-center bg-gray-200  gap-3 cursor-pointer hover:bg-slate-300 tansition-all duration 100 else-in-out  text-textColor text-base " onClick={logout}>Logout<MdLogout/></p>

             </motion.div>
             )
            
  }  
          
          </div>

    </div>
  </div>
    {/* mobile */} 
    <div className="flex md:hidden w-full h-full items-center justify-between">

    

    <div className="relative flex  items-center justify-center" onClick={showCart}>
        <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer"/>

        {
            cartItems && cartItems.length>0 &&(

              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                bg-cartNumBg flex items-center justify-center" >
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
               </div>
                  
                )
        }
    </div>

    <Link to={"/"} className="flex item-center gap-2">
         <img src={Logo} className="w-8 object-cover" alt="logo"/>
         <p className="text-headingColor text-xl font-bold" >City</p>
    </Link>


    <div className="relative">
            <motion.img 
            whileTap={{scale:0.6}}
            src={user ? user.photoURL : Avatar} 
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full"
             alt="userprofile"
             onClick={login}
             />
             {/* drop-down menu for adminstrator */}
             { isMenu && (
                          
              <motion.div className="w-40 bg-gray-100 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 px-4 py-2 ">

              {  user && user.email === "mattesubbarao2000@gmail.com" && (
                <Link to={"/createItem"} >
              <p className=" item-center gap-3 cursor-pointer hover:bg-slate-200 duration 100 tansition-all else-in-out curser-pointer  px-4 py-2">New Item <MdAdd/></p>
              </Link>
              )

            }

        <ul 
           className="flex flex-col">
            <li className="text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out curser-pointer hover:bg-slate-200 px-4 py-2 "
            
            onClick={()=>setIsMenu(false)}>Menu</li>
            <li className="text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out curser-pointer hover:bg-slate-200 px-4 py-2 "
            
            onClick={()=>setIsMenu(false)}>Home</li>
            <li className="text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out curser-pointer hover:bg-slate-200 px-4 py-2 "
            
            onClick={()=>setIsMenu(false)}>About Us</li>
            <li className="text-base text-textColor hover:text-headingColor duration 100 tansition-all else-in-out curser-pointer hover:bg-slate-200 px-4 py-2 "
            
            onClick={()=>setIsMenu(false)}>Service</li>
            
          </ul>
              <p className="  px-4 py-2 flex items-center justify-center bg-gray-200  gap-3 cursor-pointer hover:bg-slate-300 tansition-all duration 100 else-in-out  text-textColor text-base " onClick={logout}>Logout<MdLogout/></p>

             </motion.div>
             )
            
  }  
          
          </div>

    </div>
    </header>
  );
};


export default Header