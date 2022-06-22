import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { RootState } from '../store/store'
import Product from '../components/product';
import Showpdt from '../components/showpdt';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Spacer,
  Box,
  Grid,
} from '@chakra-ui/react'


export type item = { productName: string, price: string,productImage:string[], Description: string, id:number}
export type form= {add:true , isEdit:false}
import Navbar from '../components/navbar';
import { itemsState } from '../store/productstore/productReducer'
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useEffect, useState } from 'react'
import { Form, Get, Update,Show } from 'store/productstore/productAction'
import { useRouter } from 'next/router'

export default function Home() {

   const {
     Items,
   }: itemsState = useSelector((state: RootState) => state.products)

   const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
   const router = useRouter() 

   useEffect(() => {
    if(Items == null) {
       dispatch(Get())
    
        }
  }, [])  

  


   
  const onClickDelete = (id: number,) => {
    let tobeupdated: item[] = JSON.parse(JSON.stringify(Items))
    tobeupdated = tobeupdated.filter(item => item.id !== id)
    dispatch(Update(tobeupdated))
  }
   
  const editProduct = (id:number) => {
    const selectedpdt = Items.find((emp) => emp.id === id);
    dispatch(Form({
      add:false,
      isEdit:true,
      Current:
      {
        productName:selectedpdt.productName,
        price:selectedpdt.price,
        productImage:selectedpdt.productImage, 
        Description:selectedpdt.Description,
        id:selectedpdt.id
      }
    }))
   
    router.push("/productform")
   };
 
   const showProduct = (id:number) => {
    const tobeupdate = Items.find(item => item.id == id)
    dispatch(Show(
      {
        productName:tobeupdate.productName,
        price:tobeupdate.price,
        productImage:tobeupdate.productImage, 
        Description:tobeupdate.Description,
        id:tobeupdate.id
      }
      
    ))
   
    router.push("/singlepdt")
   };
   
   
 return (  
 
  <div> 
    
         <><Navbar />
         <Flex
         width="100%"
         align="center"
         justify="center"
         color="blue.500">
         <Grid position="static" p="5" paddingTop="15vh" w="100%" templateColumns={["repeat(1,1fr)", "repeat(5, 1fr)"]} gap={6}
         >
           {Items?.map((item, index) => {
             return <Box key={index} w="100%" h="60" bg="blue.500" rounded="xl" overflow="hidden" boxShadow="dark-lg" color="white">
               <Product mohan={item} onClickDelete={onClickDelete} editProduct={editProduct} showProduct={showProduct}/>
             </Box>;
           })}
         </Grid>
       </Flex></>




   </div>

  )
}
