# Typescript Example
Simple example of workflow as code. workers and running the workflow

### Running Example

> **Note**
Obtain KEY and SECRET from the playground or your Conductor server. [Quick tutorial for playground](https://orkes.io/content/docs/getting-started/concepts/access-control-applications#access-keys)

Export variables
```shell
export KEY=
export SECRET=
export SERVER_URL=https://play.orkes.io/api
```

Run the main program
```shell
ts-node src/emailsms/main.ts
```