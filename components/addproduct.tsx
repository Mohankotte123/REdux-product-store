import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Flex,
    Heading,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberDecrementStepper,
    Textarea,
    Image,
    IconButton,
    ButtonGroup,
    Button,
    Link,
    Grid,
    Box
  } from '@chakra-ui/react' 
  import {MdAdd, MdAddBox,} from "react-icons/md"
 import React from 'react'
 import { useRouter } from 'next/router'
import { item } from 'pages'
import { useDispatch, useSelector } from 'react-redux'
import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { itemsState } from 'store/productstore/productReducer'
import { RootState } from 'store/store'
import { Imj } from 'store/productstore/productAction'
export type form = {add :boolean ,isEdit:boolean}
 
interface itemProps{
  addProduct: (addProduct:item ) => void,
  
}



 
 function addproduct(itemProps:itemProps) {

 

  const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
   const[name ,setName] = React.useState<string>("")
   const[price,setPrice] =React.useState<string>("")
   const[des , setDes] = React.useState<string>("")
   const[Image1,setImage1]= React.useState<string>("")
   const[mul , setmul] =React.useState<string[]>([])
    const[error , setError]=React.useState(false)
    const[click , setclick]=React.useState(false)

    const router = useRouter()
   function NameChangeContent(e: any) {
       e.preventDefault() 
       
    if (e.target.value !== '') {
        setError(false);
    }
    setName(e.target.value);
   ;
}  
function DesChangeContent(e: any) {
    e.preventDefault() 
    
 if (e.target.value !== '') {
     setError(false);
 }
 
 setDes(e.target.value);
 
} 
function priceChangeContent(e: any) {
  e.preventDefault() 
  
if (e.target.value !== " ") {
   setError(false);
}

setPrice(e.target.value);

} 
function ImageChangeContent1(e: any) {
  
    
 if (e.target.value !== '') {
     setclick(false);
 }

 setImage1(e.target.value);

}  

function change (e:any){
  if(Image1== '')
  {
    setclick(true)
    return;
  }
  setmul([...mul,Image1])
 localStorage.setItem('muls',JSON.stringify(mul))
   setImage1("");     
}



 

  function onClickAdd(e:any){
    e.preventDefault()
      if (name == '' && !price && des == ''){
          setError(true);
          return;
      }
     else {
        itemProps.addProduct({
            productName: name,
            price: price, 
            Description: des,
            id: Math.random(),
            productImage:mul,
            
        })
          router.push('/')
          setName("");
          setDes("");
          setImage1("");
          setError(false);
         
          
    }
   
  } 
  
  



 return (
  <Flex w = "100%" direction = "column" h = "100vh" justifyContent={"center"} alignItems={"center"}>
    <Flex direction = "column" h = {["95%", "95%", "95%", "95%", "100%"]} bg = "blue.500" justifyContent={"center"} alignItems={"center"} w = {["95%", "90%", "60%", "50%", "40%"]}>
      <Flex direction={"column"} bg = "white" padding = "20px" h = "85%" w = "85%">
        <FormControl isRequired isInvalid={error}>
          <FormLabel htmlFor='first-name'>Product Name</FormLabel>
          <Input id='first-name'  borderColor='blue.500' placeholder='First name' value={name} onChange={(e) => NameChangeContent(e)} />
          <FormLabel htmlFor='amount'>Price</FormLabel>
          <NumberInput  min={10} name="price" value={price} >
          <NumberInputField id='amount' borderColor='blue.500' name="price" value={price}   onChange={(e) => priceChangeContent(e)} />
          </NumberInput>
          <FormLabel htmlFor='Product-Image'>Product-Images</FormLabel>
          
          <Flex>
            <FormControl isInvalid={click}>
             <Input  id='Product-Image' mr="2vh" name="productImage.Image1" borderColor='blue.500' placeholder='provide product Image' value={Image1} onChange={(e) =>  ImageChangeContent1(e)} />
             <FormErrorMessage>Please Enter Something!</FormErrorMessage>
             </FormControl>
             <IconButton aria-label="addButton" bg="teal.400" onClick = {change} color="white" _hover={{ bg: "cyan.600" }} icon={< MdAddBox/>} />
            
          </Flex>
          
          <Flex height="100px" width="100%" color="blue.500"overflow="scroll">
            <Grid position="static" p="" paddingTop="5vh" w="100%" templateColumns={["repeat(1,1fr)", "repeat(5, 4fr)"]} gap={6}>
            {mul?.map((item, index) => {
             return <Box key={index}  rounded="xl" color="black" border-radius= "5px">
               <Image src={item}/>
             </Box>;
           })}
            
            </Grid>
          </Flex>
         
         
          <div>
                <p>Description</p>
                <Textarea isRequired placeholder='Product Description' borderColor='blue.500' value={des} onChange={(e) =>  DesChangeContent(e)}/>
            </div> 
             <Flex mt="2vh" align="center" justifyContent="flex-end">
            <IconButton aria-label="addButton" bg="black" onClick={onClickAdd} color="white" _hover={{ bg: "cyan.600" }} icon={<MdAdd/>} />
           </Flex>
          
           
        </FormControl>
          
          
         
           
      </Flex>
    </Flex>
  </Flex>
   )
 }
 
 export default addproduct
  