import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { item } from "../store/productstore/productReducer";
import React from "react";

interface ItemProps {
  Item: item;
  onClickDelete: (id: number) => void;
  editProduct: (id: number) => void;
  showProduct: (id: number) => void;
}

function Product(itemProps: ItemProps) {
  return (
    <>
      <Image
        w="100%"
        h="60%"
        fit="cover"
        src={itemProps.Item.productImage[0]}
      />
      <Box h="4.0%" p="2">
        <Box overflow="hidden">
          <Text fontWeight="800">{itemProps.Item.productName}</Text>
          <Text fontSize="sm">${itemProps.Item.price}</Text>
        </Box>
        <Flex m="1" align="center" justify="flex-start">
          <Flex
            cursor="pointer"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              color="blue.500"
              mr="4"
              size="xs"
              onClick={() => itemProps.editProduct(itemProps.Item.id)}
            >
              Edit
            </Button>
          </Flex>
          <Flex
            cursor="pointer"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              color="blue.500"
              mr="4"
              size="xs"
              onClick={() => itemProps.showProduct(itemProps.Item.id)}
            >
              Details
            </Button>
          </Flex>
          <Flex
            cursor="pointer"
            justifyContent={"center"}
            alignItems={"center"}
            onClick={() => itemProps.onClickDelete(itemProps.Item.id)}
          >
            <Button color="blue.500" mr="4" size="xs">
              <MdDelete />
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Product;
