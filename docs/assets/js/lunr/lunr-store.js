var store = [{
        "title": "Welcome, welcome & welcome",
        "excerpt":"Hey! Did I say welcome already? Glad you’re here. So, about blogging: three things moved me to start doing it. Number one, I’ve been turning in essays during my Portuguese classes, every week. Right now I’m on vacation and feeling the writing bug. Number two, learning. For me, experience and...","categories": [],
        "tags": [],
        "url": "/post/welcome",
        "teaser": null
      },{
        "title": "A guide to vmstat and friends",
        "excerpt":"A getting started guide for vmstat, iostat, mpstat and pidstat. vmstat Once I figured out how vmstat works, I found that I almost could no longer live without it, it’s that good. Fortunately it’s available everywhere, so I don’t. There are many versions around, both for Linux and Unix. vmstat...","categories": [],
        "tags": ["linux","unix","monitoring"],
        "url": "/post/vmstat-guide",
        "teaser": null
      },{
        "title": "System Monitoring with Sar",
        "excerpt":"sar is part of the sysstat project, a suite of programs for system monitoring. With sar, we can log system activity, build performance reports and even make plots. sar is available on Linux, Solaris, AIX and HP-UX. We can choose to run sar automatically, as an unattended script. Or interactively...","categories": [],
        "tags": ["guides","monitoring","linux","unix"],
        "url": "/post/sar-guide",
        "teaser": null
      },{
        "title": "MySQLSlap (part 1)",
        "excerpt":"There are loads of ways to benchmark MySQL. mysqlslap was, I believe, one of the first official tools for this. It’s bundled with the client tools for MySQL and MariaDB, so you probably already have it installed. In this post I’ll cover the basics and the auto generate sql mode,...","categories": [],
        "tags": ["databases","mysql","guides"],
        "url": "/post/mysqlslap-guide-1",
        "teaser": null
      },{
        "title": "MySQLSlap (part 2)",
        "excerpt":"This is the second part of my mysqlslap guide, you can read the first part mysqlslap uses the same connection parameters as the normal mysql client, so --host --port --socket --username --password work. In the examples below the parameters will be omitted for brevity’s sake. The Query Mode Query mode...","categories": [],
        "tags": ["databases","mysql","guides"],
        "url": "/post/mysqlslap-guide-2",
        "teaser": null
      },{
        "title": "Benchmarking with sysbench",
        "excerpt":"Why, When, How? Benchmark shows the difference between should and does. Coupled with monitoring it’s a great tool to identify bottlenecks. As to when: whenever we can, as long as the system is production. A good benchmark will stress the server so we don’t want users affected. Right after provisioning...","categories": [],
        "tags": ["linux","unix","guides"],
        "url": "/post/sysbench-guide-1",
        "teaser": null
      },{
        "title": "Sysbench for databases",
        "excerpt":"This is my second part of the sysbench guide, I’ll cover here some basic benchmarks for databases. Feel free to check my first part for an introduction. Connecting to the DB First things first, we’ll need a test database. We’ll stick to the default “sbtest”, so go ahead and create...","categories": [],
        "tags": ["databases","mysql","psql","guides"],
        "url": "/post/sysbench-guide-2",
        "teaser": null
      },{
        "title": "Unused Index cleanup",
        "excerpt":"Fixing a query by finding the right index feels great, as if by magic, things are blazing fast again. But indexes, like everything in life, needs balancing. As things inevitably change, some indexes will be left abandoned and unused. What happens then? Well, the database engine must keep them updated...","categories": [],
        "tags": ["databases","mysql","tuning"],
        "url": "/post/unused-index-cleanup",
        "teaser": null
      },{
        "title": "The Cost of Idle Indexes",
        "excerpt":"The last few days I’ve been cleaning up indexes. This entails removing duplicate, unused or redundant indexes. There were quite a lot of indexes, so it was hard work. I knew why this was important to do: as the table changes, indexes need to be kept updated, less indexes means...","categories": [],
        "tags": ["databases","mysql","benchmarks"],
        "url": "/post/cost-of-idle-indexes",
        "teaser": null
      },{
        "title": "A Container for My Databases",
        "excerpt":"Who doesn’t like containers? Anyone doesn’t like to have most of the benefits of virtual machines with much, much less overhead? They’ve been around since forever (anyone still remember chroot?) but only in recent years their popularity boomed, mainly due to cloud computing, I’m sure. I’ve been running databases in...","categories": [],
        "tags": ["docker","mysql","databases","benchmarks"],
        "url": "/post/a-container-for-my-dbs",
        "teaser": null
      },{
        "title": "Making the most out of Docker",
        "excerpt":"Some options that might increase performance, some that don’t. Network Containers get connected to a bridge network by default. A software bridge that allows communication between containers running on the same host &amp; bridge. We can also create and use custom bridges, to create isolated groups of containers. To allow...","categories": [],
        "tags": ["docker","mariadb","linux","benchmarks"],
        "url": "/post/docker-perf-tips",
        "teaser": null
      },{
        "title": "Case study: MariaDB ColumnStore",
        "excerpt":"A recent project I worked on provided an opportunity to work with MariaDB ColumnStore. The Product The product is a business intelligence application. Its main view, a very comprehensive dashboard with an abundance of counters, showing all operational aspects: from server status, database backups, support tickets and SLA to datacenter...","categories": [],
        "tags": ["column-databases","mariadb","case-study"],
        "url": "/post/case-mariadb-columnstore",
        "teaser": null
      },{
        "title": "10 Vim Plugins for Writers",
        "excerpt":"I still remember the first time I came in contact with Vim; it was during my very first job. It was a part-time gig in a government office. A few months in, they decided to go open-source full in. Out the window went Windows and in came Linux. At the...","categories": [],
        "tags": ["productivity","writing","vim"],
        "url": "/post/vim-for-writers",
        "teaser": null
      },{
        "title": "7 Minikube Tips",
        "excerpt":"I love my Arch Linux, which I’ve been using it for years, more than I care to count. But sometimes I believe that all of us Linux users, deep in our heart of hearts, have some Windows- or Mac-only software that we covet. For me, that software is Docker Desktop;...","categories": [],
        "tags": ["kubernetes","minikube","kubernetes"],
        "url": "/post/7-minikube-tips",
        "teaser": null
      },{
        "title": "What Got Me Writing",
        "excerpt":"When I started freelancing, I never imagined I would end up writing for a living. Never in a hundred years. Yet, I’ve been doing it full-time for almost a year now. I got interested in freelancing because I wanted to try something different. I needed a break from the office...","categories": [],
        "tags": ["writing"],
        "url": "/post/what-got-me-writing",
        "teaser": null
      },{
        "title": "React Native and Expo",
        "excerpt":"I’ve started my career as a backend developer. Pretty early on, I had to get familiar the console and chose Vim as my main editor. Afterwards, as a sysadmin and dba I lived in ssh sessions. It’s great, I love it, but when it’s time to switch to the frontend...","categories": [],
        "tags": ["development"],
        "url": "/post/react-native-and-expo",
        "teaser": null
      },{
        "title": "Talk: Technical writing in English",
        "excerpt":"I gave a talk about technical writing at nerdear.la, a bilingual convention about technology and people that took place October 2020 in Argentina. The Talk The slides are in English, the talk is in Spanish. At the end of the talk, I’ll be answering questions. Slides You may download the...","categories": [],
        "tags": ["talks","nerdearla","slides"],
        "url": "/post/talk-nerdearla-2020",
        "teaser": null
      },{
        "title": "Programming humans",
        "excerpt":"While working on the slides for the talk I gave a few weeks ago, it occurred to me that writing and coding have more than a few things in common. I originally planned to speak a bit about that but had to take it out for lack of space. I’ll...","categories": [],
        "tags": ["writing"],
        "url": "/post/programming-humans",
        "teaser": null
      },{
        "title": "Always use ImagePullSecrets",
        "excerpt":"Docker Hub introduced rate limits for image pulls earlier this month. Being the default registry for Docker images, this is one of the biggest in the ecosystem in the last few years, and it will affect not only Docker users but also Kubernetes setups. The limits The new limits affect...","categories": [],
        "tags": ["kubernetes","docker"],
        "url": "/post/always-use-imagepullsecrets",
        "teaser": null
      },{
        "title": "My Writing Process",
        "excerpt":"I tend to have a more suis generis process for writing technical documents. With this I mean I don’t have too much of a structure when it’s time to type. I usually do an outline first (but not always) and then write, edit, cut, redit, recut until I have something...","categories": [],
        "tags": ["writing"],
        "url": "/post/my-writing-process",
        "teaser": null
      }]
