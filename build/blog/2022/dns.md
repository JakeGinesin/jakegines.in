dns -> Domain Name System

I wrote, published, and presented a paper on the Domain Name System, a critical part of the internet stack. Find the PDF of this paper [here](/assets/DNS.pdf).

*maybe I'll upload the full presentation to YouTube eventually. I'll see.*

### Abstract:
The Domain Name System (DNS) is part of critical internet infrastructure, as the DNS is invoked whenever a remote server is accessed (an URL is visited, an API request is made, etc.) by any application. DNS queries are served in hierarchical manner, with most queries served locally from cached data, and a small fraction propagating to the top of the hierarchy – DNS root name servers. Our research aims to provide a comprehensive, longitudinal characterization of DNS queries received at B-Root over ten years. We sampled and analyzed a 28-billion-query large dataset from the ten annual “Day in the Life of the Internet (DITL)” experiments, from 2013 through 2022. We sought to identify and quantify unexpected DNS queries, establish longitudinal trends, and compare our findings with published results of others. We found that unexpected query traffic increased from   39.57% in 2013 to 67.91% in 2022, with 36.55% of queries being priming queries. We also observed growth and decline of Chromium-initiated, random DNS queries. Finally, we analyzed the largest DNS query senders and established that most of their traffic consists of unexpected queries. 

### Index Terms
Domain Name System, DNS root, security, DITL, measurement

### Publication
Presented at [9th IEEE/ACM International Conference on Big Data Computing, Applications and Technologies](https://bdcat-conference.org/) and published by IEEE. 
