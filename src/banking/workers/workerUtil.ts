import {
  ConductorClient,
  TaskManager,
} from "@io-orkes/conductor-javascript";
import { fraudCheckWorker } from "./workers";

export function createTaskRunner(conductorClient: ConductorClient) {
  const taskRunner = new TaskManager(conductorClient, [fraudCheckWorker], {
    logger: console,
    options: { pollInterval: 100, concurrency: 1 },
  });
  return taskRunner;
}
