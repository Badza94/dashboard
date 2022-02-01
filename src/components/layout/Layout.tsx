import React from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
import { Footer, Nav, Sidebar } from "../../modules";
type TLayoutProps = {
  children: React.ReactNode;
};
function Layout({ children }: TLayoutProps) {
  return (
    <Flex w="100%" flexDir="column">
      <Nav />
      <Flex pt="35px">
        <Sidebar />
        <Container
          maxW="container.2xl"
          position="relative"
          minH="calc(100vh - 120px)"
          h="100%"
        >
          {children}
          <Box as="footer" position="absolute" bottom="10px">
            <Footer />
          </Box>
        </Container>
      </Flex>
    </Flex>
  );
}
export default Layout;
