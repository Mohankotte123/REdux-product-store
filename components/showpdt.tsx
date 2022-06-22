import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { itemsState } from 'store/productstore/productReducer'
import { RootState } from 'store/store'
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'next/image'



function showpdt() {

    const {
        Shows,
        
      }: itemsState = useSelector((state: RootState) => state.products)
      
 
 

  return (
  <div>
    {Shows ? (
<div className="app">
    <div className='details'>
        <div className="big-Image">
            <Image src = {Shows.productImage[0]} alt=""/>
        </div>
         <div className="box">
            <div className="row">
              <h2>{Shows.productName}</h2>
              <span>${Shows.price}</span>
             </div>
            <p>{Shows.Description}</p>
             <div className="thumb">
             <Image src={Shows.productImage[0]} alt=""/>
                <Image src={Shows.productImage[1]} alt=""/>
                <Image src={Shows.productImage[2]} alt=""/>
                <Image src={Shows.productImage[3]} alt=""/>
             </div>
             <button className="cart">Add to cart</button>
         </div>
    </div>

</div>
) :(
<h1>OOPS ITS NULL</h1>
)}
</div>  
);
}
  
export default showpdt
