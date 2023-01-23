---
title: "Benchmarking with sysbench"
date: "2019-01-09T00:05:00-03:00"
permalink: "/post/sysbench-guide-1"
tags: linux-tools

excerpt: "A getting started guide to benchmarking with sysbench"
image: /images/database.jpg
---

![](/images/database.jpg)

## Why, When, How?

Benchmark shows the difference between should and does. Coupled with monitoring it's a great tool to identify bottlenecks.

As to when: whenever we can, as long as the system is production. A good benchmark will stress the server so we don't want users affected.
Right after provisioning a server, during a maintenance window, before and after any major changes, these are all good opportunities to take advantage of a few precious
minutes of calm to run some tests.

We should try to mimic as best as possible the behaviour of the software we have.
Is it single or multithreaded? Is it on more CPU bound or disk IO bound. Does it access data randomly or sequentially?
Does it manage data on fixed-size blocks?


## Introducing Sysbench

Sysbench is a popular benchmark tool that is available for linux, mac and can even run on windows (with it's subsystem for linux).
It ships with tests for the OS and databases. It is extensible and scriptable, so writing our own tests is possible.

If you are running linux, it's most likely available in your distribution repository. Otherwise head to sysbench's [github](https://github.com/akopytov/sysbench) for instructions.


## Getting Started

The general syntax is:

```shell
sysbench <testname> <action> [test-specific options]
```

Sysbench has quite a few options, but help a few keystrokes away. To get to the general help:

```shell
sysbench --help
```

And for the specific test use:

```shell
sysbench <testname> help
```

Some tests have a _prepare_ and _cleanup_ action, some also have an optional _warmup_ action, others can be _run_ directly.


## The Test Loop

All tests have a common structure, the requested number of worker threads are created, each one will run its own test loop,
each iteration of the loop is called an _event_ and can have any number of operations. Sysbench keeps counters on all events across all threads.

When it's done, we get the statistics for all events. Under _latency_ we can see the average event duration.
These values are common to all tests.

```nil
...
General statistics:
    total time:                          10.0014s
    total number of events:              32479

Latency (ms):
         min:                                    1.11
         avg:                                    2.46
         max:                                   41.95
         95th percentile:                       11.24
         sum:                                79934.27

Threads fairness:
    events (avg/stddev):           4059.8750/59.44
    execution time (avg/stddev):   9.9918/0.01
```

On multithreaded tests we want that events are distributed fairly among all threads, i.e. all threads should execute approximately the same number of events.
This is shown under _fairness_, the _stddev_ (standard deviation) should be small in relation to the _average_.

Most of the benchmarks will run for a specified time or until a certain condition is met. The default time limit is 10 seconds, but we can
change that using `--time`. Alternatively we can set a limit number of `--events`.


## Testing Your CPUs

In this first test we'll torture the CPUs by computing prime numbers.
Each single event will check prime numbers up to the provided `--cpu-max-prime`.
The higher this value is, the longer it takes an event to end.

I usually like to start with single threadetest. I try to find a `--cpu-max-prime` that will take at least a few seconds to complete.

```nil
# sysbench cpu test, single event
-> sysbench cpu run --threads=1 --events=1 --cpu-max-prime=8000000
sysbench 1.0.15 (using system LuaJIT 2.0.5)

Running the test with following options:
Number of threads: 1
Initializing random number generator from current time


Prime numbers limit: 8000000

Initializing worker threads...

Threads started!

CPU speed:
    events per second:     0.09

General statistics:
    total time:                          11.2315s
    total number of events:              1

Latency (ms):
         min:                                11231.45
         avg:                                11231.45
         max:                                11231.45
         95th percentile:                    11317.84
         sum:                                11231.45

Threads fairness:
    events (avg/stddev):           1.0000/0.00
    execution time (avg/stddev):   11.2314/0.00
```

With a suitable max prime number found, the next step is to run a longer test.

```nil
# sysbench cpu, single thread
-> sysbench cpu run --threads=1 --time=60 --cpu-max-prime=8000000
sysbench 1.0.15 (using system LuaJIT 2.0.5)

Running the test with following options:
Number of threads: 1
Initializing random number generator from current time


Prime numbers limit: 8000000

Initializing worker threads...

Threads started!

CPU speed:
    events per second:     0.09

General statistics:
    total time:                          67.5691s
    total number of events:              6

Latency (ms):
         min:                                11217.78
         avg:                                11261.48
         max:                                11302.15
         95th percentile:                    11317.84
         sum:                                67568.87

Threads fairness:
    events (avg/stddev):           6.0000/0.00
    execution time (avg/stddev):   67.5689/0.00
```

On _average_, it took 11.261 seconds to calculate primes up to our limit.
A lower average is better, since it means the CPU takes less time to reach the same point. For the same reason, a higher value in _events per second_ is better.

If we are going to run multithreaded applications we need to run another test with an appropiate number `--threads`.
For example in a system with 4 cores with hyperthreading this is a good starting point.

```nil
# cpu test, 8 threads
-> sysbench cpu run --threads=8 --time=60 --cpu-max-prime=8000000
sysbench 1.0.15 (using system LuaJIT 2.0.5)

Running the test with following options:
Number of threads: 8
Initializing random number generator from current time


Prime numbers limit: 8000000

Initializing worker threads...

Threads started!

CPU speed:
    events per second:     0.29

General statistics:
    total time:                          82.1154s
    total number of events:              24

Latency (ms):
         min:                                26514.20
         avg:                                27212.58
         max:                                28103.35
         95th percentile:                    27846.48
         sum:                               653101.88

Threads fairness:
    events (avg/stddev):           3.0000/0.00
    execution time (avg/stddev):   81.6377/0.36
```


## Testing Your Memory 

For memory we can test either _write_ or _read_ speeds, the mode is selected with `--memory-open`.
We can choose between sequential (_seq_) and random (_rnd_) access modes with `--memory-access-mode`.

This benchmark has a special stop condition: `--memory-total-size`. Bear in mind, this isn't the total size allocated in RAM.

```nil
# memory, no time limit, stop on 100GB written
-> sysbench memory run --memory-total-size=100G --memory-open=write --memory-access-mode=rnd --time=0
WARNING: Both event and time limits are disabled, running an endless test
sysbench 1.0.15 (using system LuaJIT 2.0.5)

Running the test with following options:
Number of threads: 1
Initializing random number generator from current time


Running memory speed test with the following options:
  block size: 1KiB
  total size: 102400MiB
  operation: write
  scope: global

Initializing worker threads...

Threads started!

Total operations: 104857600 (5010197.95 per second)

102400.00 MiB transferred (4892.77 MiB/sec)


General statistics:
    total time:                          20.9272s
    total number of events:              104857600

Latency (ms):
         min:                                    0.00
         avg:                                    0.00
         max:                                    0.38
         95th percentile:                        0.00
         sum:                                10816.80

Threads fairness:
    events (avg/stddev):           104857600.0000/0.00
    execution time (avg/stddev):   10.8168/0.00
```

The latency is measured in milliseconds, it's just to big of a unit for memory speeds so it's not very useful here.
But we can think of the _MiB per seconds_ as the average speed.

If we have a service that work with fixed-size blocks, for example if plan to have a database,
we should set `--memory-block-size` to match it.

```nil
# some memory tests for MySQL (page size is 16K)
sysbench memory run --threads=8 --memory-block-size=16K --memory-total-size=100G --memory-oper=write
sysbench memory run --threads=8 --memory-block-size=16K --memory-total-size=100G --memory-oper=read
```


## Testing Your Disk I/O Speed 

Before starting, we need to _prepare_ a file or set of files to work on. We set the **total** space to allocate with `--file-total-size` (which must be at least 2GB)
and how many files there will be in the set, the space will be split into even sized files.

We probably want to avoid caching the files in memory because we wouldn't be measuring the true disk spee,
 so it might me a good idea to include `--file-extra-flags=direct` to bypass it.

It's generally recommended, whenever possible, that allocated space is larger than the installed RAM, just in case caching is taking place in spite of our best efforts.

```nil
-> sysbench fileio prepare --file-num=10 --file-total-size=10G --file-extra-flags=direct

sysbench 1.0.15 (using system LuaJIT 2.0.5)

10 files, 1048576Kb each, 10240Mb total
Creating files for the test...
Extra file open flags: (none)
Creating file test_file.0
Creating file test_file.1
Creating file test_file.2
Creating file test_file.3
Creating file test_file.4
Creating file test_file.5
Creating file test_file.6
Creating file test_file.7
Creating file test_file.8
Creating file test_file.9
10737418240 bytes written in 45.15 seconds (226.78 MiB/sec).
```

> _prepare_ can reutilize previous test files, but it only can **grow** them, so we can only reuse test files if they are bigger or equal than before. Otherwise we must _cleanup_ and _prepare_ again.

Now we need to choose a `--file-test-mode`:

-   seqwr: sequential write
-   seqrewr: sequential read+write
-   seqrd: sequential read
-   rndrd: random read
-   rndwr: random write
-   rndrw: random read write

```nil
# file read-write test
-> sysbench fileio run --file-num=10 --file-total-size=10G --file-test-mode=rndrw --file-extra-flags=direct --time=60

sysbench 1.0.15 (using system LuaJIT 2.0.5)

Running the test with following options:
Number of threads: 1
Initializing random number generator from current time


Extra file open flags: directio
10 files, 1GiB each
10GiB total file size
Block size 16KiB
Number of IO requests: 0
Read/Write ratio for combined random IO test: 1.50
Periodic FSYNC enabled, calling fsync() each 100 requests.
Calling fsync() at the end of test, Enabled.
Using synchronous I/O mode
Doing random r/w test
Initializing worker threads...

Threads started!


File operations:
    reads/s:                      2388.59
    writes/s:                     1592.38
    fsyncs/s:                     398.14

Throughput:
    read, MiB/s:                  37.32
    written, MiB/s:               24.88

General statistics:
    total time:                          60.0027s
    total number of events:              262756

Latency (ms):
         min:                                    0.06
         avg:                                    0.23
         max:                                   77.63
         95th percentile:                        0.39
         sum:                                59796.75

Threads fairness:
    events (avg/stddev):           262756.0000/0.00
    execution time (avg/stddev):   59.7967/0.00
```

As always, it's a good idea to try to match as best as possible the disk IO activity for our application. We have some flexibility here
with additional options:

-   `--file-num` number of files [128]
-   `--file-block-size` block size [16384]
-   `--file-total-size` total size  [2G]
-   `--file-test-mode` test mode: seqwr, seqrewr, seqrd, rndrd, rndwr, rndrw
-   `--file-io-mode` file operations mode: sync,async,mmap [sync]
-   `--file-async-backlog` number of asynchronous requests per thread [128]
-   `--file-extra-flags` list of additional flags to use to open files: sync,dsync,direct
-   `--file-fsync-freq` fsync() every N requests [100]
-   `--file-fsync-all` fsync() after each write [off]
-   `--file-fsync-end` fsync() at the end of test [on]
-   `--file-fsync-mode` method for sync: fsync, fdatasync [fsync]
-   `--file-merged-requests` max I/O request to merge [0]
-   `--file-rw-ratio` reads/writes ratio for combined test [1.5]

As an example, for a system destined to run a MySQL server we could try something like this.

```nil
# a test simulating MySQL file activity
sysbench fileio run --threads=8 --file-extra-flags=direct --file-test-mode=rndrw --file-num=10 --file-block-size=1M --file-block-size=16K
```

After running our tests, we need only to remove the work files with _cleanup_

```nil
-> sysbench fileio cleanup --file-num=10

sysbench 1.0.15 (using system LuaJIT 2.0.5)

Removing test files...
```


## Testing Mutexes

This benchmark is intended to test the speed for mutex locks (mutex stands for "mutual exclusion").
Which play an important role in multithreading. It simulates high concurrency, with threads acquiring and releasing locks all the time.

Sysbench creates an initial pool of `--mutex-num` mutexes, then it starts the threads, which iterate over an empty loop, every `--mutex-loops` the thread will
grab one random mutex from the pool, modify a global variable, and release it. Each event will acquire and release the mutexes until the `--mutex-locks` value is reached.

Here `--time` or `--events` are completely ignored. Sysbench always runs one event per thread.

```nil
-> sysbench mutex run --threads=10
sysbench 1.0.15 (using system LuaJIT 2.0.5)

Running the test with following options:
Number of threads: 10
Initializing random number generator from current time


Initializing worker threads...

Threads started!


General statistics:
    total time:                          0.8845s
    total number of events:              10

Latency (ms):
         min:                                  802.84
         avg:                                  855.55
         max:                                  873.81
         95th percentile:                      877.61
         sum:                                 8555.51

Threads fairness:
    events (avg/stddev):           1.0000/0.00
    execution time (avg/stddev):   0.8556/0.02
```


## Testing Threads

Here we have a test for the CPU scheduler. It can simulate high concurrency conditions, where multiple threads
compete for mutexes.

Each thread will take `--thread-locks` mutexes and yield the CPU. This causes the thread to stop running and is placed on the run queue by the scheduler.
Once the thread is again scheduled to run, the mutexes are released.

A single event will perform these actions `--thread-yields` times, so the higher this number, the higher the concurrency placed on each mutex,
and the lower the number of events per second.

```nil
-> sysbench threads run --threads=4 --thread-yields=1000 --thread-locks=10
sysbench 1.0.15 (using system LuaJIT 2.0.5)

Running the test with following options:
Number of threads: 4
Initializing random number generator from current time


Initializing worker threads...

Threads started!


General statistics:
    total time:                          10.0005s
    total number of events:              50754

Latency (ms):
         min:                                    0.50
         avg:                                    0.79
         max:                                   14.37
         95th percentile:                        0.81
         sum:                                39980.48

Threads fairness:
    events (avg/stddev):           12688.5000/54.38
    execution time (avg/stddev):   9.9951/0.00
```


## Related Links

-   sysbench's github: <https://github.com/akopytov/sysbench>


## What's Next? 

Whew, that was a longer post than I intended and to think I only covered a part of it all.

There is still more to say about sysbench, check the [second part](./sysbench-guide-2) where I deal with databases, so the fun is just starting.

So long.

Tomas
