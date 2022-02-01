import { Thead, Tr, Th, Tbody, Td, Table } from "@chakra-ui/react";
import { useGetGatewaysQuery } from "../../lib/queries";
import { TGatewayProps, TTableData } from "../../lib/types";
type TReportTableProps = {
  data: TTableData[];
  getGatewaysQuery: any;
};
function ReportTable({ data, getGatewaysQuery }: TReportTableProps) {
  const gatewaysData = getGatewaysQuery?.data?.data;
  return (
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
        {data.map((item: TTableData, index: number) => {
          const gatewayProject = gatewaysData?.find(
            (gateway: TGatewayProps) => gateway.gatewayId === item.gatewayId
          );
          return (
            <Tr key={index}>
              <Td>{item?.created}</Td>
              <Td>{gatewayProject?.name}</Td>
              <Td textAlign="left">{item?.paymentId}</Td>
              <Td isNumeric>{item?.amount.toFixed(2)} USD</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
export default ReportTable;
