import * as types from '../types'
import { Dispatch } from '../store'
import { GridItemsAlignment } from '@material-ui/core';


function dummyTimeOut(seconds: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, seconds)
    })
} 

export type item = {productName: string, price: string ,productImage:string[], Description: string, id:number};
export type form ={ add:boolean , isEdit:boolean , Current:item };



export const Update = (Items: item[]) => async (dispatch:Dispatch) => {
     dispatch({
        type: types.UPDATE,
       
    })
    try {
        await dummyTimeOut(300);
        localStorage.setItem('product',JSON.stringify(Items))
        
        dispatch({
            type:types.UPDATE,
            Items: Items,
           
        })
    } catch(error){
        dispatch({
            type:types.UPDATE,
            error:"error"
        })
    }
}

export const Form = (Forms: form) => async(dispatch:Dispatch) => {
    dispatch({
        type: types.FORM,
       
    })
    try {
        await dummyTimeOut(300);
        localStorage.setItem('pdt',JSON.stringify(Forms))
        
        dispatch({
            type:types.FORM,
            Forms:Forms
           
        })
    } catch(error){
        dispatch({
            type:types.FORM,
            error:"error"
        })
    }
} 
export const Show = (Shows: item) => async(dispatch:Dispatch) => {
    dispatch({
        type: types.SHOW,
       
    })
    try {
        await dummyTimeOut(300);
        localStorage.setItem('single',JSON.stringify(Shows))
        dispatch({
            type:types.SHOW,
            Shows:Shows 
           
        })
    } catch(error){
        dispatch({
            type:types.SHOW,
            error:"error"
        })
    }
} 
export const Imj= (Images: string[]) => async(dispatch:Dispatch) => {
    dispatch({
        type: types.IMAGE,
       
    })
    try {
        await dummyTimeOut(300);
        localStorage.setItem('single',JSON.stringify(Images))
        dispatch({
            type:types.SHOW,
            Images:Images 
           
        })
    } catch(error){
        dispatch({
            type:types.IMAGE,
            error:"error"
        })
    }
} 


export const Get = () => async (dispatch: Dispatch) => {
    dispatch({
        type: types.GET,
    })
    try {
        await dummyTimeOut(300);
      const Items = localStorage.getItem('product');
      dispatch({
          type: types.GET,
          Items : Items? JSON.parse(Items): [],

      })
    }catch(error){
        dispatch({
            type:types.GET,
            error:"sorry something went wrong"
        })
    }
}


 
    
