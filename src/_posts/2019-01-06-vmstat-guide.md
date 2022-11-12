---
title: "A guide to vmstat and friends"
date: "2019-01-06T21:12:00-03:00"
permalink: /post/vmstat-guide
tags: linux unix monitoring
image: /images/linux.jpg
excerpt: "A getting started guide for vmstat, iostat, mpstat and pidstat."
excerpt: A getting started guide for vmstat, iostat, mpstat and pidstat.
---

![](/images/linux.jpg)

A getting started guide for vmstat, iostat, mpstat and pidstat.

## vmstat

Once I figured out how vmstat works, I found that I almost could no longer live without it, it's that good.
Fortunately it's available everywhere, so I don't. There are many versions around, both for
Linux and Unix.

vmstat does a little bit of everything: memory, processes, I/O, swap, disks, CPU.

The basic syntax is:

```text
vmstat [options] <interval> <count>
```

vmstat prints a new update every _interval_ seconds, stopping after _count_ lines.
If no count is supplied, vmstat continues until killed. If there isn't any _interval_, only 1 line is printed.

```nil
# 1 update per second, 5 updates
-> vmstat 1 5
procs   -----------memory----------   --swap-    ---io--- -system-- ------cpu-----
 r  b   swpd    free   buff  cache    si   so    bi    bo   in   cs us sy id wa st
 4  0      0 4098084 375068 3462944    0    0    34    25  340  320  8  3 89  0  0
 1  0      0 4098184 375068 3463264    0    0     0     0 1263 3198  4  3 93  0  0
 0  0      0 4098436 375068 3462924    0    0     0     0 1141 2999  3  2 95  0  0
 0  0      0 4097736 375076 3462916    0    0     0     0 2166 4414  5  4 92  0  0
 0  0      0 4096476 375076 3462916    0    0     0     0 1103 3130  3  3 94  0  0
```

The values in the very first line are averages since boot, thus it usually stands out as different than the rest.

All values, with the exception of memory and processes, are average _rates_ from the previous update.
Memory and processes (the first 6 columns) are always instantaneous values.
Memory is shown in KBs but `-S` changes units, e.g. `-S M` for MBs.

If your version of vmstat supports `-w`, use it,  makes the table wider and easier to read.

So what does each column mean?

| column | meaning                                      | unit       |
|--------|----------------------------------------------|------------|
| r      | number of processes running                  | -          |
| b      | number of processes sleeping                 | -          |
| spwd   | swap memory used                             | K          |
| free   | amount of idle memory                        | K          |
| buff   | memory used for buffers                      | K          |
| cache  | memory used for cache                        | K          |
| si     | swaps per second from disk to memory         | 1/s        |
| so     | swaps per second from memory to disk         | 1/s        |
| bi     | blocks per second received from block device | blocks/s   |
| bo     | blocks per second sent to block device       | blocks/s   |
| in     | interrupts per second                        | 1/s        |
| cs     | context switches per second                  | 1/s        |
| us     | CPU user time                                | % of total |
| sy     | CPU system time                              | % of total |
| id     | CPU idle time                                | % of total |
| st     | CPU time stolen from Virtual Machine         | % of total |

A few guidelines to read the values:

-   check first _si_ and _so_ for swapping activity, this is _the_ performance killer
-   check that memory allocation makes sense for the workload
-   consistent high _us_ indicate possible CPU bound load
-   consistent high _wa_ indicate possible I/O bound load
-   if this is a VM and _st_ (steal) is consistently high for long, the host system could be overloaded or the VM under-provisioned

`-d` gets us per-device I/O counters since boot. With `-p <PART>` we get the same for an specific parition.

```text
-> vmstat -d 1
disk- ------------reads------------ ------------writes----------- -----IO------
       total merged sectors      ms  total merged sectors      ms    cur    sec
sda   154968   4762 5471678   52614 123981  67290 4139296   68873      0     45
sda   154968   4762 5471678   52614 123985  67305 4139440   68876      0     45
sda   187412   5295 5735630   57902 126252  67704 5888256   80177      0     51
...
```

Columns are read like this:

