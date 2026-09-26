# Trydot ERP integration contract - staging implementation

Status: Implemented in the Phase 2 branch for staging validation. Do not expose
the production endpoint until Trydot confirms the payload and completes the
acceptance tests below.

## Working assumption

The earlier integration clarification refers to ERPNext Job Opening data. The
recommended initial integration is ERPNext/Trydot pushing job-opening updates
to the MQS website. Website enquiries, job applications and other leads are not
included unless both teams explicitly add them to scope.

## Staging endpoints

`POST /api/integrations/erpnext/job-openings/sync`

`DELETE /api/integrations/erpnext/job-openings/{externalId}`

`GET /api/jobs`

`GET /api/jobs/{id-or-externalId}`

The final hostname will be the approved Phase 2 Vercel preview URL during
testing. Production must use the MQS production domain only after acceptance.

The first two endpoints are private server-to-server operations. The two
`/api/jobs` endpoints are public, read-only endpoints and return only active
vacancies intended for the Careers page.

## Authentication

Use a server-to-server bearer token stored as an environment variable. HTTPS is
mandatory. Do not place the token in browser code, email screenshots, source
control or URL parameters.

Header:

```text
Authorization: Bearer <ERPNEXT_SYNC_TOKEN>
Content-Type: application/json
```

## Supported request shapes

The sync endpoint accepts one job, `{ "job": { ... } }`, an array of jobs, or
the batch shape shown below. A batch may contain at most 100 jobs and the
request body may not exceed 256 KB.

```json
{
  "jobs": [
    {
      "externalId": "JOB-0001",
      "title": "Mechanical Design Engineer",
      "department": "Engineering",
      "location": "Hyderabad",
      "employmentType": "Full-time",
      "description": "Approved public job description",
      "responsibilities": "Public responsibilities",
      "qualifications": "Public qualifications",
      "experience": "2-5 years",
      "openings": 1,
      "openedAt": "2026-09-26T00:00:00Z",
      "closesAt": "2026-10-31T23:59:59+05:30",
      "status": "open",
      "applicationUrl": "https://example.com/apply/JOB-0001",
      "sourceUpdatedAt": "2026-09-26T09:45:00Z"
    }
  ]
}
```

## Status behaviour

- `open`, `active` and `published`: normalized to `open` and visible.
- `closed`, `cancelled`, `canceled`, `filled`, `inactive` and `draft`: retained
  for history but hidden from the public Careers page.
- Updates are idempotent by `externalId` and `sourceUpdatedAt`.
- An update older than the stored `sourceUpdatedAt` is safely skipped.
- `DELETE` performs a soft close; it does not erase the database row.
- A job absent from a payload is not automatically deleted unless Trydot
  confirms that every payload is a complete authoritative snapshot.

Common ERPNext-style aliases are accepted during staging, including `name`,
`job_title`, `department_name`, `job_location`, `employment_type`,
`opening_date`, `closing_date`, `modified` and `number_of_openings`. Trydot must
still provide a real sample payload so the final mapping can be confirmed.

## Successful response

```json
{
  "success": true,
  "synchronized": 1,
  "jobs": [
    {
      "externalId": "JOB-0001",
      "status": "open",
      "published": true,
      "action": "created"
    }
  ],
  "requestId": "server-generated-id"
}
```

Validation errors return a non-2xx response with a safe message and request ID.
Secrets, database information and stack traces are never returned.

## Environment configuration

The staging deployment requires:

- `DATABASE_URL`: staging Neon PostgreSQL connection string.
- `ERPNEXT_SYNC_TOKEN`: long random bearer token shared securely with Trydot.

The token must be configured independently for preview/staging and production.
Do not reuse the staging token in production.

## Required Trydot confirmations

1. Provide one real Job Opening payload from the Trydot staging system.
2. Confirm that Trydot will push changes to the website.
3. Confirm whether website applications must also flow back to ERPNext.
4. Confirm whether a payload is a full snapshot or a set of changes.
5. Confirm the exact status values used by the configured ERPNext instance.
6. Confirm bearer-token support and any IP/domain allow-list requirement.
7. Nominate the Trydot tester and MQS approver.

## Acceptance tests

- A new open job appears on the website.
- Updating a job changes the existing record without duplication.
- Closed, cancelled and filled jobs disappear from the public list.
- Invalid authentication is rejected.
- Missing required fields are reported clearly.
- Replaying the same payload is safe.
- No unpublished or internal ERP fields are exposed publicly.
