# Trydot staging test guide

Externally accessible staging deployment:

```text
https://trivexa-test-theta.vercel.app
```

API endpoints:

```text
POST   /api/integrations/erpnext/job-openings/sync
DELETE /api/integrations/erpnext/job-openings/{externalId}
GET    /api/jobs
GET    /api/jobs/{id-or-externalId}
```

This hostname is the stable Production target of the staging-only Vercel
project `trivexa-test`; it is not the live MQS production domain.

Use this guide only after Trivexa provides the staging hostname and bearer token
through a secure channel. Never place the token in screenshots, tickets or URL
parameters.

## 1. Connectivity and authentication

Send a request without a token. The expected result is HTTP `401`.

Send the same request with the bearer token. The request should proceed to
payload validation.

Required headers:

```text
Authorization: Bearer <staging token>
Content-Type: application/json
```

## 2. Create an opening

```json
{
  "jobs": [
    {
      "externalId": "TRYDOT-TEST-001",
      "title": "Test Engineer - Integration Test",
      "department": "Engineering",
      "location": "Hyderabad, Telangana",
      "employmentType": "Full-time",
      "description": "Temporary staging record for API acceptance testing.",
      "experience": "2-5 years",
      "openings": 1,
      "status": "open",
      "sourceUpdatedAt": "2026-09-26T10:00:00Z"
    }
  ]
}
```

Expected result:

- HTTP `200`.
- Response action is `created`.
- The role appears in `GET /api/jobs`.
- The role appears in the Current Openings section of `/careers`.

## 3. Update the opening

Send the same `externalId` with a changed title or location and a later
`sourceUpdatedAt` value.

Expected result:

- Response action is `updated`.
- No duplicate role is created.
- The Careers page displays the updated value.

## 4. Replay and stale-update safety

Replay the same request, then send a request with an older
`sourceUpdatedAt` value.

Expected result:

- Replaying is safe and creates no duplicate.
- An older update returns the action `skipped`.

## 5. Close the opening

Send the same record with `status` set to `closed`, or call:

```text
DELETE /api/integrations/erpnext/job-openings/TRYDOT-TEST-001
```

Expected result:

- The record is retained internally with `published: false`.
- It no longer appears in `GET /api/jobs` or on `/careers`.

## 6. Failure cases

Verify that the endpoint rejects:

- Missing or invalid bearer token: HTTP `401`.
- Non-JSON content: HTTP `415`.
- Invalid JSON or missing required fields: HTTP `400`.
- Unsupported status: HTTP `400`.
- More than 100 jobs or more than 256 KB: HTTP `413` or `400`.

## Acceptance

Trydot should provide the tested payload, response request IDs and the name of
the person approving the mapping. MQS should verify the matching Careers-page
display before Trivexa enables the production endpoint.

## Internal verification record

Verified on 26 September 2026 against the isolated Neon branch
`mqs-phase-2-staging`:

- Missing bearer token returned HTTP `401`.
- Creating `TRYDOT-TEST-001` returned action `created`.
- Updating the same external ID returned action `updated`.
- Sending an older `sourceUpdatedAt` returned action `skipped`.
- Closing the record returned `published: false`.
- The public jobs feed returned zero records after cleanup.
- The Careers page returned HTTP `200` after cleanup.
- The stable public staging hostname was retested with the same create, close,
  cleanup and authentication checks.