| column  | meaning                                   |
|---------|-------------------------------------------|
| total   | total number of reads / writes            |
| merged  | merged requests (N requests into one I/O) |
| sectors | number of sectors read / written          |
| ms      | milliseconds spent reading / writing      |
| cur     | number of I/O operations running          |
| s       | seconds spent for I/O                     |

We can also access a detailed cache utilization report with `-m`, but it may require root permissions to work.

```nil
> vmstat -m
Cache                            Num  Total   Size  Pages
ecryptfs_inode_cache            1544   1564    960     17
ecryptfs_file_cache              256   1024     16    256
ecryptfs_auth_tok_list_item       19     76    832     19
nf_conntrack_expect                0      0    216     18
nf_conntrack                     101    200    320     25
fuse_request                      80     80    400     20
fuse_inode                        42     76    832     19
ext4_groupinfo_4k               1716   1736    144     28
ext4_inode_cache              325004 327150   1080     30
ext4_allocation_context          128    128    128     32
ext4_io_end                      256    320     64     64
ext4_extent_status            156920 156978     40    102
mbcache                          294    438     56     73
...
```

And the columns are:

| column | meaning                              |
|--------|--------------------------------------|
| cache  | the cache name                       |
| num    | active object count                  |
| total  | total object count                   |
| size   | size per object                      |
| pages  | pages with one or more active object |

vmstat also has these one-shot views:

-   `-s` system statistics
-   `-D` all disks summary
-   `-f` forks


## iostat

iostat shows the combined CPU and disk I/O statistics. As with vmstat, it can work with _interval_ and _count_

```nil
# one update per second
-> iostat 1
Linux 4.19.8-arch1-1-ARCH (ix) 	12/24/2018 	_x86_64_	(4 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
          12.14    0.03    5.66    0.03    0.00   82.14

Device             tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
sda               4.41        29.11        49.44    3409859    5790640

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           5.56    0.00    3.79    0.00    0.00   90.66

Device             tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
sda               0.00         0.00         0.00          0          0
...
```

Again, the first report shows averages since boot (we can omit it with `-y`). While the following shows rates since the previous interval.

We can choose to only see cpu with `-c` or disk with `-d`. Also `-x` shows extended I/O statistics and `-m` changes units to MB.
`-h` changes into an easier to read (for humans) format.


## mpstat

mpstat shows (more) detailed CPU statistics. We get vmstat's counters plus some. Same deal with the
_interval_ and _count_

```nil
# 1 update per second
-> mpstat 1
Linux 4.19.8-arch1-1-ARCH (ix) 	12/24/2018 	_x86_64_	(4 CPU)

06:48:41 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
06:48:42 PM  all    7.85    0.00    3.04    0.00    0.25    0.51    0.00    0.00    0.00   88.35
06:48:43 PM  all   10.08    0.00    4.79    0.00    1.01    0.00    0.00    0.00    0.00   84.13
06:48:44 PM  all    7.25    0.00    5.25    0.00    0.75    0.50    0.00    0.00    0.00   86.25
06:48:45 PM  all    9.07    0.00    3.78    0.25    1.01    0.50    0.00    0.00    0.00   85.39
```

First line is, yet again, averages since boot.

We can choose to only show activity for some CPUs with `-P`, e.g. `-P 1,3`

There are additional views: `-I ALL` shows all CPU interruptions, `-n` shows CPU statistics based on NUMA placement nodes
(use `-N` to indicate which nodes to report). There is even a JSON output with `-o JSON`

mpstat shows general CPU utilization, to track an individual process there is _pidstat_


## pidstat

This one has some similarities with _top_. Every _interval_ pidstat prints what processes were running.
We can also track particular processes with `-p`. Threads are shown with `-t`.

