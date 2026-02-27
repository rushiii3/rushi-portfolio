# Output Format Rules

Apply these constraints after building core content logic.

## markdown

- Use H1 once, then H2/H3 hierarchy.
- Include metadata section with `Meta Title` and `Meta Description`.
- Use tables only when they clarify a decision.

## mdx

- Follow markdown rules.
- Keep JSX minimal and optional.
- Avoid framework-specific components unless requested.

## html

- Use semantic tags (`article`, `section`, `h1-h3`, `ul/ol`, `table`).
- Keep structure clean for parsers and answer-engine extraction.
- Provide FAQ schema snippet when FAQ exists.

## linkedin_post

- Start with a strong one-line hook.
- Use short lines and skimmable bullets.
- End with one clear CTA.
- If using quantitative claims, include source note.

## twitter_thread

- Lead tweet: core claim + context.
- Keep each post self-contained and concise.
- Use numbered flow for multi-step frameworks.
- Add compact source attribution in final tweet if quantitative claims exist.

## youtube_script

- Structure: hook -> problem -> framework -> examples -> recap -> CTA.
- Keep spoken cadence natural and clear.
- Include a "key takeaways" segment for retention.
- Cite external quantitative claims in producer notes.

## Cross-Format Invariants

- Preserve user intent and audience level.
- Keep tone authoritative, practical, and concise.
- Do not include guaranteed ranking language.
- Maintain source-backed factual integrity.
