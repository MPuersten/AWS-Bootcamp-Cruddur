# Week 0 — Billing and Architecture

## Activities Performed
- Forked the template repo and performed initial commit
- Created a conceptual diagram in lucid (see _docs folder)
- Created a logical diagram in lucid (see _docs folder)
- Created an admin user in AWS
- Generated admin user credentials
- Installed AWS CLI
- Created a billing alarm

## Conceptual Diagram
Lays out absolute basics and approach to future design without implementation bias
https://lucid.app/lucidchart/3b3e77b7-68f9-4fdc-83e0-2649a4a439ea/edit?viewport_loc=-1053%2C-249%2C3593%2C1845%2C0_0&invitationId=inv_b5d63897-59f0-4cb0-9a92-8e9add0f6ede

## Logical Diagram
Describes the logical flow at a high level to demonstrate core concepts, and address specific concerns of stakeholders.
https://lucid.app/lucidchart/5e1ebab5-d4cc-43da-9edc-82d63ff0b61b/edit?viewport_loc=-159%2C53%2C3072%2C1577%2C0_0&invitationId=inv_45928dee-bf3f-45aa-a98e-5a1446c5cb08

## Conceptual vs Logical Diagrmas
Whereas some conceptual design I have done to date is more detailed, it seems like the focues of the conceptual design as a exercise is to completely avoid implementation details, and sometimes even the intended flow of the software to provide a level of simplicity and an outline of the overall structure of the software.

Logical design more closely aligns with my previous understanding of a detailed design - although in the demoed creation of the logical design there was significantly less implementation details than expected. After some research into other logical designs and typical approaches it seems previous detailed designs I've done contain too much detail, and are way too likely to change to be long-term sustainable. While creating a logical design I should avoid adding too much detail to each logical block, and can instead indicate basic relationships with the surrounding logical blocks with breif descriptions about each for the reader.

## Azure -> AWS
By no means are these direct 1-1, but there are similarities I can draw while I'm learning the AWS services and resources
- Azure: Azure Virtual Machines -> AWS: Amazon Elastic Compute Cloud (EC2)
- Azure: Azure Kubernetes Service (AKS) -> AWS: Amazon Elastic Kubernetes Service (EKS)
- Azure: Azure Functions -> AWS: AWS Lambda
- Azure: Azure Blob Storage -> AWS: Amazon Simple Storage Service (S3)
- Azure: Azure SQL Database -> AWS: Amazon Relational Database Service (RDS)
- Azure: Azure Stream Analytics -> AWS: Amazon Kinesis
- Azure: Azure Content Delivery Network (CDN) -> AWS: Amazon CloudFront
- Azure: Azure Active Directory -> AWS: AWS Identity and Access Management (IAM)
- Azure: Azure Virtual Network -> AWS: Amazon Virtual Private Cloud (VPC)
- Azure: Azure Monitor -> AWS: Amazon CloudWatch
