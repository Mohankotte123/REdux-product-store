import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  NumberInputField,
  NumberInput,
  Textarea,
  Text,
  Image,
  IconButton,
  Grid,
  Box,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { MdAdd, MdAddBox, MdDelete, MdDone } from "react-icons/md";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { item } from "pages";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "store/store";
import { itemsState } from "store/productstore/productReducer";

export type form = { add: boolean; isEdit: boolean };

interface itemProps {
  addProduct: (addProduct: item) => void;
  updateEmployee: (id, updatedpdtObj, Current) => void;
}

function AddProduct(itemProps: itemProps) {
  const { Items, Forms }: itemsState = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    setName(Forms.Current ? Forms.Current.productName : "");
    setCurrent(Forms.Current ? Forms.Current.productImage : []);
    setDes(Forms.Current ? Forms.Current.Description : "");
    setPrice(Forms.Current ? Forms.Current.price : "");
  }, [Forms.Current]);

  const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
  const [Name, setName] = React.useState<string>(
    Forms.Current ? Forms.Current.productName : ""
  );
  const [Price, setPrice] = React.useState<string>(
    Forms.Current ? Forms.Current.price : ""
  );
  const [Des, setDes] = React.useState<string>(
    Forms.Current ? Forms.Current.Description : ""
  );
  const [Image1, setImage1] = React.useState<string>("");
  const [Current, setCurrent] = React.useState<string[]>(
    Forms.Current ? Forms.Current.productImage : []
  );
  const [Error, setError] = React.useState(false);
  const [Click, setclick] = React.useState(false);

  const router = useRouter();
  function NameChangeContent(e: any) {
    e.preventDefault();

    if (e.target.value !== "") {
      setError(false);
    }
    setName(e.target.value);
  }
  function DesChangeContent(e: any) {
    e.preventDefault();

    if (e.target.value !== "") {
      setError(false);
    }

    setDes(e.target.value);
  }
  function priceChangeContent(e: any) {
    e.preventDefault();

    if (e.target.value !== " ") {
      setError(false);
    }

    setPrice(e.target.value);
  }
  function ImageChangeContent1(e: any) {
    if (e.target.value !== "") {
      setclick(false);
    }

    setImage1(e.target.value);
  }

  function change(e: any) {
    if (Image1 == "") {
      setclick(true);
      return;
    }
    setCurrent([...Current, Image1]);
    localStorage.setItem("Currents", JSON.stringify(Current));
    setImage1("");
  }

  function onClickAdd(e: any) {
    e.preventDefault();
    if (Name == "" && !Price && Des == "") {
      setError(true);
      return;
    } else {
      itemProps.addProduct({
        productName: Name,
        price: Price,
        Description: Des,
        id: Math.random(),
        productImage: Current,
      });
      router.push("/");
      setName("");
      setDes("");
      setImage1("");
      setError(false);
    }
  }
  const onClickDelete = (item: string) => {
    let updatedCurrent = Current.filter(function (ele) {
      return ele != item;
    });

    setCurrent(updatedCurrent);
  };

  return (
    <Flex w="100%" direction="column" alignItems={"center"}>
      <Box
        maxW="sm"
        margin="50px auto"
        justifyContent="center"
        borderWidth="10px"
        borderColor="blue.500"
        borderRadius="lg"
      >
        <Flex direction={"column"} bg="white" padding="20px" h="85%" w="95%">
          <FormControl isRequired isInvalid={Error}>
            <FormLabel htmlFor="first-name">Product Name</FormLabel>
            <Input
              id="first-name"
              borderColor="blue.500"
              placeholder="First name"
              value={Name}
              onChange={(e) => NameChangeContent(e)}
            />
            <FormLabel htmlFor="amount">Price</FormLabel>
            <NumberInput min={10} name="price" value={Price}>
              <NumberInputField
                id="amount"
                borderColor="blue.500"
                name="price"
                value={Price}
                onChange={(e) => priceChangeContent(e)}
              />
            </NumberInput>
            <FormLabel htmlFor="Product-Image">Product-Images</FormLabel>

            <Flex>
              <FormControl isInvalid={Click}>
                <Input
                  id="Product-Image"
                  w="95%"
                  name="productImage.Image1"
                  borderColor="blue.500"
                  placeholder="provide product Image"
                  value={Image1}
                  onChange={(e) => ImageChangeContent1(e)}
                />
                <FormErrorMessage>Please Enter Something!</FormErrorMessage>
              </FormControl>
              <Spacer />
              <IconButton
                aria-label="addButton"
                bg="teal.400"
                onClick={change}
                color="white"
                _hover={{ bg: "cyan.600" }}
                icon={<MdAddBox />}
              />
            </Flex>

            <Flex width="100%" color="blue.500">
              <Grid
                position="static"
                p=""
                paddingTop="5vh"
                w="100%"
                templateColumns={["repeat(1,1fr)", "repeat(5, 4fr)"]}
                gap={6}
              >
                {Current?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      rounded="xl"
                      color="black"
                      border-radius="5px"
                    >
                      <Image height="50%" src={item} />
                      <Flex
                        cursor="pointer"
                        justifyContent={"center"}
                        alignItems={"center"}
                        onClick={() => onClickDelete(item)}
                      >
                        <Button color="blue.500" mr="4" size="xs">
                          <MdDelete />
                        </Button>
                      </Flex>
                    </Box>
                  );
                })}
              </Grid>
            </Flex>

            <Text>Description</Text>
            <Textarea
              isRequired
              placeholder="Product Description"
              borderColor="blue.500"
              value={Des}
              onChange={(e) => DesChangeContent(e)}
            />
            {Forms.Current ? (
              <Flex
                mt="1vh"
                align="center"
                justifyContent="flex-end"
                onClick={() => {
                  itemProps.updateEmployee(
                    Forms.Current.id,
                    {
                      productName: Name,
                      price: Price,
                      productImage: Current,
                      Description: Des,
                      id: Forms.Current.id,
                    },
                    Current
                  );
                }}
              >
                <IconButton
                  aria-label="addButton"
                  bg="black"
                  color="white"
                  _hover={{ bg: "cyan.600" }}
                  icon={<MdDone />}
                />
              </Flex>
            ) : (
              <Flex mt="2vh" align="center" justifyContent="flex-end">
                <IconButton
                  aria-label="addButton"
                  bg="black"
                  onClick={onClickAdd}
                  color="white"
                  _hover={{ bg: "cyan.600" }}
                  icon={<MdAdd />}
                />
              </Flex>
            )}
          </FormControl>
        </Flex>
      </Box>
    </Flex>
  );
}

export default AddProduct;
