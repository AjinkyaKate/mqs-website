# MQS Phase 2 delivery control

Last updated: 26 September 2026

This folder is the working control record for Phase 2. It separates approved
requirements from reference-only material so that prototypes do not silently
become production copy, product claims, or product mappings.

## Delivery dates

- Client inputs due: 28 September 2026
- Five industry pages targeted for completion: 10 October 2026
- Feature freeze: 8 November 2026
- Client review and release buffer: 9–13 November 2026
- Production target: 14 November 2026

All Phase 2 changes must be reviewed on the Vercel staging deployment before
they are merged to the production branch.

## Environments

- Staging: <https://trivexa-test-theta.vercel.app>
- Production: <https://www.mqstechnologies.in>

Both URLs currently respond successfully. A push to `main` deploys production;
Phase 2 work must therefore use a feature branch and its Vercel preview until
approval.

## P0 tracker

| ID | Action | Owner | Status | Exit condition |
| --- | --- | --- | --- | --- |
| P0-01 | Register the four supplied reference files | Trivexa | Done | Filenames and checksums recorded |
| P0-02 | Audit reference structure, interactions, links and content risks | Trivexa | Done | See `reference-audit.md` |
| P0-03 | Compare Phase 2 scope with the current repository | Trivexa | Done | Current-state gaps recorded below |
| P0-04 | Confirm staging and production URLs | Trivexa | Done | Both environments respond successfully |
| P0-05 | Confirm final names and slugs for all five industry pages | MQS | Waiting | Automotive, Aerospace, EMS, Defense and Heavy Engineering approved |
| P0-06 | Supply approved copy and assets for each industry | MQS | Waiting | Every row in `content-asset-matrix.md` is complete |
| P0-07 | Approve component-to-product mappings and final Phase 2 product list | MQS | Waiting | No placeholder or obsolete product name remains |
| P0-08 | Confirm the ERPNext integration contract | ERP vendor + MQS + Trivexa | Awaiting external staging test | Vendor payload, authentication and acceptance tests approved |
| P0-09 | Confirm brochure/flyer inventory | MQS + Trivexa | In progress | Repository inventory is complete; MQS must approve priority and technical content |
| P0-10 | Establish the Phase 2 feature branch/preview workflow | Trivexa | Done | Work is isolated from `main` and produces a review URL |

## Current repository gaps

- `/industries` is currently one overview page. No industry detail routes exist.
- Industries is currently a plain navigation link, not a dropdown.
- The admin area supports enquiries, applications and site images. It has no
  milestones/news management or analytics dashboard.
- The database has no Industry Page, Milestone or White Paper model. The Job
  Opening model and ERPNext synchronization routes are implemented on staging;
  external acceptance testing is pending.
- The blog admin screen is still marked as Phase 2 development.

## Source-of-truth order

When sources disagree, use this order:

1. Written client approval or an updated review tracker.
2. Phase 2 meeting decisions dated 24 September 2026.
3. Current approved production content and product naming.
4. The supplied HTML files, as interaction and layout references only.

Do not copy unverified measurements, compliance claims, awards, product names,
download files or component mappings from a reference prototype into production.
