import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import cdk = require("@aws-cdk/core");
import { StackProps, Duration } from "@aws-cdk/core";

export enum Stage {
  STAGING = "staging",
  PROD = "prod",
}

const stages: Array<Stage> = [Stage.STAGING];

class CodeRunnerStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, props?: StackProps) {
    super(app, id, props);
    const lambdaFunc = new lambda.Function(this, "lambda-proxy", {
      code: new lambda.AssetCode("api-dist/"),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: Duration.minutes(3),
      memorySize: 256,
      environment: {},
    });
    new apigateway.LambdaRestApi(this, "lambda-rest-api", {
      handler: lambdaFunc,
    });
  }
}

const app = new cdk.App();
stages.forEach((stage) => {
  new CodeRunnerStack(app, `code-runner-${stage}`, {
    env: {
      account: "560397428138",
      region: "ap-southeast-1"
  }});
});
