---
title: "MySQLSlap (part 1)"
date: "2019-01-08T00:20:00-03:00"
tags: databases mysql guides

permalink: "/post/mysqlslap-guide-1"
description: "A guide to benchmarking with mysqlslap."
image: /images/database.jpg
---

![](/images/database.jpg)

There are loads of ways to benchmark MySQL. `mysqlslap` was, I believe, one of the first official tools for this. It's bundled with the client tools for MySQL and MariaDB,
so you probably already have it installed.

In this post I'll cover the basics and the _auto generate sql_ mode, be sure to read the [second part](./mysqlslap-guide-2) about other ways to use it.


## How Does It Work?

mysqlslap uses the same connection parameters as the normal mysql client, so `--host` `--port` `--socket` `--username` `--password` all work
 (but strangely the `--defaults-file` doesn't).

In the examples below, however, the parameters _will be omitted_ for brevity's sake.

mysqlslap works in 3 stages:

1.  create test schema
2.  run test as multiple clients
3.  delete test schema.

The first and last are executed as a single connection, only in the middle step time is measured.


## Auto Generate Sql

In auto generate sql mode, mysqlslap will handle table and queries. No need to write any SQL.

This mode activated with `--auto-generate-sql` (or in short form: `-a`).

```nil
-> mysqlslap --auto-generate-sql --auto-generate-sql-load-type=read --auto-generate-sql-execute-number=10
Benchmark
        Average number of seconds to run all queries: 0.004 seconds
        Minimum number of seconds to run all queries: 0.004 seconds
        Maximum number of seconds to run all queries: 0.004 seconds
        Number of clients running queries: 1
        Average number of queries per client: 10
```

What happened?

1.  The `mysqlslap` schema was created
2.  A test table `t1` was created. It has 1 integer and 1 varchar(128) column, no explicit primary key
3.  The table was populated with random rows
4.  A full table SELECT is run 10 times, sequentially, from a single connection
5.  The `mysqlslap` schema is dropped
6.  The total time taken reported

Let's break down the options:

-   `--auto-generate-sql-load-type` what is the test type to run
-   `--auto-generate-sql-execute-number` how many queries to execute per client

What is different about this next one?

```nil
# simulating 10 clients
-> mysqlslap --auto-generate-sql --auto-generate-sql-load-type=read --auto-generate-sql-execute-number=1 --concurrency=10
Benchmark
        Average number of seconds to run all queries: 0.015 seconds
        Minimum number of seconds to run all queries: 0.015 seconds
        Maximum number of seconds to run all queries: 0.015 seconds
        Number of clients running queries: 10
        Average number of queries per client: 1
```

This one runs the same total number of SELECTs as before, however it does it in parallel.
There are 10 clients running the a single query. We get the total taken to run the 10 queries.

Did you notice the times reported? Why is it that we get the same values for average, max and min?
This is because so far we ran the test only 1 time. We can choose to repeat the test using then `--iterations` parameter.

```nil
# 100 iterations, 10 clients
-> mysqlslap --auto-generate-sql --auto-generate-sql-load-type=read --auto-generate-sql-execute-number=1 --concurrency=10 --iterations=100
Benchmark
        Average number of seconds to run all queries: 0.006 seconds
        Minimum number of seconds to run all queries: 0.001 seconds
        Maximum number of seconds to run all queries: 0.015 seconds
        Number of clients running queries: 10
        Average number of queries per client: 1
```

What changed?
Essentially the whole thing (schema created and dropped) is done 100 times.
Now times are different because we added some variability.


## What Other Things Can It Do?

We can try other types of tests, `--auto-generate-sql-load-type` can be:

-   read: `SELECT * FROM table`
-   write: `INSERT`
-   key: `SELECT (primary keys columns)`
-   update: `UPDATE (primary keys)`
-   mixed: `INSERT INTO table; SELECT * FROM table`

The mixed mode is the default, it generates 2 queries and both count towards the `--auto-generate-sql-execute-number`

```nil
-> mysqlslap --auto-generate-sql --auto-generate-sql-execute-number=10
Benchmark
        Average number of seconds to run all queries: 0.006 seconds
        Minimum number of seconds to run all queries: 0.006 seconds
        Maximum number of seconds to run all queries: 0.006 seconds
        Number of clients running queries: 1
        Average number of queries per client: 10
```

Since we asked to generate 10 queries, mysqlslap ran 5 INSERTS and 5 SELECTs. We get the total time to run all the queries.

The generated table can be tweaked with the following options:

-   `--number-char-cols` number of varchar columns (1)
-   `--number-int-cols` number of integer columns (1)
-   `--auto-generate-sql-guid-primary` add a varchar(36) primary column (none)
-   `--auto-generate-sql-add-autoincrement` add an auto-increment bigint column with an unique index (none)
-   `--auto-generate-sql-secondary-indexes` generate n integer columns with unique indexes (0)

The table row distribution can be further tweaked with:

-   `--auto-generate-sql-write-number` how many rows to insert into test table (100)
-   `--auto-generate-sql-unique-query-number` how many unique rows, so we can play with cardinality (10)

Other commonly used options are:

-   `-vv` show verbose output
-   `--csv` output into CSV file
-   `--no-drop` don't drop the schema when done
-   `--create-schema` use a different test schema name


## Related Links 

-   MariaDB's mysqlslap: <https://mariadb.com/kb/en/library/mysqlslap/>
-   MySQL's mysqlslap: <https://dev.mysql.com/doc/refman/8.0/en/mysqlslap.html>


## Conclusion

mysqlslap is, arguably, a simple benchmark tool, but sometimes simpler is better.

And since we can almost always count on having it installed it's a good idea to get familiarized with it.

The [next part](./mysqlslap-guide-2) will cover the query mode.
