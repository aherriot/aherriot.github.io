---
title: Log Viewer
order: 1.5
stack: [Ruby on Rails, PostgreSQL]
links:
  - label: github.com/aherriot/log-viewer
    url: https://github.com/aherriot/log-viewer
summary: A log analytics and search dashboard showing how far you can get on a well-indexed Postgres table alone — no search engine or analytics database required.
---

A log analytics and search dashboard built on Ruby on Rails and PostgreSQL — a working demonstration of how far you can get on nothing but a well-indexed Postgres table, no search engine or analytics database required.

It queries a table of 1,000,000+ synthetic log events by free-text search, time range, log level, HTTP status, user ID, and IP address or CIDR subnet — all sortable, all paginated, all through plain SQL against Postgres.

### What this demonstrates

Every filter in the UI is backed by a purpose-picked index, not a generic catch-all:

| Filter | Index type | Why this one |
|---|---|---|
| Full-text search over log messages | GIN on a generated `tsvector` column | `websearch_to_tsquery` + `ts_rank` for relevance-ordered results; a plain `LIKE '%...%'` can't use an index at all |
| Time range | BRIN | Near-zero storage cost on an append-only, time-ordered table — a few kilobytes indexing a million rows |
| Recent-first default listing | B-tree on `created_at DESC` | BRIN can filter ranges but can't serve `ORDER BY ... LIMIT`; a B-tree alongside it answers "latest 50" without touching the rest of the table |
| IP address / CIDR subnet | GiST with `inet_ops` | Native network-containment operators (`<<=`) — a plain string index couldn't understand "is this address in this /24" |
| `metadata` JSON blob | GIN (`jsonb_ops`) | Containment queries (`@>`) into semi-structured per-request metadata without a rigid schema |
| `user_id` + `status` | Composite covering index (`INCLUDE`) | Index-only scans — the query is answered entirely from the index, zero heap fetches |
| Log level, status, HTTP status | B-tree | Cheap equality filtering and sorting on low-cardinality columns |

The result was measured, not assumed — every choice was validated with `EXPLAIN (ANALYZE, BUFFERS)` against the real 1M+ row table:

* IP lookup: full table scan → 0.23ms (about 450x faster)
* Covering index scan: 0.32ms with zero heap fetches
* Default "recent logs" listing: full scan + sort → 0.14ms via index-only backward scan
* Full-text search beats a naive substring scan while supporting relevance ranking

The UI treats query performance as a first-class concern too: every keystroke-driven filter debounces before hitting the database, format-sensitive fields (IP, user ID) wait for you to finish rather than validating half-typed input, and there's no `SELECT COUNT(*)` anywhere in the pagination path — "is there a next page" is answered by fetching one extra row instead of counting a large filtered result set.

### Features

* Full-text search with relevance ranking
* Filter by time range, log level, HTTP status, user ID, IP/CIDR, and status — independently or combined
* Sort by any indexed column, ascending or descending
* Per-field and clear-all filter resets
* Real empty, error, and loading states — invalid input surfaces as a clear message, not a silent empty result or a stack trace
* A JSON API alongside the HTML UI, for every filter and sort combination

Built with Ruby on Rails 8 (server-rendered with Turbo and Stimulus, no SPA framework) and PostgreSQL 18 — BRIN, GIN, GiST, B-tree (plain, composite, and covering), native enum types, generated columns, and `tsvector` full-text search. Zero external search or analytics infrastructure; everything runs on Postgres alone.
