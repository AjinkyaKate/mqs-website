# Phase 2 reference audit

The supplied HTML files are references only. They contain useful information
architecture and interaction ideas, but they are not production-ready pages.

## Received references

| Reference | SHA-256 | Useful for | Important limitation |
| --- | --- | --- | --- |
| `MQS-Automotive (5).html` | `e853c26c1d9bbe55188f59b2f5493bd5799865a89f1a86dc5862e96cf4e2c87c` | Automotive page structure and car/bike component map | Product names and links require approval |
| `MQS-Electronics (1).html` | `b2f81ff7e6190f982c6b35d7f9b5b50cc46c31a2d8390351d9913d0cdf8af17c` | Electronics/EMS page structure and PCB inspection points | Client scope says EMS; reference says Electronics & Semiconductor |
| `MQS-Aerospace-Defence (5).html` | `ebbbddbf0cc94565e548507253b7822010379272da26fe7fb82f7a18430b946a` | Aircraft platform tabs and component-to-system concept | Combines Aerospace and Defence although Phase 2 requires separate pages |
| `MQS-XRay-Image-Lab (3) (1).html` | `026ff0922cc9fab6beebf5b6720b314e289ebe8e610584746d21faa01e974ee7` | Single simulation hub and imaging-control interactions | Its configurator iframe points to a missing HTML file |

## Shared industry-page pattern

The three industry references consistently use:

1. Industry hero and two actions.
2. Industry overview.
3. Quality/inspection challenges.
4. Component or platform inspection map.
5. Main MQS systems relevant to that industry.
6. Brochure/resources section.
7. Consultation CTA.

This structure can be rebuilt using the existing MQS design system. The
reference navigation, footer, typography, colours and standalone CSS should not
be copied because the production site already has shared components and tokens.

## Automotive reference

The strongest reusable concept is the two-tab component map:

- Four-wheeler: engine assemblies, alloy wheels, brake calipers, crankshafts
  and pistons, steering knuckles, EV battery housings, under-brackets and valves.
- Two-wheeler: engine/cylinder head, alloy wheels, brake components, chassis and
  frame welds, and suspension/knuckles.

The mappings are reference suggestions, not approved production data. They use
names including MQS-PRISM, MQWR 160U, MQCT, MQXC and MQX.OptimaXis; these must be
reconciled with the current website nomenclature before implementation.

## Electronics/EMS reference

The page contains useful patterns for:

- Electronics QA challenges.
- PCB inspection points.
- System-detail cards.
- Brochure resources.

It uses MQX.gINti, MQX.tracE 2.5D, MQX.tracE CT and Microfocus CT. Current MQS
naming decisions must be applied before any of this copy is adopted. In
particular, the client has previously requested the MQX.tracE lineup to use
2.5D, IN-3D and inline 3D naming rather than an unapproved `CT` label.

## Aerospace and Defence reference

The reference provides three aerospace interaction groups:

- Fixed wing.
- Fighter aircraft.
- Rotary wing.

Its numbered component maps are a strong interaction reference. Phase 2,
however, calls for separate Aerospace and Defense pages. Aerospace-specific
copy can inform the Aerospace brief, while defence applications, imagery,
claims and product mappings require a separate approved client brief.

## X-ray Image Lab reference

The file combines two concepts:

1. A system configurator loaded through
   `MQS-Inspection-Configurator-Pro.html`. That referenced file was not supplied,
   so the configurator portion is incomplete.
2. A canvas-based image-processing demonstration with five samples:
   Aerospace, Defence, Heavy Industry, Electronics and Automotive.

The demo exposes controls for brightness, contrast, histogram, sharpening,
edge enhancement, inversion, window/level, ROI, measurement, defect marking,
annotation, pseudo-colour, denoise and an application-specific filter.

The displayed radiographs are procedurally drawn simulations. They must be
presented as an interactive demonstration and must not be represented as real
inspection evidence or validated analysis results.

## Production blockers found in the references

- Many navigation and product links are `#` placeholders.
- Brochure paths refer to files that were not supplied with these references.
- The configurator dependency is missing.
- Images are embedded as base64 assets and have no approval or provenance data.
- Several technical specifications and compliance claims are unverified.
- Footers use 2025 copyright text and outdated contact wording.
- The prototypes load third-party fonts and AOS assets from public CDNs.
- Reference product names do not consistently match the current site.

## Recommended reuse decision

Reuse the information architecture, tab behaviour, component-map idea and the
single simulation-hub concept. Rebuild them with the existing Next.js
components, typography, colours, navigation, forms and responsive rules. Do not
embed or deploy the standalone HTML files directly.
