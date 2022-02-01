import { Flex, Text, Image } from "@chakra-ui/react";

function NoData() {
  return (
    <Flex flexDirection="column" textAlign="center">
      <Text fontSize="24px" fontWeight="bold" lineHeight="28px">
        No reports
      </Text>
      <Text
        margin="10px auto"
        fontSize="16px"
        fontWeight="bold"
        lineHeight="19px"
        color="gray.400"
        maxW="470px"
      >
        Currently you have no data for the reports to be generated. Once you
        start generating traffic through the Balance application the reports
        will be shown.
      </Text>
      <Image margin="20px auto" maxW="500px" src="./images/nodata.svg" />
    </Flex>
  );
}
export default NoData;
