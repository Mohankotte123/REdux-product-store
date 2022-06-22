import { Flex, FormControl, FormLabel, IconButton, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField,  NumberInputStepper, Image, Textarea, Grid, Box, Button, FormErrorMessage } from '@chakra-ui/react'
import { item } from 'pages'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { MdAddBox, MdCreate, MdDelete,MdDone} from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { itemsState } from 'store/productstore/productReducer'
import { RootState } from 'store/store'



interface editProps{
  
  updateEmployee:(id, updatedpdtObj,mul) => void,

  
  }
function Editproduct(editProps:editProps) { 

  const {
    Items,
    Forms,

    
    
  }: itemsState = useSelector((state: RootState) => state.products)

  const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
 
  const[image,setimage] =useState<string>("")
  const[name,setname] =useState<string>(Forms.Current.productName)
  const[price,setprice] =useState<string>(Forms.Current.price)
  const[des,setdes] =useState<string>(Forms.Current.Description)
  const[mul , setmul] =React.useState<string[]>(Forms.Current.productImage)
  const[error , setError]=React.useState(false)
  const[click , setclick]=React.useState(false)
  
 
 const namechange = (e:any) => {
  e.preventDefault() 
       
  if (e.target.value !== '') {
      setError(false);
  }
  setname(e.target.value);
 
 } 
 const pricechange = (e:any) => {
  e.preventDefault() 
       
  if (e.target.value !== '') {
      setError(false);
  }
  setprice(e.target.value);
 }
 const deschange = (e:any) => {
  e.preventDefault() 
       
  if (e.target.value !== '') {
      setError(false);
  }
  setdes(e.target.value);
 }
 const Imagechange = (e:any) => {

       
  if (e.target.value !== '') {
    setclick(false);
}

  setimage( e.target.value);
  
 
 }
 function change (e:any){
  if(image== '')
  {
    setclick(true)
    return;
  }
  setmul([...mul,image])
  localStorage.setItem('multipless',JSON.stringify(mul))
    
    setimage("");     
 }
const onClickDelete = (item:string) => {
  let updatedmul =  mul.filter(
    function(ele){ 
    return(ele != item); 
    
  }); 
  
 setmul(updatedmul)
}
 return (
    <Flex w = "100%" direction = "column" h = "100vh" justifyContent={"center"} alignItems={"center"} >
      <Flex direction = "column" h = {["95%", "95%", "95%", "95%", "100%"]} bg = "blue.500" justifyContent={"center"} alignItems={"center"} w = {["95%", "90%", "60%", "50%", "40%"]}>
        <Flex direction={"column"} bg = "white" padding = "20px" h = "85%" w = "85%">
        <FormControl isRequired >
          <FormLabel htmlFor='first-name'>Product Name</FormLabel>
          <Input id='first-name'  borderColor='blue.500' name="productName" value={name} placeholder='First name' onChange={(e) =>namechange(e)}/>
          <FormLabel htmlFor='amount'>Price</FormLabel>
          <NumberInput  min={10} name="price" value={price} >
           <NumberInputField id='amount' borderColor='blue.500'   onChange={(e) =>pricechange(e)} />
              </NumberInput>
            <FormLabel htmlFor='Product-Image'>Product-Image</FormLabel>
            <FormControl isInvalid={click}>
            <Flex >
            <Input mr="2vh" id='Product-Image1' borderColor='blue.500' placeholder='Provide product Image'value={image}  onChange={(e) => Imagechange(e)} />
            <FormErrorMessage>Please Enter Something!</FormErrorMessage>
             <IconButton  aria-label="addButton" bg="teal.400" onClick={change} color="white"  _hover={{ bg: "cyan.600" }} icon={<MdAddBox/>} ></IconButton>
            </Flex>
            </FormControl>
            
            
          <Flex
          height="100px"
         width="100%"
         mt="1vh"
         color="blue.500"
         overflow="scroll">
    
         <Grid position="static" p="" paddingTop="5vh" w="100%" templateColumns={["repeat(1,1fr)", "repeat(5, 4fr)"]} gap={6}
         >
            {mul?.map((item, index) => {
             return <Box key={index}  rounded="xl" color="black" border-radius= "5px">
               <Image src={item}/>
               <Flex cursor = "pointer"  justifyContent={"center"} alignItems={"center"} onClick = {() =>onClickDelete(item)}>
            <Button color="blue.500" mr="4" size="xs">
               <MdDelete/>
            </Button>
            </Flex>
             </Box>;
           })}
           </Grid>
       </Flex>
      
            <div>
                <p>Description</p>
                <Textarea isRequired placeholder='Product Description'name="Description" value={des} borderColor='blue.500'  onChange={(e) =>deschange(e)} />
            </div> 
            
            <Flex mt="1vh" align="center" justifyContent="flex-end" onClick={() => {
               editProps.updateEmployee(Forms.Current.id, {productName: name, price: price ,productImage: mul, Description: des, id:Forms.Current.id},mul);
        }}>
            <IconButton aria-label="addButton" bg="black"  color="white" _hover={{ bg: "cyan.600" }} icon={<MdDone/>} />
           </Flex>
          
           
         </FormControl>
          
          
         
           
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Editproduct
