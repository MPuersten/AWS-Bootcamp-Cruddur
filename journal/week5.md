# Week 5 — DynamoDB and Serverless Caching

## Activities Performed
- Implemented DynamoDB Schema loading script
- Implemented DynamoDB Seed script
- Implemented Read, List conversations scripts
- Implemented Update cognito ID script for Postgres
- Implement pattern A
- Implement pattern B
- Implement pattern C
- Implement pattern D
- Implement pattern E

### Pattern A
List messages in a message group into the application (see relevant message in conversation)

### Pattern B
List message groups into the application (pick group to message in)

### Pattern C
Create message for existing message group in applciation

### Pattern D
Create message for new message group in application

### Pattern E
Update message group with DynamoDB streams

## Takeaways

Achieved a much stronger understanding of the flow end to end, how to follow it across the system, and where to log and view errors depending on what is going wrong.

### How to approach - CORS error on something that was previously working

Because of the way the system is currently built, when an error occurs in the backend and the approriate return ofeers are not successfully attached, a CORS error occurs. This was initially frustrating because I thought that I just missed something, but became a bit of a blessing as I went on because I knew it was related to the backend since the request worked previously.

If seeing this error again, I would:
 - Do a brief check of the headers
 - Simplify the backend so the response is dumb but conforming to the CORS policy
 - Introduce complex elements one by one
 - Ensure proper CORS wrapping on the violating one
 - Correct the issue as reported in the backend logs

### React Project Structure

Did a fair amount of manual tracing through the react application, got a great feel for how the pages and components flow together and how the links push us back and forth through the application.
