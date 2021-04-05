import * as cdk from '@aws-cdk/core';
import *as lambda from '@aws-cdk/aws-lambda';

export class LambdaWithMultipleLayersStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const httpLayer = new lambda.LayerVersion(this, "httpLayer", {
      code: lambda.Code.fromAsset('lambda-layers/http'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X] // optional
    });

    const nameGenerator = new lambda.LayerVersion(this, "nameGeneratorLayer", {
      code: lambda.Code.fromAsset('lambda-layers/nameGenerator'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_12_X] // optional
    });

    new lambda.Function(this, "lambdaLayer", {
      code: lambda.Code.fromAsset('lambda-fns'),
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'lambda.handler',
      layers: [httpLayer, nameGenerator],
    });

  }
}
