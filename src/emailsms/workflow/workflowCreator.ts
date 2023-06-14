import {
  simpleTask,
  switchTask,
  workflow,
} from "@io-orkes/conductor-javascript";

import {
  COMPLEX_WORKFLOW_NAME,
  GET_USER_INFO,
  SEND_EMAIL,
  SEND_SMS,
} from "../constants";

import { clientPromise } from "../client/apiUtil";

export async function createAndRegisterWorkflow() {
  const getUserDetailsTask = simpleTask(GET_USER_INFO, GET_USER_INFO, {
    userId: "${workflow.input.userId}",
  });
  const emailOrSmsTask = switchTask(
    "emailorsms",
    "${workflow.input.notificationPref}",
    {
      email: [
        simpleTask(SEND_EMAIL, SEND_EMAIL, {
          email: "${get_user_info.output.email}",
        }),
      ],
      sms: [
        simpleTask(SEND_SMS, SEND_SMS, {
          phoneNumber: "${get_user_info.output.phoneNumber}",
        }),
      ],
    }
  );

  const wf = workflow(COMPLEX_WORKFLOW_NAME, [
    getUserDetailsTask,
    emailOrSmsTask,
  ]);
  wf.inputParameters = ["userId", "notificationPref"];

  const client = await clientPromise;
  client.metadataResource.create(wf, true);

  return wf;
}

