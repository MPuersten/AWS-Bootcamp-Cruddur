# Week 2 — Distributed Tracing

## Activities Performed
- Instrumented Honeycomb for tracing with OpenTelemetry (OTEL)
- Instrumented AWS X-Ray for tracing
- Configured and added a custom CloudWatch logger
- Configured and added integration with Rollbar for debugging

All distributed tracing methods have been implemented and run.
Particular interest in the simplicity and utility of Honeycomb drove some additional information and research for use in personal and professional projects.

## Honeycomb additional queries
I played around with Honeycomb queries to see what useful queries I could run and save.

### Count and data.size
I created a query for totaling the amount of payload data in a cluster of traces over the specified time period. The idea being you can use this to eventually trace the amount of data you're passing to an api that may charge based on transfer amount like in certain Azure storage accounts. I created the query by adding COUNT under visualize, and app.result_length under GROUP BY

### Errors within a specific service
Even more useful, I've added a query that will report traces within a specific service that contain any type of error. This could be really useful when working with a large multi-service system based on micro architecture since it would allow the reviewer to see where error propagation originate.

## Further research on utility of Tracing in cloud environments serving Video
Having a particular interest in video stream per my current professional projects, I looked into some best practices for helpful tracing when video streaming.

### Which metrics are important?
Since video streaming has such a focus on quality of delivery the metrics for tracing can be geared specifically to reporting those metrics. Some of the key ones uncovered were buffer sizes, buffer related errors, framerate at some predefined frequency, latency, and other network conditions. It stands to reason that these metrics would provide insights into bottlenecks of other performance problems.

### Minimizing impact
There was special emphasis on tracing and the impact it can have that I'd like to capture here - tracing as any other activity will impact system performance, and in a user focused application this means you could be introducing additional latency to a system that should be performing better. It seems a popular approach to this is to utilize sampling at some pre-determined frequency instead after every event, reducing the impact of the tracing activity. Another recommendation is to trace only in certain environments - for example, only within the video server and not within a client web app. Much like when tracing was discussed in the week 2 live video, introducing frontend tracing is more uncommon.