```nil
# track process CPU activity, thread view
-> pidstat -t -p 25809 1
Linux 4.19.8-arch1-1-ARCH (ix) 	12/29/2018 	_x86_64_	(4 CPU)

11:00:58 PM   UID      TGID       TID    %usr %system  %guest   %wait    %CPU   CPU  Command
11:00:58 PM   980     25809         -    0.22    0.07    0.00    0.00    0.28     1  mysqld
11:00:58 PM   980         -     25809    0.00    0.00    0.00    0.00    0.00     1  |__mysqld
11:00:58 PM   980         -     25811    0.00    0.00    0.00    0.00    0.00     0  |__mysqld
11:00:58 PM   980         -     25812    0.00    0.00    0.00    0.00    0.00     3  |__mysqld
11:00:58 PM   980         -     25820    0.00    0.00    0.00    0.00    0.00     1  |__mysqld
11:00:58 PM   980         -     25834    0.02    0.01    0.00    0.01    0.02     3  |__mysqld
11:00:58 PM   980         -     25835    0.02    0.00    0.00    0.01    0.02     3  |__mysqld
11:00:58 PM   980         -     25836    0.01    0.00    0.00    0.01    0.02     2  |__mysqld
11:00:58 PM   980         -     25837    0.01    0.00    0.00    0.01    0.01     0  |__mysqld
```

`-r` shows memory per process, which gives a quick way to check for memory leaks

```nil
# track process memory activity
-> pidstat -r -p 27766 1
Linux 4.19.8-arch1-1-ARCH (ix) 	12/30/2018 	_x86_64_	(4 CPU)

09:42:59 PM   UID       PID  minflt/s  majflt/s     VSZ     RSS   %MEM  Command
09:43:00 PM  1000     27766      0.00      0.00  689680   17128   0.15  mysqld
09:43:01 PM  1000     27766      0.00      0.00  689680   17128   0.15  mysqld
09:43:02 PM  1000     27766      0.00      0.00  689680   17128   0.15  mysqld
09:43:03 PM  1000     27766      0.00      0.00  689680   17128   0.15  mysqld
Average:     1000     27766      0.00      0.00  689680   17128   0.15  mysqld
```

pidstat can start a program with `-e` and show its activity during the execution.

Besides CPU, pidstat can also show per-process I/O activity

```nil
# per-process I/O
-> pidstat -d 1 5
Linux 4.20.0-arch1-1-ARCH (ix) 	01/06/2019 	_x86_64_	(4 CPU)

04:04:53 PM   UID       PID   kB_rd/s   kB_wr/s kB_ccwr/s iodelay  Command
04:04:54 PM  1000     14423    276.00 197888.00      0.00       1  dd
04:04:55 PM  1000     14423      0.00 218880.00      0.00       0  dd
04:04:56 PM  1000     14423      0.00 224664.00      0.00       0  dd
04:04:57 PM  1000     14423      0.00 230428.00      0.00       0  dd
04:04:59 PM  1000     14423      0.00 192520.00      0.00       0  dd
Average:     1000     14423     46.00 207763.33      0.00       0  dd
```

If pidstat prints negative values, it means it doesn't have enough permissions to access the process.
Try switching to the user running the process (or as root, that should always).

pidstat supports all these views:

-   `-d`  I/O statistics
-   `-u`  CPU statistics
-   `-R`  process priority
-   `-r`  memory utilization
-   `-s`  stack utilization
-   `-t`  thread statistics
-   `-w`  task switching
-   `-v`  file descriptor


## Putting It All Together 

These programs complement each other. How would all work together?
Let's say we want to find why my machine is running slow.

The first thing we can check is vmstat:

```nil
-> vmstat 1
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0 12 773184 3782540 161528 3176304    0    0  1184 38944 2888 9877 20  5  1 74  0
 2  9 773184 3745748 161528 3213272    0    0  2660 36868 2876 7426 18  7  1 73  0
 0 11 773184 3630836 161540 3326616    0    0  2688 43052 2959 7064 23  5  1 70  0
 2 11 771648 2297092 161792 4873416    0    0  2672 40960 3034 7547 23  6  2 69  0
 1 11 771648 2255008 161796 4915000    0    0  2088 38912 2939 7370 24  6  2 67  0
 0 11 771648 2142616 161796 4992940    0    0  2148 38916 2976 8061 31  6  1 63  0
 1 10 771648 2100532 161804 5034252   20    0  1608 41012 3919 9665 34 11  1 54  0
 0 11 819776 149836 157540 6949188    0    0  1920 12292 2702 5527  6  4  0 90  0
```

What can you see? A consistent high number of sleeping (b), memory utilization going up, no swapping... that's good,
disks are being written.

