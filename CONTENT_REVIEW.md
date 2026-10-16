# Website content draft

This branch is a review version. Do not merge to main or deploy to production until approved.

## Pages

- `/build-with-us`: planning hub linked from the main navigation and homepage.
- `/projects-in-progress`: construction progress gallery, with no fictional project cards or completed-project claims.
- `/process`: six-stage planning guide with responsibilities and next steps.
- `/pricing`: project budget components and proposal checklist. No unapproved prices.
- `/faq`: twelve practical questions grouped into four categories.

Existing model pages add full-size floor-plan links, model-imagery context and planning guidance. All three landing pages link to the new resources with a topic-specific introduction.

## Replace photo slots

1. Place approved images in `public/assets/build-progress/`.
2. Update `src/content/build-guide/photos.ts`: set the relevant `src` to `/assets/build-progress/filename.webp` and supply accurate alt text and caption.
3. The `brief` fields describe the desired photograph and dimensions. They are editorial notes, not customer-facing content.
4. Until images are supplied, the page shows a designed placeholder marked "Photo coming soon". It never requests missing files.
5. Use only real, approved construction photography here. Identify the stage accurately; add a date and approved project/location information to the caption when available. Do not present model renderings as finished work.

## Before release

- Approve the process and proposal language against current business practice.
- Confirm warranty wording and any later numerical pricing with the company.
- Supply approved construction photography where available.
- Review existing site-wide testimonial and experience claims separately before changing them. This draft preserves existing content outside the new sections.

The draft preserves existing form, reCAPTCHA, email, Sheets and Leads Tracker integrations.
