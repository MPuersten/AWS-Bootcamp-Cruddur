import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { Construct } from 'constructs';

export class ThumbingServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName = process.env.THUMBING_BUCKET_NAME!;
    const functionPath = process.env.THUMBING_FUNCTION_PATH!;
    const folderInput = process.env.THUMBING_S3_FOLDER_INPUT!;
    const folderOutput = process.env.THUMBING_S3_FOLDER_OUTPUT!;

    const bucket = this.createBucket(bucketName);
    const lambda = this.createLambda(functionPath, folderInput, folderOutput);
  }

  createBucket(bucketName: string): s3.Bucket {
    const bucket = new s3.Bucket(this, 'ThumbingBucket', {
      bucketName: bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    return bucket;
  }

  createLambda(functionPath: string, bucketName: string, folderInput: string, folderOutput: string): lambda.IFunction {
    const lambdaFunction = new lambda.Function(this, 'ThumbLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(functionPath),
      environment: {
        DEST_BUCKET_NAME: bucketName,
        FOLDER_INPUT: folderInput,
        FOLDER_OUTPUT: folderOutput,
        PROCESS_WIDTH: '512',
        PROCESS_HEIGHT: '512'
      }
    });

    return lambdaFunction;
  }
}
