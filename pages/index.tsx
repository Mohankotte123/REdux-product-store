import { RootState } from "../store/store";
import Product from "../components/Product";
import { Flex, Box, Grid } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { itemsState } from "../store/productstore/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { useEffect } from "react";
import { Form, Get, Update } from "store/productstore/productAction";
import { useRouter } from "next/router";
export type item = {
  productName: string;
  price: string;
  productImage: string[];
  Description: string;
  id: number;
};

export default function Home() {
  const { Items }: itemsState = useSelector(
    (state: RootState) => state.products
  );

  const dispatch = useDispatch<ThunkDispatch<RootState, {}, Action<string>>>();
  const router = useRouter();
  useEffect(() => {
    if (Items == null) {
      dispatch(Get());
    }
  }, []);

  const onClickDelete = (id: number) => {
    let tobeupdated: item[] = JSON.parse(JSON.stringify(Items));
    tobeupdated = tobeupdated.filter((item) => item.id !== id);
    dispatch(Update(tobeupdated));
  };

  const editProduct = (id: number) => {
    const selectedpdt = Items.find((emp) => emp.id === id);
    dispatch(
      Form({
        Current: {
          productName: selectedpdt.productName,
          price: selectedpdt.price,
          productImage: selectedpdt.productImage,
          Description: selectedpdt.Description,
          id: selectedpdt.id,
        },
      })
    );

    router.push(`/Form?id=${id}`);
  };

  const showProduct = (id: number) => {
    router.push(`/${id}`);
  };

  return (
    <div>
      <>
        <Navbar />
        <Flex align="center" justify="center" color="blue.500">
          <Grid
            position="static"
            p="5"
            paddingTop="15vh"
            w="100%"
            templateColumns={[
              "repeat(1,1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
              "repeat(5, 1fr)",
            ]}
            gap={6}
          >
            {Items?.map((item, index) => {
              return (
                <Box
                  key={index}
                  w="100%"
                  h="60"
                  bg="blue.500"
                  rounded="xl"
                  overflow="hidden"
                  boxShadow="dark-lg"
                  color="white"
                >
                  <Product
                    Item={item}
                    onClickDelete={onClickDelete}
                    editProduct={editProduct}
                    showProduct={showProduct}
                  />
                </Box>
              );
            })}
          </Grid>
        </Flex>
      </>
    </div>
  );
}
