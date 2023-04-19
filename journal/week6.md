# Week 6 — Deploying Containers

This week was busy - I've added notes from research on deploying containers in AWS.

## Notes:

### ECS vs EKS vs Fargate

#### ECS

- Uses Docker containers
- Tasks and services
- Native with AWS service
- Simple, integrated soutions

#### EKS

- Managed Kubernetes orchestration service
- Broader range of community-driven tools
- Allows migrations of existing Kubernetes workloads

#### Fargate

- Serverless compute for ECS / EKS
- Do not have to manage infrastructure
- Simpler resource allocation and scaling

### Security

Create IAM roles specifically for interacting between hosted services, and in / out of other AWS services like a load balancer, RDS, DynamoDB, etc.

### Limiting Spend

Limit spend when running an ECS cluster by updating the deployed services to '0' which will stop the service and limit spend.
