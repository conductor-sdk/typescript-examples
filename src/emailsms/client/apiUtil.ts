import { orkesConductorClient } from "@io-orkes/conductor-javascript";

const serverSettings = {
  keyId: process.env.KEY,
  keySecret: process.env.SECRET,
  serverUrl: process.env.SERVER_URL,
};

export const clientPromise = orkesConductorClient(serverSettings);

export function getWorkflowExecutionUrl(workflowId: string) {
  const baseUrl = `${process.env.CONDUCTOR_SERVER_URL}`;
  return `${baseUrl.substring(0, baseUrl.length - 4)}/execution/${workflowId}`;
}
