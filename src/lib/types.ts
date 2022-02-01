export type TGatewayProps = {
  apiKey: string;
  description: string;
  gatewayId: string;
  name: string;
  secondaryApiKey: string;
  type: string;
  userIds: string[];
};

export type TTableData = {
  amount: number;
  created: string;
  gatewayId: string;
  modified: string;
  projectId: string;
  paymentId: string;
  userIds: string[];
};
