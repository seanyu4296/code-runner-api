## Info
1. A simple project that exposes an api through (HTTP POST "/") to run js code and return console.log's in array and the value of the last executed line of code
   1. Sample request - `{ code: "let x = 1; console.log('hi'); x;" }`
   2. Async function sample - `{code: " async function x() { return 1;} (async () => { return await x();})();"`}
   3. Sample response - `{ logs: ['hi'], result: 1}`
2. Built using aws-cdk, typescript, nodejs, express, and isolated-vm
   1. Used isolated-vm to run untrusted code securely in a different process using v8:Isolate feature
      1. other choices were vm2, which fell short because it runs in the same process
   2. Used aws-cdk and typescript to replicate, deploy and scale AWS infra easily
   3. Used simple javascript for fast prototyping

3. A simple ci/cd is setup using circleci to build and deploy to AWS with github checks

## Getting Started Locally
1. `yarn install`
2. `yarn dev`
3. Send an HTTP POST to `http://localhost:3000` with a body `{ code: "let x = 1; console.log('hi'); x;" }`

## Deploying to AWS
1. Important: You must be on a Linux machine to deploy this successfully because isolated-vm have native modules. Alternatively, if you setup your circleci with this project it will automatically deploy to AWS on master, but you also need to configure the env variables. Do note, setting up the right node version on the machine is also important
2. `yarn install`
3. `yarn build:api`
4. `yarn build:cdk`
5. Configure your AWS environment variables
   1. AWS_ACCESS_KEY_ID
   2. AWS_SECRET_KEY
   3. CDK_DEPLOY_ACCOUNT
   4. CDK_DEFAULT_REGION
6. `yarn cdk list` to check stacks available
7. `yarn cdk deploy code-runner-staging`
