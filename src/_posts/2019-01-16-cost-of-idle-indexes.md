---
title: "The Cost of Idle Indexes"
date: "2019-01-16T12:36:00-03:00"
permalink: "/post/cost-of-idle-indexes"

tags: databases mysql benchmarks
description: "A simple benchmark to assess the cost of unused indexes on MariaDB."
image: /images/database.jpg
---
![](/images/database.jpg)

The last few days I've been [cleaning up indexes](./unused-index-cleanup). This entails removing duplicate, unused or redundant indexes.

There were quite a lot of indexes, so it was hard work. I knew why this was important to do:
as the table changes, indexes need to be kept updated,
less indexes means less updates and less wasted resources.

But I wanted to have a real number to attach to the theory. How much benefit is there _really_? So I decided to run some simple benchmarks
 with [sysbench](./sysbench-guide-2).


## The Test 

The test procedure is really simple:

1.  create a test table
2.  run the desired benchmark
3.  add an index
4.  repeat benchmark

I started with 1 index (the primary key) and went up in 10 index increments. InnoDB supports up to 64 indexes per table.

Each particular combination of test + number of indexes was run 3 times. On the plots
we'll see the median, maximum and minimum values.

Testing was done on MariaDB 10.3.12 running in a docker container.


## Bulk Insert

Let's start with multi-row inserts.
This test is entirely focused on writes, so the number of indexes should have a high impact.

![Bulk insert. 1 thread](/media/plots/cost-of-indexes/bulk_insert.png)

RPS with 11 indexes is about 3 times slower. That's a lot. 61 indexes perform the worst, almost 13 times worse.


## OLTP Write Only

This being a write only test, the number of indexes should still matter a lot.

![OLTP Write Only. 1 thread](/media/plots/cost-of-indexes/oltp_wo.png)

11 indexes make transactions 40% slower. A considerable fall in performance. Worse case is a little bit less than 5 times slower.


## OLTP Read+Write

A mix of reads and writes.

![OTLP Read+Write. 1 thread](/media/plots/cost-of-indexes/oltp_rw.png)

With 11 indexes there is only about a 10% reduction in TPS. This should be due the fact that read speed is less affected
by extra indexes.


## OLTP Read Only

Why does the number of indexes affect read speed?
Well, for one thing the query optimizer needs to check all the indexes on a table (even if they are duplicate),
also there's some additional I/O required. So there is a cost, but it should be minimal.

Let's see if it shows in the test.
![OTLP Read Only. 1 thread](/media/plots/cost-of-indexes/oltp_ro.png)

As expected, TPS does depend on the number of indexes. Compared with previous tests, however, the impact is low:
the worst case, having 61 indexes means a 7% reduction in transaction speed.


## Related Links

-   benchmark data: <https://github.com/TomFern/benchmark-data/tree/master/cost-of-idle-indexes>

## Conclusion 

No major discoveries here. Everything lines up with what we could have expected. It would be interesting
to repeat the tests with higher a resolution between the first 15 or so indexes. Which, frankly,
is much more common than having 60+.

Bye.

Tomas
