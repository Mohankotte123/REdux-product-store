import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Form, Update } from 'store/productstore/productAction';
import { itemsState } from 'store/productstore/productReducer';
import { RootState } from 'store/store';
import Showpdt from '../components/showpdt';


function singlepdt() {
    const {
        Items,
        Forms,
        Shows,
      }: itemsState = useSelector((state: RootState) => state.products)
   
      const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
      useEffect(() => {
        if(Shows == null) {
           
        localStorage.getItem("single")
            }
      }, [])  
    
     
  return (
    <div>
      <Showpdt />
    </div>
  )
}

export default singlepdt
