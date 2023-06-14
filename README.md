# Typescript Example
This repo contains two examples. One is a fraud analisis worker for a banking workflow. 
The other is a full workflow as code example.

Examples:
2. [Banking Example](src/banking/README.md)
3. [User Info Example](src/emailsms/README.md)


### Running Example

install dependencies using `yarn`

> **Note**
Obtain KEY and SECRET from the playground or your Conductor server. [Quick tutorial for playground](https://orkes.io/content/docs/getting-started/concepts/access-control-applications#access-keys)

Export variables
```shell
export KEY=
export SECRET=
export SERVER_URL=https://play.orkes.io/api
```

Run the main programs using ts-node
```shell
ts-node src/banking/main.ts
ts-node src/emailandsms/main.ts
```