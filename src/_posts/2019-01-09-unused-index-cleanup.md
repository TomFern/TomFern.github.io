---
title: "Unused Index cleanup"
date: "2019-01-09T16:15:00-03:00"
permalink: "/post/unused-index-cleanup"
tags: databases mysql tuning

excerpt: "Removing unused indexes for improved performance."
image: /images/database.jpg
---

![](/images/database.jpg)

Fixing a query by finding the right index feels great, as if by magic, things are blazing fast again.

But indexes, like everything in life, needs balancing. As things inevitably change, some indexes will be left abandoned and unused.
What happens then? Well, the database engine must keep them updated regardless, that's wasted I/O. They also take up space. Pruning indexes is
the life of any dba.


## Unused Indexes in MySQL 

Fortunately in MySQL has are two great tools: the _performance\_schema_, which collects all kind of metrics and the _sys_ schema which offers easier-to-read views.

The first thing to do is ensure that performance\_schema is enabled and configured. There is a global configuration setting to enable it, requires restart to take effect.

```text
# my.cnf
# ~~~~~~

[mysqld]
performance_schema=ON
```

```text
-- check if performance_schema is enabled
select @@performance_schema;
```

Then there is the runtime configuration to control what types of events to log. This is quite a complex subject because there is so many knobs to turn.

We'll cheat, we have indexes to delete, no time to be reading manuals. MySQL Workbench has a _Performance Schema Setup_ wizard.

![performance schema setup](/images/performance_schema_setup.png)

![installing the sys schema](/images/sys_installer.png)

Setting the slider to at least _Server Default_ should be enough.

![ cheat mode: enabled](/images/performance_schema_slider.png)


## The Catch

Once everything is set up, we'll find unused indexes in a view.

```sql
select * from sys.schema_unused_indexes
```

The documentation states:

> The [schema\_unused\_indexes](https://dev.mysql.com/doc/refman/8.0/en/sys-schema-unused-indexes.html) View
>
> These views display indexes for which there are no events, which indicates that they are not being used. By default, rows are sorted by schema and table.
>
> This view is most useful when the server has been up and processing long enough that its workload is representative. Otherwise, presence of an index in this view may not be meaningful.

At first glance it seems that we need only to check that the server has been running for some time,
i.e. the performance counters are reset on service restart.

That's not entirely true, because all the counters for a particular table are also reset when any of its indexes are **modified**.
Doing any `alter table [add|remove] index`, marks all the other indexes on that table table as unused.

If you wish to have some fun test it yourself:

```sql
create database super;
create table super.heroes (
  name varchar(45) not null,
  hability varchar(45) not null,
  key(name),
  key(hability)
);
insert into super.heroes values
('the flash','speed'),
('aquaman','fish language'),
('batman','rich'),
('superman','all of them');

-- use the index and check the counters
select name from super.heroes;
select * from sys.schema_unused_indexes;

-- any one of these resets the index usage counters
alter table super.heroes add key name_hability(name,hability);
alter table super.heroes drop key name_hability;
```


## Related Links 

-   performance\_schema quickstart: <https://dev.mysql.com/doc/mysql-perfschema-excerpt/8.0/en/performance-schema-quick-start.html>
-   performance\_schema config: <https://dev.mysql.com/doc/mysql-perfschema-excerpt/8.0/en/performance-schema-runtime-configuration.html>
-   schema\_unused\_indexes: <https://dev.mysql.com/doc/refman/8.0/en/sys-schema-unused-indexes.html>


## A Final Word

Here's my general strategy:

-   Backup the tables, or at the very least export the index definitions (just in case)
-   Ensure that both server has been running for enough time **and** that the table has not been modified recently

```text
show table status from <SCHEMA> where name = <TABLE>
```

-   Save the list of the unused indexes somewhere safe, you'll probably lose it after modifying the table

```text
create table unused_backup as select * from sys.schema_unused_indexes
```

-   Delete the unused indexes

Hope that helps.

Tomas
