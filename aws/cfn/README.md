## Architecture Guide

Before running any templates, create an S3 bucket to contain all artifacts for cloud formations

```
aws s3 mk s3://cfn-artifacts-cruddurmitchpuersten
export CFN_BUCKET='cfn-artifacts-cruddurmitchpuersten'
gp env CFN_BUCKET='cfn-artifacts-cruddurmitchpuersten'
```

Note that bucket names must be globally unique.