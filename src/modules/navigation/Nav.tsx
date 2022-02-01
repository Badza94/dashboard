import { Flex, IconButton, Image, Box, Text } from "@chakra-ui/react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { AxiosClient } from "../../lib/api-client";
import { useQuery } from "react-query";

function Nav() {
  const getUsersQuery = useQuery(["users"], getUsers);

  return (
    <Flex
      h="80px"
      alignItems="center"
      px="35px"
      justifyContent="space-between"
      borderBottom="1px solid #F3F6F9"
    >
      <Flex>
        <Image src="./images/logo.svg" />
        <IconButton
          ml="35px"
          aria-label="nav-btn"
          icon={<CgMenuLeftAlt />}
          variant="ghost"
          colorScheme="blue"
          fontSize="35px"
        />
      </Flex>
      <Flex alignItems="center">
        <Box borderRadius="5px" bg="yellow.500" p="8px">
          <Text
            color="white"
            fontSize="23px"
            as="h2"
            fontWeight="700"
            lineHeight="26.95px"
          >
            JD
          </Text>
        </Box>
        <Text ml="18px" fontWeight="bold" color="blue.500">
          {getUsersQuery.isSuccess &&
            getUsersQuery.data.data[0].firstName +
              " " +
              getUsersQuery.data.data[0].lastName}
        </Text>
      </Flex>
    </Flex>
  );
}
async function getUsers() {
  const response = await AxiosClient.get("/users");
  return response.data;
}
export default Nav;
