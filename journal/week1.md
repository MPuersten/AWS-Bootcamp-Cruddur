# Week 1 — App Containerization

## Checklist

### Application Dockerization

Applications have been successfully dockerized and and communicate. Docker compose file successfully runs both the Frontend and Backend.

## DynamoDB Notes
DynamoDB is a NoSQL database (No strict structure to documents that are added, much greater flexibility for data models). 
It is provided directly by AWS and intended for use in cloud.
DynamoDB offers typical cloud features such as:
- Scalability 
- Availability (redudancy over mutliple regions)
- Security with granual access control
- Cost scaling with pay-as-you-go

Dynamo also offers low, predictable latency even at scale as an application grows.
Additionally Dynamo is serverless, which means there are no servers that manage it, and it can scale easily

## PostgreSQL
Otherwise referred to as Postgres, PostgreSQL is an object-relational database management system and acts as an SQL database extension. 
It allows you to add extensions and procedures to introduce new functionality.
Postgres is also Open source. It has a write-ahead logging system to prevent data loss.
Typical benefits of postgres:
- Reliability, it is known to be stable and reliable. Can easily handle large / complex DBs.
- Extensible via extensions and procedures
- Flexible, support for JSON / arrays / user defined types
- High performance, good with complex queries and high data volume, performance optimization includes indexing and query planning
- Security features like SSL encryption, authenticaiton, access control

