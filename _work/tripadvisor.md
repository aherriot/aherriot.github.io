---
title: Tripadvisor
layout: default
order: 1
---

### 2019 to 2020

I was a full stack software developer on the Restaurants B2B team creating products for restaurant owners around the globe.

I work with React, GraphQL, Java, and PostgreSQL to create responsive web applications along with modular and scalable microservices. Additionally, we use technologies such as Hive, Snowflake, and Presto for data warehousing and analysis.

## Projects

There was a pre-existing video feature where owners can publish a slideshow of their restaurant but it was only visible on the restaurant review page. I exposed this on the restaurant search results pages, which receives the highest volume of traffic on the Tripadvisor website. I had to create a solution to expose this information that would scale to tens of millions of requests. That meant querying this data efficiently with cacheing in the right places. As a full stack developer, I also wrote the CSS and HTML to work across every browser (including IE) and platform and setup tracking metrics for feature evaluation.

![Tripadvisor Logo](/static/tripadvisor1.png)

# Pandemic Microservice

At the start of the pandemic, there were many places where restaurants were closed or they switched take-out only. I rapidly created a microservice in two days to provide this information and the data was populated by research from technical recruiters who could no longer fulfill their normal duties.

The microservice could be queried to determine the state of a restaurant, city, state, country and surfaced this information in the UI. Soon into the pandemic, it became apparent that we would lose a lot of customers. In order to prevent churn, I wrote a script that would calculate every customer's total bill and apply a 100% discount to set their bill to zero. This microservice and discount script was original intended for the Restaurants Business Unit, but it was adopted across the organization.

# Discount Codes

When I joined TripAdvisor, they had recently migrated to a new billing system. Our microservices would contact the billing service which would create subscriptions for our customers. Often these subscriptions had discounts, but the discounts were prematurely dropping off the accounts. I invested and fixed the creation of discounts so that they lasted the expected amount of time.

I also implemented a full stack feature that would query for eligible discount codes on the shopping cart page and automatically add discounts if they were eligible.

# Fixed Pricing

Prices for TripAdvisor restaurant products are adjusted daily to reflect the value that they may offer to the customer. Key Accounts Salespeople needed a way to fix a price for a product so that they could negotiate deals with large customers. I create a mechanism so that salespeople could add locations and fixed prices to. I modified the downstream ETL jobs to ingest this spreadsheet and use the data to set a fixed price instead of the normal calculation.

### Quotes from Performance Review

> "Andrew is strongest working on the front end in React. He came to Tripadvisor as the resident expert at his previous company and it shows. He is very comfortable solving complex problems within the front end and writing elegant fixes that fully utilize the React library..."

> "He's got a great nose for solving problems and making sure they are fixed all the way through... When asking Andrew to investigate a bug, you can be sure he'll find the root cause and not just the surface manifestation."

> "Andrew also communicates well and can articulate technical concepts such as [the billing system]... and convey the appropriate information to stakeholders inside and outside of our team. He truly embraces #betterTogether (company core value) and is very active in our team demo meetings sharing new features he's worked on. On a day to day basis he is clear about the projects he's working on, calls out when he's blocked, and works well with others on the team."
