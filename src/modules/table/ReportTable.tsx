import { Thead, Tr, Th, Tbody, Td, Table, Box } from "@chakra-ui/react";
import { TGatewayProps, TTableData } from "../../lib/types";
type TReportTableProps = {
  data: TTableData[];
  getGatewaysQuery: any;
};
function ReportTable({ data, getGatewaysQuery }: TReportTableProps) {
  const gatewaysData = getGatewaysQuery?.data?.data;
  // sort items by date in descending order
  const newData = data.sort(function (a, b) {
    const c = new Date(a.created).valueOf();
    const d = new Date(b.created).valueOf();
    //return c - d; // return ascending
    return d - c; // return descending
  });

  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="blue">
        <Thead bg="white">
          <Tr>
            <Th>Date</Th>
            <Th>Gateway</Th>
            <Th>Transaction ID</Th>
            <Th textAlign="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {newData.map((item: TTableData, index: number) => {
            const gatewayProject = gatewaysData?.find(
              (gateway: TGatewayProps) => gateway.gatewayId === item.gatewayId
            );
            const date = new Date(item?.created);
            const d = date.getDate();
            const m = date.getMonth() + 1;
            const y = date.getFullYear();
            const formatD = `${d}.${m}.${y}`;

            return (
              <Tr key={index}>
                <Td>{formatD}</Td>
                <Td>{gatewayProject?.name}</Td>
                <Td textAlign="left">{item?.paymentId}</Td>
                <Td isNumeric>{item?.amount.toFixed(2)} USD</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
export default ReportTable;
