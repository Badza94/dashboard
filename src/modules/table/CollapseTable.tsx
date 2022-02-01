import {
  Accordion,
  Box,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import ReportTable from "./ReportTable";
import {
  useGetGatewaysQuery,
  useGetProjectsQuery,
  usePostReportsQuery,
} from "../../lib/queries";
import { groupBy } from "lodash";
import { useGlobal } from "../../context/GlobalContext";
import { Header, NoData } from "../../modules";
import { PieChart } from "../chart";
import { TGatewayProps, TTableData } from "../../lib/types";

function CollapseTable() {
  const { state } = useGlobal();

  const reports = usePostReportsQuery(state.data);

  const getProjectsQuery = useGetProjectsQuery();
  const getGatewaysQuery = useGetGatewaysQuery();
  const reportData = reports?.data?.data;
  const projects = groupBy(reportData, "projectId");

  const projectQueryData = getProjectsQuery?.data?.data;
  const gatewayQueryData = getGatewaysQuery?.data?.data;

  const totalNumber =
    (reportData &&
      Object.values(reportData)
        .filter((value) => Object.keys({ value }).length !== 0)
        .reduce((a, c: any) => a + c.amount, 0)) ||
    0;

  const gatewayGroup = groupBy(gatewayQueryData, "gatewayId");
  const projectGroup = groupBy(projectQueryData, "projectId");

  const projectName =
    (projectGroup &&
      state.data.projectId !== "" &&
      projectGroup[state.data.projectId][0]?.name) ||
    "All Projects";

  const gatewayName =
    gatewayGroup && state.data.gatewayId !== ""
      ? gatewayGroup[state.data.gatewayId][0]?.name
      : "All gateways";

  const isEmpty = Object.values(state.data).every(
    (x) => x === null || x === ""
  );

  const groupProjectsByGatewayId = groupBy(
    projects[state.data.projectId],
    "gatewayId"
  );

  const chartDataFoProjects = Object.values(groupProjectsByGatewayId).map(
    (value) => {
      return value.reduce((a, c: TTableData) => a + c.amount, 0);
    }
  );

  const gatewayLabels =
    state.data.gatewayId || ""
      ? [`${gatewayName}`]
      : gatewayQueryData?.map((x: TGatewayProps) => x.name);

  const chartDataForGateways = Object.values(projects).map((value) => {
    return value.reduce((a, c: TTableData) => a + c.amount, 0);
  });

  const projectLabels =
    state.data.projectId || ""
      ? [`${projectName}`]
      : projectQueryData?.map((x: TGatewayProps) => x.name);
  return (
    <Box>
      <Header getGatewaysQuery={getGatewaysQuery} />
      {!reports.isLoading ? (
        reportData && reportData.length && reports.isSuccess ? (
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem colSpan={{ base: 2, xl: isEmpty ? 2 : 1 }}>
              <Box
                bg="blue.50"
                borderRadius="10px"
                minH="100px"
                pt="18px"
                pb="50px"
                px="24px"
                mt="20px"
              >
                <Text
                  fontWeight="bold"
                  fontSize="16px"
                  lineHeight="19px"
                  color="black"
                >
                  {projectName} | {gatewayName}
                </Text>
                <Accordion allowMultiple mt="34px">
                  {Object.keys(projects).map((p, index) => {
                    let amount = 0;
                    projects[p].map((project: TTableData) => {
                      amount += project.amount;
                    });

                    const projectName = projectQueryData?.find(
                      (project: TTableData) => project.projectId === p
                    );
                    return (
                      <AccordionItem border="none" my="10px" key={index}>
                        <Text bg="white" borderRadius="10px" border="0">
                          <AccordionButton
                            px="24px"
                            py="22px"
                            _hover={{ bg: "white", borderRadius: "10px" }}
                          >
                            <Box flex="1" textAlign="left">
                              <Text
                                fontSize="16px"
                                lineHeight="18.75px"
                                fontWeight="700"
                              >
                                {projectName.name}
                              </Text>
                            </Box>
                            <Text
                              fontSize="16px"
                              lineHeight="26.3px"
                              fontWeight="700"
                            >
                              TOTAL: {amount.toFixed(2)} USD
                            </Text>
                          </AccordionButton>
                        </Text>
                        <AccordionPanel pb={4}>
                          <ReportTable
                            data={projects[p]}
                            getGatewaysQuery={getGatewaysQuery}
                          />
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
                <Box bg="white">
                  <Text fontSize="16px" fontWeight="bold" py="17px" px="19px">
                    TOTAL: {totalNumber?.toFixed(2)} USD
                  </Text>
                </Box>
              </Box>
            </GridItem>
            {!isEmpty && (
              <GridItem colSpan={{ base: 2, xl: 1 }}>
                <Flex justifyContent="center" mt={{ base: "50px", xl: "0" }}>
                  <PieChart
                    data={
                      chartDataFoProjects.length
                        ? chartDataFoProjects
                        : chartDataForGateways
                    }
                    labels={
                      state.data.gatewayId === ""
                        ? gatewayLabels
                        : projectLabels
                    }
                  />
                </Flex>
              </GridItem>
            )}
          </Grid>
        ) : (
          <Box mt="20px">
            <NoData />
          </Box>
        )
      ) : (
        "Loading..."
      )}
    </Box>
  );
}

export default CollapseTable;
