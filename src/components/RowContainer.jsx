import React from 'react'

import { MdShoppingBasket } from 'react-icons/md'
import {motion} from "framer-motion"
import { useEffect } from 'react';
import { useRef } from 'react';
import NotFound from "../img/NotFound.svg"
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { useState } from 'react';
const RowContainer = ({flag,data,scrollValue}) => {
  console.log(data);
  const rowContainer=useRef();
  const [items,setItems] = useState([]);
  const [{cartItems},dispatch] = useStateValue();

  const addtocart = ()=> {
    
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems:items,                             
    });
    localStorage.setItem("cartItems",JSON.stringify(items));

  }


  useEffect( ()=> {
    rowContainer.current.scrollLeft += scrollValue;

  },[scrollValue])

  useEffect( ()=>{
    addtocart()

  },[items])



  return (
    
   
      <div 
      ref={rowContainer}
      
      className={`w-full my-12 flex items-center gap-3 scroll-smooth   ${ 
        flag ? "overflow-x-scroll scrollbar-none" : "overflow:x-hidden flex-wrap justify-center"
       }`}
      >
     { data && data.length > 0 ? data.map( (item)=>(
      
      <div 
      key={item.id}
      
       
      className="w-275  h-[225px] min-w-[275px]  md:w-300 md:min-w-[300px]   bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg
       hover:drop-shadow-lg flex flex-col items-center justify-evenly relative">
        

        <div className="w-full flex items-center justify-between">

          <motion.div
          whileHover={{scale:1.2}}
          className="w-40 h-40 -mt-8 drop-shadow-2xl"
          >
          <img 
           src={item?.imageURL} 
           alt="" 
           className="w-full h-full object-contain"
           />
          </motion.div>
          <motion.div whileTap={{scale:0.75}} 
          onClick={() => setItems([...cartItems,item]) }   // breaking cart item appending new items to arr and assign
          className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-md">

            <MdShoppingBasket className="text-white "/>

          </motion.div>

        </div>
      <div className=" w-full flex flex-col items-end justify-end ">
        <p className="text-textColor font-semibold text-base md:text-lg">{item?.title}</p>
        <p className="mt-1 text-sm text-gray-500">{item?.calories} calories</p>
        <div className="flex items-center gap-8">
          <p className=" text-lg text-headingColor font-semibold">
            <span className="text-sm text-red-500 ">₹</span> {item?.price}
          </p>

        </div>

      </div>

      </div>
   
    
    )) : 
    <div w-full flex items-center justify-center >
    <img src={NotFound} alt="" className="h-420"/>

    <p className="text-xl text-textColor font-semibold my-2">Items Not Available</p>

    </div>
    
    }    
    </div>
    
  );
};

export default RowContainer