import { ConductorWorker } from "@io-orkes/conductor-javascript";
import * as fraudService from "../services/fraud-service";

 // docs-marker-start-1
export const fraudCheckWorker: ConductorWorker = {
  taskDefName: "fraud-check",
  execute: async ({ inputData }) => {
    const amount = inputData?.amount;
    const accountId = inputData?.accountId;
    const fraudResult = fraudService.isFraudulentTxn(accountId, amount);
    return {
      outputData: fraudResult,
      status: "COMPLETED",
    };
  },
};
// docs-marker-end-1