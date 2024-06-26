# GETTING STARTED WITH CONDUCTOR IN JAVASCRIPT

1. Create a project and add dependencies. 
   `yarn init -y && yarn add @io-orkes/conductor-javascript --save`
2. Add a file where you would run the project for example main.js
  `touch main.js`
4. Since we will use the import syntax we need to specify its type is module by adding "type":"module" to package json.
3. Create a workflow that echos input to output
```javascript
import {
  orkesConductorClient,
  workflow,
  inlineTask,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript";

// Server Settings
const serverSettings = {
  keyId: "",
  keySecret: "",
  serverUrl: "https://conductor-url/api",
};

// Create client configuration
const clientPromise = orkesConductorClient(serverSettings);

const main = async () => {
  // Resolve the promise
  const client = await clientPromise;

  // Create executor instance
  const executor = new WorkflowExecutor(client);

  const workflowName = "echo_param";

  // Workflow as code
  const echoWorkflow = workflow(workflowName, [
    inlineTask(
      "echo_ref",
      "(function(){ return '${workflow.input.toEcho}';})();",
      "graaljs"
    ),
  ]);
  // Add input parameter. Optional but helpfull
  echoWorkflow.inputParameters = ["toEcho"];
  
  // Map task output to workflow output
  echoWorkflow.outputParameters = { echo: "${echo_ref.output.result}" };

  // Register workflow. overwrite if it already exists
  await executor.registerWorkflow(true, echoWorkflow);

  // Start workflow sync
  const result = await executor.executeWorkflow(
    {
      name: workflowName,
      version: 1,
      input: { toEcho: "Hello World" },
    },
    workflowName, // name of the workflow
    1, // version
    "myReqId" // some request id, random
  );
  const output = result.output?.echo;

  console.log("Output: ", output);
};

main();
```
4. To run just `node main.js`