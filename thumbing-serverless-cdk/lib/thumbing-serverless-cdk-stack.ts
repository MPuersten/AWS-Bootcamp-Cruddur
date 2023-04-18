import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs';

export class ThumbingServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName = process.env.THUMBING_BUCKET_NAME!;
    const functionPath = process.env.THUMBING_FUNCTION_PATH!;

    const bucket = this.createBucket(bucketName);
    const lambda = this.createLambda(functionPath);
  }

  createBucket(bucketName: string): s3.Bucket {
    const bucket = new s3.Bucket(this, 'ThumbingBucket', {
      bucketName: bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    return bucket;
  }

  createLambda(functionPath: string): lambda.IFunction {
    const lambdaFunction = new lambda.Function(this, 'ThumbLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(functionPath)
    });

    return lambdaFunction;
  }
}
