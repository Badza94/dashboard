import { HStack, Text, Link } from "@chakra-ui/react";

function Footer() {
  return (
    <HStack>
      <Link
        href="#"
        _hover={{
          textDecoration: "none",
        }}
        fontWeight="bold"
        color="blue.500"
      >
        Terms & Conditions
      </Link>
      <Text fontWeight="bold" color="blue.500">
        |
      </Text>
      <Link
        href="#"
        _hover={{
          textDecoration: "none",
        }}
        fontWeight="bold"
        color="blue.500"
      >
        Privacy Policy
      </Link>
    </HStack>
  );
}
export default Footer;
