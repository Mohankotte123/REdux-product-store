import * as types from '../types'

export type images = {image1:string , image2:string ,image3:string ,image4:string}
export type item = {productName: string, price:string,productImage:string[], Description: string, id:number
} 
export type form = {Current:item}

 interface itemAction {
     type:string | boolean,
     Items?: item[] ,
     Forms? :form,
     Shows? : item,
     
 
 }
 export interface itemsState {
     Items: null | item[],
     Forms : form,
     Shows : null |item ,
    
 }
const initialState : itemsState = {
    Items:null,
    Forms:
    {
        
        Current:null
    },
    Shows:null,
   
    
    
};
export const  productReducer = (state = initialState, action:itemAction) => {
    switch(action.type){
        case types.UPDATE:
            return {
                ...state,
                Items:action.Items? action.Items : state.Items,
                
            } 
        case types.FORM:
            return {
                ...state,
                Forms:action.Forms? action.Forms : state.Forms,
            } 
        case types.SHOW:
            return {
                ...state,
                Shows:action.Shows? action.Shows : state.Shows,
            }
            
            case types.GET:
                return {
                    ...state,
                    Items:action.Items? action.Items : state.Items,
                    
                }
            

        default:
            return state
    }
}