Hmm, a consistently high CPU wait (wa).
There are indications of an I/O bottleneck, the CPUs are waiting for disks requests.

What does mpstat say?

```nil
mpstat 1
Linux 4.20.0-arch1-1-ARCH (ix) 	01/06/2019 	_x86_64_	(4 CPU)

01:34:49 PM  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
01:34:50 PM  all   24.54    0.00    4.22   68.87    1.06    1.06    0.00    0.00    0.00    0.26
01:34:51 PM  all   19.05    0.00    3.44   74.87    1.06    0.53    0.00    0.00    0.00    1.06
01:34:52 PM  all   19.37    0.00    3.14   74.61    0.79    1.05    0.00    0.00    0.00    1.05
01:34:54 PM  all   22.08    0.00    3.12   62.86    0.52    1.04    0.00    0.00    0.00   10.39
```

Again there it is, a high iowait. There is something funny going on with the disks.

Let's try iostat:

```nil
iostat -x 1 -y
Linux 4.20.0-arch1-1-ARCH (ix) 	01/06/2019 	_x86_64_	(4 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.00    0.00    0.00    0.00    0.00    0.00

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda             54.00    0.00   2532.00      0.00     0.00     0.00   0.00   0.00    0.57    0.00   0.02    46.89     0.00   0.06   0.30
dm-0            54.00    0.00   2532.00      0.00     0.00     0.00   0.00   0.00    0.50    0.00   0.03    46.89     0.00   0.24   1.30
sdd              1.00  347.00      4.00  39512.00     0.00     0.00   0.00   0.00   53.00    5.42   0.99     4.00   113.87   2.86  99.40

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
          23.90    0.00    6.49   68.31    0.00    1.30

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda             69.00    0.00   2636.00      0.00     2.00     0.00   2.82   0.00    0.58    0.00   0.06    38.20     0.00   0.29   2.00
dm-0            71.00    0.00   2636.00      0.00     0.00     0.00   0.00   0.00    1.03    0.00   0.07    37.13     0.00   0.32   2.30
sdd              0.00  340.00      0.00  38672.00     0.00     0.00   0.00   0.00    0.00    5.84   0.99     0.00   113.74   2.92  99.30

```

Quite a lot of writes on the _sdd_ device. Even worse, the %util is reaching 100%, the device is saturated
(%util is only meaningful for spinning disks, RAID or SDD have different capacities)

So the problem seems to be related with sdd.

Can we check what processes are doing I/O?

```nil
sudo pidstat -d 1
Linux 4.20.0-arch1-1-ARCH (ix) 	01/06/2019 	_x86_64_	(4 CPU)

01:36:25 PM   UID       PID   kB_rd/s   kB_wr/s kB_ccwr/s iodelay  Command
01:36:26 PM     0      2546      3.81      0.00      0.00     100  kworker/u8:3+flush-8:48
01:36:26 PM     0      2799      0.00     38.10      0.00      48  jbd2/sdd1-8
01:36:26 PM   980      3435   1474.29  36323.81      0.00       0  mysqld

01:36:26 PM   UID       PID   kB_rd/s   kB_wr/s kB_ccwr/s iodelay  Command
01:36:27 PM     0      2546      0.00      0.00      0.00      99  kworker/u8:3+flush-8:48
01:36:27 PM   980      3435   2524.00  35096.00      0.00       0  mysqld
```

We find a mysql server, a kernel thread flushing data and jbd2 (filesystem journal).

Aha! we found what has been causing all that troublesome I/O. To continue investigating we would need to get into the database, but
this post is getting way too long already. If you are curious, the root cause was some bad queries that were creating temporary tables.


## Related Links 

-   manpages
    -   vmstat: <https://linux.die.net/man/8/vmstat>
    -   iostat: <https://linux.die.net/man/1/iostat>
    -   mpstat: <https://linux.die.net/man/1/mpstat>
    -   pidstat: <https://linux.die.net/man/1/pidstat>


## What's Next?

How about some long term analysis? Something that can work unattended and do reports? Sounds nice?

Good, I guess [next article](./sar-guide) will be about **sar**.

So long.

Tomas
