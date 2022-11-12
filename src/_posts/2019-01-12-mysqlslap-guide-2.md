---
title: "MySQLSlap (part 2)"
date: "2019-01-08T00:20:00-03:00"
tags: databases mysql guides
layout: "post"
permalink: "/post/mysqlslap-guide-2"
description: "A guide to benchmarking with mysqlslap."
image: /images/database.jpg
---

![](/images/database.jpg)

This is the second part of my mysqlslap guide, you can read the [first part](./mysqlslap-guide-1)

mysqlslap uses the same connection parameters as the normal mysql client, so `--host` `--port` `--socket` `--username` `--password` work.
In the examples below the parameters _will be omitted_ for brevity's sake.

## The Query Mode

Query mode allow us to benchmark ad-hoc queries. It's a quick way to troubleshoot a troublesome query.

In its simplest form we pass the query:

(Remember that the connection parameters are _omitted_)

```nil
-> mysqlslap --query="call superheroes.secret_identity('batman');"
  Benchmark
          Average number of seconds to run all queries: 0.000 seconds
          Minimum number of seconds to run all queries: 0.000 seconds
          Maximum number of seconds to run all queries: 0.000 seconds
          Number of clients running queries: 1
          Average number of queries per client: 1
```

We can also write our SQL in a file. mysqlslap is quirky when parsing files, it expects each statement into its own line, we can regain the normal behaviour using `--delimiter`

```nil
mysqlslap --query='my_query.sql' --delimiter=';'
```

If we want to repeat the query 10 times we use `--iterations`. mysqlslap opens 1 connection and runs the query 10 times, sequentially.

```nil
-> mysqlslap --iterations=10 --query="SELECT sleep(0.1);"
Benchmark
        Average number of seconds to run all queries: 0.102 seconds
        Minimum number of seconds to run all queries: 0.101 seconds
        Maximum number of seconds to run all queries: 0.104 seconds
        Number of clients running queries: 1
        Average number of queries per client: 1
```

The average time for each query was 0.101. The total execution time unfortunately is not shown by the tool but was a little longer than 1 second.

We can also use `--concurrency` to simulate many clients running at the same time. For example to simulate 20 clients, each one running time the query one time:

```nil
-> mysqlslap --concurrency=20 --query="SELECT sleep(0.1);"
Benchmark
        Average number of seconds to run all queries: 0.107 seconds
        Minimum number of seconds to run all queries: 0.107 seconds
        Maximum number of seconds to run all queries: 0.107 seconds
        Number of clients running queries: 20
        Average number of queries per client: 1
```

This time the command returned after a little longer than 100 ms, because the sleep was concurrent.
It returned after the last client finished sleeping.

And we can combine concurrency and iterations, this will run the query a total of 200 times:

```nil
-> mysqlslap --concurrency=20 --iterations=10 --query="SELECT sleep(0.1);"
Benchmark
        Average number of seconds to run all queries: 0.111 seconds
        Minimum number of seconds to run all queries: 0.104 seconds
        Maximum number of seconds to run all queries: 0.121 seconds
        Number of clients running queries: 20
        Average number of queries per client: 1
```

Total run time a little longer than 1 second.

What about if we want to create the test data? mysqlslap provides the `--create-schema` and the `--create` parameters.
We can supply the create DDL directly as strings or inside a text file.

```nil
# database dropped when done
mysqlslap --query="select * from heroes;" --create-schema='superheroes' --create='schema.sql' --delimiter=";"
```

**A word of warning**, the schema will be dropped afterwards (unless using `--no-drop`).


## Related links

-   MariaDB's mysqlslap: <https://mariadb.com/kb/en/library/mysqlslap/>
-   MySQL's mysqlslap: <https://dev.mysql.com/doc/refman/8.0/en/mysqlslap.html>


## Conclusion

Pretty neat, right?

If you haven't already, check the [first part](./mysqlslap-guide-1) of the guide to mysqlslap.
