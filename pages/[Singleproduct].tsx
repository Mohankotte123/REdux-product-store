import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { itemsState } from "store/productstore/productReducer";
import { RootState } from "store/store";
import { useRouter } from "next/router";
import { Box, Flex, Grid, Image } from "@chakra-ui/react";

function Singlepdt() {
  const { Items }: itemsState = useSelector(
    (state: RootState) => state.products
  );

  const router = useRouter();
  useEffect(() => {
    const id = router.query.Singleproduct;
    if (id) {
      const tobeupdate = Items?.find((emp) => emp.id.toString() == id);
      if (!tobeupdate) {
        alert("Product Not Find");
        router.replace("/");
      }
      setCurrent(tobeupdate);
    }
  }, [router.query]);
  const [Current, setCurrent] = useState(null);

  return (
    <Box
      maxW="sm"
      margin="50px auto"
      justifyContent="center"
      borderWidth="10px"
      borderColor="blue.500"
      borderRadius="lg"
    >
      <Image rounded="xl" src={Current && Current.productImage[0]} alt={"mohan"} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {Current && Current.productName}
        </Box>

        <Box>${Current && Current.price}</Box>
        <Box>{Current && Current.Description}</Box>
      </Box>

      <Flex align="center" justify="center" color="blue.500">
        <Grid
          position="static"
          p="5"
          w="100%"
          templateColumns={["repeat(1,1fr)", "repeat(5, 1fr)"]}
          gap={6}
        >
          {Current &&
            Current.productImage?.map((item, index) => {
              return <Image w="100%" h="60%" fit="cover" src={item} />;
            })}
        </Grid>
      </Flex>
    </Box>
  );
}

export default Singlepdt;
