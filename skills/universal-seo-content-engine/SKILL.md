---
name: universal-seo-content-engine
description: Create source-backed, intent-matched SEO content optimized for both traditional search and AI answer engines across formats (markdown, mdx, html, LinkedIn posts, X threads, and YouTube scripts). Use when the user asks to draft, rewrite, optimize, or structure keyword-targeted content for discoverability, extractability, and authority signals while avoiding unsupported factual claims.
---

# Universal SEO Content Engine

## Canonical Input Contract

Collect these parameters before writing:

- `main_keyword` (string, required)
- `secondary_keywords` (array of strings or comma-separated string)
- `search_intent` (`Informational | Commercial | Transactional | Navigational`)
- `audience_level` (`Beginner | Intermediate | Advanced`)
- `industry` (string)
- `content_depth` (`Standard | Long | Authority | Pillar`)
- `year_context` (year as number or string)
- `output_format` (`markdown | mdx | html | linkedin_post | twitter_thread | youtube_script`)

If required inputs are missing, ask for them. If user prefers speed, infer only low-risk defaults and explicitly label assumptions.

## Workflow

### 1) Match Search Intent Before Optimization

- Classify requested intent.
- Align format and structure to intent.
- Refuse intent mismatch (for example, writing a transactional page for a purely informational query) unless user explicitly requests that tradeoff.

### 2) Build Semantic Keyword Architecture

- Place `main_keyword` in:
  - primary title
  - first 100 words
  - at least one H2-equivalent section heading
- Use `secondary_keywords` and conversational variations naturally.
- Optimize for topical breadth and entity relevance, not repetition.
- Avoid keyword stuffing.

### 3) Optimize for AI Extractability

Include the following when format supports it:

- TLDR block (40-70 words)
- clear definition block
- list-based summaries
- comparison table when meaningful
- FAQ with exactly 5 questions
- factual/statistical support when claims are quantitative

### 4) Add Information Gain

Ensure output adds value beyond generic top results:

- updated context for `year_context`
- concrete examples
- step-by-step actionable framework
- common mistakes and edge cases

### 5) Strengthen Authority Signals

- Use precise, practical, expert tone.
- Cite recognized frameworks or standards when relevant.
- Keep guidance specific and non-generic.
- Do not claim guaranteed rankings or outcomes.

### 6) Improve Engagement and Readability

- Use short paragraphs.
- Use subheadings every 150-200 words for long-form.
- Prefer bullets, numbered lists, and compact tables where useful.
- Provide 3 internal linking suggestions for long-form outputs.

## Normalized Output Contract

For `markdown | mdx | html`, include these sections unless user explicitly removes one:

1. SEO-optimized title
2. Meta title and meta description
3. TLDR
4. Hooked introduction
5. Definition section
6. Core topic sections (H2/H3 structure)
7. Comparison table (conditional)
8. Actionable framework
9. Common mistakes
10. FAQ (5 questions)
11. Conclusion with authority reinforcement
12. Citations/source list with URLs for quantitative claims

For `linkedin_post`, `twitter_thread`, and `youtube_script`:

- Adapt length and cadence to platform.
- Preserve intent match, semantic coverage, and clarity.
- Keep a compact definition moment and practical framework.
- Include source attributions for quantitative claims (inline or end notes).
- Avoid fabricating data.

## Source Verification and Citation Rules

- Require verifiable sources for quantitative/factual claims.
- Prefer primary sources, official documentation, peer-reviewed research, or reputable institutions.
- If a claim cannot be verified:
  - remove the claim, or
  - mark it explicitly as an estimate/opinion without numerical precision.
- Always include URLs for quantitative claims in the citation block.

Load and follow:

- `references/source_quality_policy.md` for evidence thresholds
- `references/content_blueprint.md` for section assembly logic
- `references/output_format_rules.md` for per-format constraints

## Failure Handling

- Missing inputs: request missing fields before drafting.
- Weak/absent evidence: decline unsupported numeric claims and offer a sourced alternative.
- Intent mismatch: restate mismatch and provide an intent-aligned outline first.
- Regulated niches (`health`, `finance`, `legal`): enforce stricter sourcing and avoid speculative claims.

## Execution Defaults

- Write in an authoritative, clear, practical, no-fluff style.
- Use optimization language, not guarantees.
- Treat AI search optimization as extractability and clarity improvements.
