import {Box , Button ,Flex ,Grid,IconButton,Image ,Text} from "@chakra-ui/react";
import {FaCartPlus} from "react-icons/fa"; 
import { MdDelete} from 'react-icons/md'
import { item, itemsState } from '../store/productstore/productReducer'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { useRouter } from 'next/router'

interface ItemProps {
  mohan: item,
  onClickDelete: (id: number) => void,
  editProduct:  (id:number) => void,
  showProduct:  (id:number) => void,
 
} 

 

function products(itemProps: ItemProps) {
  
  const router = useRouter()

 
  
  
  const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
  return (
      
      
    <><Image w="100%" h="60%" fit="cover" src={itemProps.mohan.productImage[0]} /><Box w="100%" h="40%" p="2">
      <Box overflow="hidden">
      <Text fontWeight="800">{itemProps.mohan.productName}</Text>
      <Text fontSize="sm">${itemProps.mohan.price}</Text>
      
      </Box>
      <Flex m="1" align="center" justify="flex-start">
        <Flex cursor = "pointer"  justifyContent={"center"} alignItems={"center"} >
        <Button color="blue.500" mr="4" size="xs" onClick={()=>itemProps.editProduct(itemProps.mohan.id)}>
          Edit
        </Button> 
        </Flex>
        <Flex cursor = "pointer"  justifyContent={"center"} alignItems={"center"} >
        <Button color="blue.500" mr="4" size="xs" onClick={()=>itemProps.showProduct(itemProps.mohan.id)}>
          Details
        </Button> 
        </Flex>
        <Flex cursor = "pointer"  justifyContent={"center"} alignItems={"center"} onClick = {() => itemProps.onClickDelete(itemProps.mohan.id)}>
            <Button color="blue.500" mr="4" size="xs">
               <MdDelete/>
            </Button>
            </Flex>
      </Flex>
    </Box></>
  
  
  )
}

export default products
