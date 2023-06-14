# Week 8 — Serverless Image Processing

## Activities Performed
- Implemented the CDK stack to prep for user avatars
- Setup avatars to be served from S3 via CloudFront
- Implemented User Profile page in Frontend (React)
- Implemented User Profile Form component in Frontend (React)
- Implemented SQL migrations script
- Implemented bio migration for adding and rolling back user table bio in PostgreSQL
- Performed Presigned URL generation with Ruby in AWS Lambda
- Setup an HTTP API Gateway with the Ruby Lambda Authorizer
- Created a JWT Lambda layer
- Rendered Avatars in the Frontend Application via CloudFront

## Setup

To setup the developement environment run the following:
 - bin/db/setup
 - bin/ddb/schema-load
 - bin/ddb/seed

## Research

### CDK

Open-source software development framework for defining cloud infrastructure in code and provisioning it through AWS CloudFormation. It allows the use of familiar programming languages like JavaScript, TypeScript, Python, Java, and C# to define reusable cloud components and compose them into a stack that can be easily deployed and managed.

### S3 - Expenses

S3 is a scalable, high-speed, web-based cloud storage service. It is designed to store and retrieve data from anywhere on the web. S3 expenses can include storage costs, data transfer costs, and request costs. The costs vary depending on the storage class, region, and usage pattern. Additionally, there are data transfer fees for moving data in and out of the service, as well as fees for various types of requests (e.g., PUT, COPY, POST, LIST, GET).

### Ruby

Dynamic, open-source, object-oriented programming language developed in the mid-1990s. It emphasizes simplicity, readability, and productivity, with a syntax that is easy to understand and write. Ruby is widely used for web development, and the Ruby on Rails web application framework has gained significant popularity for its ease of use and rapid development capabilities.

### CloudFront
CloudFront is a content delivery network (CDN) offered by AWS. It is designed to distribute and cache content across a network of global edge servers, reducing latency and improving the overall performance of web applications. CloudFront integrates with other AWS services like Amazon S3, Amazon EC2, Elastic Load Balancing, and AWS Lambda. It supports both static and dynamic content, as well as live streaming and video on demand. Pricing for CloudFront is based on data transfer and the number of HTTP/HTTPS requests, with additional costs for add-on features like real-time log delivery and field-level encryption.
