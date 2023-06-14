import { ConductorWorker } from "@io-orkes/conductor-javascript";
import { GET_USER_INFO, SEND_EMAIL, SEND_SMS } from "../constants";

export const userInfoWorker = (): ConductorWorker => {
  return {
    taskDefName: GET_USER_INFO,
    execute: async ({ inputData }) => {
      const userId = inputData?.userId;
      return {
        outputData: {
          email: `${userId}@email.com`,
          phoneNumber: "555-555-5555",
        },
        status: "COMPLETED",
      };
    },
  };
};

export const sendEmailWorker = (): ConductorWorker => {
  return {
    taskDefName: SEND_EMAIL,
    execute: async ({ inputData }) => {
      console.log(`Sent email to: ${inputData?.email}`);
      return {
        status: "COMPLETED",
      };
    },
  };
};

export const sendSmsWorker = (): ConductorWorker => {
  return {
    taskDefName: SEND_SMS,
    execute: async ({ inputData }) => {
      console.log(`Sent SMS to: ${inputData?.phoneNumber}`);
      return {
        status: "COMPLETED",
      };
    },
  };
};
