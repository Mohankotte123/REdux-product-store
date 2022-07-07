import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { itemsState } from "store/productstore/productReducer";
import { RootState } from "store/store";
import { useRouter } from "next/router";
import { Box, Button, Flex, Grid, IconButton, Image } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

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
      setImage(tobeupdate.productImage[0]);
    }
  }, [router.query]);
  const [Current, setCurrent] = useState(null);
  const [Images, showImages] = useState(false);
  const [Image1, setImage] = useState("");
  function onClickAdd() {
    showImages(true);
  }
  function onClickback() {
    showImages(false);
  }

  return (
    <Box
      maxW="lg"
      margin="50px auto"
      justifyContent="center"
      borderWidth="10px"
      borderColor="blue.500"
      borderRadius="lg"
    >
      <Flex justifyContent="center">
        <Image
          mt="50px"
          rounded="sm"
          width="50%"
          height="200px"
          fit="cover"
          src={Image1}
          alt={"mohan"}
        ></Image>
      </Flex>
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
      {Images ? (
        <Flex>
          <IconButton
            ml="20px"
            boxSize={6}
            aria-label="addButton"
            bg="black"
            onClick={onClickback}
            color="white"
            _hover={{ bg: "cyan.600" }}
            icon={<ArrowBackIcon />}
          />

          <Flex align="center" padding="5vh" color="blue.500">
            <Grid
              position="static"
              p="5"
              w="100%"
              templateColumns={["repeat(2,1fr)", "repeat(5, 1fr)"]}
              gap={6}
            >
              {Current &&
                Current.productImage?.map((item, index) => {
                  return (
                    <Image
                      w="100%"
                      height="50px"
                      onClick={() => setImage(item)}
                      fit="cover"
                      src={item}
                    />
                  );
                })}
            </Grid>
          </Flex>
        </Flex>
      ) : (
        <Flex justifyContent="center">
          <Button onClick={onClickAdd}>Show Images</Button>
        </Flex>
      )}
    </Box>
  );
}

export default Singlepdt;
