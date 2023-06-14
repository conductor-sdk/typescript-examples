
import { TaskManager } from "@io-orkes/conductor-javascript";
import { userInfoWorker, sendEmailWorker, sendSmsWorker } from "./workers";
import { clientPromise } from "../client/apiUtil";

export async function createTaskManager() {
  const client = await clientPromise;
  return new TaskManager(
    client,
    [userInfoWorker(), sendEmailWorker(), sendSmsWorker()],
    { logger: console, options: { concurrency: 5, pollInterval: 100 } }
  );
}
