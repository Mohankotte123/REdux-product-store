import { ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";
const Links = ["Dashboard", "Projects", "Team"];
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("blue.500", "blue.900")} px={4} width="100%">
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          width="100%"
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Box>PRODUCT STORE</Box>

          <Link href="/Form">
            <Flex alignItems={"center"}>
              <Button
                variant={"solid"}
                colorScheme={"orange"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
              >
                Add Product
              </Button>
            </Flex>
          </Link>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Select placeholder="Category">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
