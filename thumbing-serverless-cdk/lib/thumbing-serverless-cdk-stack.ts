import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as s3n from 'aws-cdk-lib/aws-s3-notifications'
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions'
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

// Load env variables
const dotenv = require('dotenv')
dotenv.config();

export class ThumbingServerlessCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const uploadsBucketName = process.env.UPLOADS_BUCKET_NAME!;
    const assetsBucketName = process.env.ASSETS_BUCKET_NAME!;
    const folderInput = process.env.THUMBING_S3_FOLDER_INPUT!;
    const folderOutput = process.env.THUMBING_S3_FOLDER_OUTPUT!;
    const webhookUrl = process.env.THUMBING_WEBHOOK_URL!;
    const topicName = process.env.THUMBING_TOPIC_NAME!;
    const functionPath = process.env.THUMBING_FUNCTION_PATH!;
    console.log('uploadsBucketName',uploadsBucketName)
    console.log('assetsBucketName',assetsBucketName)
    console.log('folderInput',folderInput)
    console.log('folderOutput',folderOutput)
    console.log('webhookUrl',webhookUrl)
    console.log('topicName',topicName)
    console.log('functionPath',functionPath)

    const uploadsBucket = this.createUploadsBucket(uploadsBucketName);
    const assetsBucket = this.createAssetsBucket(assetsBucketName);

    const lambda = this.createLambda(
      functionPath, 
      uploadsBucketName,
      assetsBucketName,
      folderInput, 
      folderOutput
    );

    // create topics and sub
    const snsTopic = this.createSnsTopic(topicName);
    this.createSnsSubscription(snsTopic,webhookUrl);

    // add s3 event notifications
    this.createS3NotifyToLambda(folderInput, lambda, uploadsBucket);
    this.createS3NotifyToSns(folderOutput, snsTopic, assetsBucket);
    
    
    // create policies
    const s3UploadsReadWritePolicy = this.createPolicyBucketAccess(uploadsBucket.bucketArn);
    const s3AssetsReadWritePolicy = this.createPolicyBucketAccess(assetsBucket.bucketArn);
    // const snsPublishPolicy = this.createPolicySnSPublish(snsTopic.topicArn);
    
    // attach policies
    lambda.addToRolePolicy(s3UploadsReadWritePolicy);
    lambda.addToRolePolicy(s3AssetsReadWritePolicy);
    // lambda.addToRolePolicy(snsPublishPolicy);
  }

  createUploadsBucket(bucketName: string): s3.Bucket {
    const bucket = new s3.Bucket(this, 'UploadsBucket', {
      bucketName: bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    return bucket;
  }

  createAssetsBucket(bucketName: string): s3.Bucket {
    const bucket = new s3.Bucket(this, 'AssetsBucket', {
      bucketName: bucketName,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    return bucket;
  }

  importBucket(bucketName: string): s3.IBucket {
    return s3.Bucket.fromBucketName(this, 'AssetsBucket', bucketName);
  }

  createLambda(functionPath: string, uplaodsBucketName: string, assetsBucketName: string, folderInput: string, folderOutput: string): lambda.IFunction {
    const lambdaFunction = new lambda.Function(this, 'ThumbLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(functionPath),
      environment: {
        DEST_BUCKET_NAME: assetsBucketName,
        FOLDER_INPUT: folderInput,
        FOLDER_OUTPUT: folderOutput,
        PROCESS_WIDTH: '512',
        PROCESS_HEIGHT: '512'
      }
    });

    return lambdaFunction;
  }

  createS3NotifyToSns(prefix: string, snsTopic: sns.ITopic, bucket: s3.IBucket): void {
    const destination = new s3n.SnsDestination(snsTopic)
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT, 
      destination,
      {prefix: prefix}
    );
  }

  createS3NotifyToLambda(prefix: string, lambda: lambda.IFunction, bucket: s3.IBucket): void {
    const destination = new s3n.LambdaDestination(lambda);
      bucket.addEventNotification(s3.EventType.OBJECT_CREATED_PUT,
      destination
    )
  }

  createPolicyBucketAccess(bucketArn: string){
    const s3ReadWritePolicy = new iam.PolicyStatement({
      actions: [
        's3:GetObject',
        's3:PutObject',
      ],
      resources: [
        `${bucketArn}/*`,
      ]
    });
    return s3ReadWritePolicy;
  }

  createSnsTopic(topicName: string): sns.ITopic{
    const logicalName = "ThumbingTopic";
    const snsTopic = new sns.Topic(this, logicalName, {
      topicName: topicName
    });
    return snsTopic;
  }

  createSnsSubscription(snsTopic: sns.ITopic, webhookUrl: string): sns.Subscription {
    const snsSubscription = snsTopic.addSubscription(
      new subscriptions.UrlSubscription(webhookUrl)
    )
    return snsSubscription;
  }

  // createPolicySnSPublish(topicArn: string){
  //   const snsPublishPolicy = new iam.PolicyStatement({
  //     actions: [
  //       'sns:Publish',
  //     ],
  //     resources: [
  //       topicArn
  //     ]
  //   });
  //   return snsPublishPolicy;
  // }
}
