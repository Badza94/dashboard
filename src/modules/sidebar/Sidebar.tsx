import { VStack, Image, Button } from "@chakra-ui/react";
function Sidebar() {
  return (
    <VStack px="20px" direction="column" spacing={4}>
      <Button variant="ghost">
        <Image src="./images/icon-1.svg" />
      </Button>
      <Button variant="ghost">
        <Image src="./images/icon-2.svg" />
      </Button>
      <Button variant="ghost">
        <Image src="./images/icon-3.svg" />
      </Button>
      <Button variant="ghost">
        <Image src="./images/icon-4.svg" />
      </Button>
      <Button variant="ghost">
        <Image src="./images/icon-5.svg" />
      </Button>
    </VStack>
  );
}
export default Sidebar;
