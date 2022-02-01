import { useState } from "react";
import {
  Flex,
  Text,
  Box,
  Input,
  Button,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { useGetProjectsQuery } from "../../lib/queries";
import { useGlobal } from "../../context/GlobalContext";

type TProjectProps = {
  description: string;
  gatewayIds: string[];
  image: string;
  industry: string;
  name: string;
  projectId: string;
  rule: string;
  structure: string;
  userIds: string[];
  website: string;
};

type TGatewayProps = {
  apiKey: string;
  description: string;
  gatewayId: string;
  name: string;
  secondaryApiKey: string;
  type: string;
  userIds: string[];
};

function Header({ getGatewaysQuery }: any) {
  const getProjectsQuery = useGetProjectsQuery();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [project, setProject] = useState("");
  const [gateway, setGateway] = useState("");
  const { dispatch } = useGlobal();

  const generateReport = () => {
    const data = {
      from: startDate,
      to: endDate,
      projectId: project,
      gatewayId: gateway,
    };
    dispatch({ type: "generateReport", payload: data });
  };

  return (
    <Grid w="100%" alignItems="flex-start" templateColumns="repeat(8, 1fr)">
      <GridItem colSpan={{ base: 8, "2xl": 3 }}>
        <Flex>
          <Box
            textAlign={{ base: "center", "2xl": "left" }}
            w="100%"
            mb={{ base: "20px", "2xl": "0" }}
          >
            <Text as="h1" fontSize="24px" lineHeight="28.13px" fontWeight="700">
              Reports
            </Text>
            <Text
              fontSize="16px"
              color="gray.500"
              fontWeight="bold"
              lineHeight="19px"
            >
              Easily generate a report of your transactions
            </Text>
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={{ base: 8, "2xl": 5 }}>
        <Flex justifyContent={{ base: "center", "2xl": "end" }}>
          <Grid templateColumns="repeat(10, 1fr)" gap={4}>
            <GridItem colSpan={{ base: 5, lg: 2 }}>
              <Select
                onChange={(e) => {
                  setProject(e.target.value);
                }}
                minW="135px"
                placeholder="All Projects"
                bg="teal.500"
                color="white"
                fontSize="14px"
                lineHeight="16.41px"
                sx={{
                  option: {
                    bg: "teal.500",
                    color: "white",
                    fontSize: "14px",
                    lineHeight: "16.41px",
                  },
                }}
              >
                {getProjectsQuery.isSuccess &&
                  getProjectsQuery.data.data.map((project: TProjectProps) => (
                    <option key={project.projectId} value={project.projectId}>
                      {project.name}
                    </option>
                  ))}
              </Select>
            </GridItem>
            <GridItem colSpan={{ base: 5, lg: 2 }}>
              <Select
                onChange={(e) => {
                  setGateway(e.target.value);
                }}
                minW="135px"
                placeholder="All Gateways"
                bg="teal.500"
                color="white"
                fontSize="14px"
                lineHeight="16.41px"
                sx={{
                  option: {
                    bg: "teal.500",
                    color: "white",
                    fontSize: "14px",
                    lineHeight: "16.41px",
                  },
                }}
              >
                {getGatewaysQuery.isSuccess &&
                  getGatewaysQuery.data.data.map((gateway: TGatewayProps) => (
                    <option key={gateway.gatewayId} value={gateway.gatewayId}>
                      {gateway.name}
                    </option>
                  ))}
              </Select>
            </GridItem>
            <GridItem colSpan={{ base: 5, lg: 2 }}>
              <Box>
                <Input
                  onChange={(e) => setStartDate(e.target.value)}
                  bg="teal.500"
                  color="white"
                  type="date"
                  id="start"
                  name="from-date"
                  value={startDate}
                  min=""
                  max=""
                  sx={{
                    "::-webkit-calendar-picker-indicator": {
                      filter: "invert(1)",
                    },
                  }}
                />
              </Box>
            </GridItem>
            <GridItem colSpan={{ base: 5, lg: 2 }}>
              <Box>
                <Input
                  onChange={(e) => setEndDate(e.target.value)}
                  bg="teal.500"
                  color="white"
                  type="date"
                  id="end"
                  name="to-date"
                  value={endDate}
                  min=""
                  max=""
                  sx={{
                    "::-webkit-calendar-picker-indicator": {
                      filter: "invert(1)",
                    },
                  }}
                />
              </Box>
            </GridItem>
            <GridItem colSpan={{ base: 5, lg: 2 }}>
              <Box>
                <Button bg="blue.700" color="white" onClick={generateReport}>
                  Generate report
                </Button>
              </Box>
            </GridItem>
          </Grid>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default Header;
