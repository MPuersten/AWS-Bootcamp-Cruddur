# Week 4 — Postgres and RDS

## RDS research and notes

### Subqueries (My Debugging Savior)
Since Postgres and SQL databases are relatively new to me I found a lot of the SQL query language to be at least a little bit magical, and when one of the nested queries failed to return the expected uuid I was relatively lost as the instreuctional video did not encounter the same issue. I later learned that the issue was the handle I was injecting into the query - it did not match what was already in my database.

To approach this issue I took to the internet looking for suggestions. General guidance online was to use subqueries and split my queires into distinct pieces. This made logical sense to me especially coming in with experience in SOLID - one behavior per query, and nesting of queries in a modular way to grant better availability and scalability in the future. It was however also recommended that use of subqueries should be relatively limited - not in their construction but rather in their use. This is a performance considerations and could likely be investigated using some of the tracing techniques we explored earlier.

During my debugging I employed use of the following:
- the EXISTS operator during comparisons
- splitting a query witha nested query into two separate queries for analysis
- additional colored print statements and many MANY tests to feel out problem areas in the code

To further my knowledge more I'm going to look into CTEs and their use cases as well as potential use cases within the Cruddur app as we go forward.
