import { WorkflowExecutor } from "@io-orkes/conductor-javascript";
import { COMPLEX_WORKFLOW_NAME } from "../constants";

import { clientPromise } from "../client/apiUtil";
import {v4 as uuid} from "uuid";

const sleepFor = 5;

export async function executeWorkflowSync() {
  const client = await clientPromise;
  const workflowExecutor = new WorkflowExecutor(client);
  return await workflowExecutor.executeWorkflow(
    {
      name: COMPLEX_WORKFLOW_NAME,
      version: 1,
      input: {
        userId: "jim",
        notificationPref: "sms",
      },
    },
    COMPLEX_WORKFLOW_NAME,
    1,
    uuid()

  );
}

export async function executeWorkflowAsync() {
  const client = await clientPromise;
  const workflowExecutor = new WorkflowExecutor(client);
  const executionId = await workflowExecutor.startWorkflow({
    name: COMPLEX_WORKFLOW_NAME,
    version: 1,
    input: {
      userId: "jim",
      notificationPref: "sms",
    },
  });
  console.log(`Sleep for ${sleepFor} seconds`);

  await new Promise((resolve) =>
    setTimeout(() => {
      console.log(`Awake after ${sleepFor} seconds`);
      resolve(null);
    }, sleepFor * 1000)
  );

  return await workflowExecutor.getWorkflow(executionId, true);
}
