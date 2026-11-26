<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          <xsl:choose>
            <xsl:when test="sitemap:sitemapindex">Sitemap Index | Hrushikesh Shinde</xsl:when>
            <xsl:otherwise>XML Sitemap | Hrushikesh Shinde</xsl:otherwise>
          </xsl:choose>
        </title>
        <style type="text/css">
          :root {
            --bg-page: #09090b;
            --bg-card: #121215;
            --bg-card-hover: #18181b;
            --border-subtle: #27272a;
            --border-highlight: #3f3f46;
            --text-primary: #fafafa;
            --text-secondary: #a1a1aa;
            --text-muted: #71717a;
            --accent-emerald: #10b981;
            --accent-emerald-subtle: rgba(16, 185, 129, 0.12);
            --badge-bg: #27272a;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: var(--bg-page);
            color: var(--text-primary);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            padding: 2.5rem 1.5rem;
            min-height: 100vh;
          }

          .container {
            max-width: 1100px;
            margin: 0 auto;
          }

          header {
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--border-subtle);
          }

          .nav-back {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 13px;
            margin-bottom: 1rem;
            transition: color 0.15s ease;
          }

          .nav-back:hover {
            color: var(--accent-emerald);
          }

          h1 {
            font-size: 1.75rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .tag {
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            padding: 0.2rem 0.6rem;
            border-radius: 9999px;
            background: var(--accent-emerald-subtle);
            color: var(--accent-emerald);
            border: 1px solid rgba(16, 185, 129, 0.3);
          }

          .description {
            color: var(--text-secondary);
            margin-top: 0.75rem;
            max-width: 720px;
            font-size: 0.925rem;
            line-height: 1.6;
          }

          .meta-stats {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            margin-top: 1.25rem;
            padding: 1rem 1.25rem;
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
          }

          .stat-item {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .stat-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            font-weight: 600;
          }

          .stat-value {
            font-size: 15px;
            font-weight: 600;
            color: var(--text-primary);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          }

          .table-wrapper {
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            overflow-x: auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          }

          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
          }

          th {
            background: #151518;
            color: var(--text-muted);
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 0.85rem 1rem;
            border-bottom: 1px solid var(--border-subtle);
            white-space: nowrap;
          }

          td {
            padding: 0.85rem 1rem;
            border-bottom: 1px solid var(--border-subtle);
            color: var(--text-secondary);
            vertical-align: middle;
            font-size: 13px;
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover td {
            background: var(--bg-card-hover);
          }

          .col-index {
            width: 48px;
            text-align: center;
            color: var(--text-muted);
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 12px;
          }

          .col-url a {
            color: #60a5fa;
            text-decoration: none;
            word-break: break-all;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 12.5px;
            transition: color 0.15s ease;
          }

          .col-url a:hover {
            color: var(--accent-emerald);
            text-decoration: underline;
          }

          .priority-badge {
            display: inline-block;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 12px;
            font-weight: 600;
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            border: 1px solid var(--border-subtle);
            background: #1c1c20;
            color: var(--text-primary);
          }

          .priority-high {
            color: #34d399;
            border-color: rgba(52, 211, 153, 0.3);
            background: rgba(16, 185, 129, 0.1);
          }

          .priority-mid {
            color: #60a5fa;
            border-color: rgba(96, 165, 250, 0.3);
            background: rgba(96, 165, 250, 0.1);
          }

          .freq-badge {
            display: inline-block;
            text-transform: capitalize;
            font-size: 11.5px;
            color: var(--text-secondary);
            background: #1c1c20;
            padding: 0.15rem 0.55rem;
            border-radius: 4px;
            border: 1px solid var(--border-subtle);
          }

          .col-date {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 12px;
            color: var(--text-muted);
            white-space: nowrap;
          }

          footer {
            margin-top: 2rem;
            text-align: center;
            color: var(--text-muted);
            font-size: 12px;
          }

          footer a {
            color: var(--text-secondary);
            text-decoration: none;
          }

          footer a:hover {
            color: var(--accent-emerald);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <a href="/" class="nav-back">← Back to Hrushikesh Shinde</a>
            <h1>
              <xsl:choose>
                <xsl:when test="sitemap:sitemapindex">Sitemap Index</xsl:when>
                <xsl:otherwise>XML Sitemap</xsl:otherwise>
              </xsl:choose>
              <span class="tag">Astro 5</span>
            </h1>
            <p class="description">
              <xsl:choose>
                <xsl:when test="sitemap:sitemapindex">
                  This XML Sitemap Index lists all sub-sitemaps generated for <strong>Hrushikesh Shinde</strong>'s portfolio. It helps search engines discover and index every published page efficiently.
                </xsl:when>
                <xsl:otherwise>
                  This XML Sitemap documents all discoverable canonical URLs for <strong>Hrushikesh Shinde</strong>'s portfolio. Includes crawl priority, change frequency, and verified modification dates.
                </xsl:otherwise>
              </xsl:choose>
            </p>

            <div class="meta-stats">
              <div class="stat-item">
                <span class="stat-label">Total Entries</span>
                <span class="stat-value">
                  <xsl:choose>
                    <xsl:when test="sitemap:sitemapindex">
                      <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/> Sitemaps
                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs
                    </xsl:otherwise>
                  </xsl:choose>
                </span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Format</span>
                <span class="stat-value">Sitemaps.org 0.9 XML</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Stylesheet</span>
                <span class="stat-value">Astro XSLT 1.0</span>
              </div>
            </div>
          </header>

          <main>
            <xsl:apply-templates />
          </main>

          <footer>
            <p>Generated via <a href="https://docs.astro.build/en/guides/integrations-guide/sitemap/#xslurl" target="_blank" rel="noopener noreferrer">@astrojs/sitemap</a> • Styled with XSLT</p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- Sitemap Index Template -->
  <xsl:template match="sitemap:sitemapindex">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="col-index">#</th>
            <th>Sitemap URL</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:sitemap">
            <tr>
              <td class="col-index"><xsl:value-of select="position()"/></td>
              <td class="col-url">
                <xsl:variable name="sitemapUrl" select="sitemap:loc"/>
                <a href="{$sitemapUrl}"><xsl:value-of select="sitemap:loc"/></a>
              </td>
              <td class="col-date">
                <xsl:choose>
                  <xsl:when test="sitemap:lastmod">
                    <xsl:value-of select="concat(substring(sitemap:lastmod, 0, 11), ' ', substring(sitemap:lastmod, 12, 5), ' UTC')"/>
                  </xsl:when>
                  <xsl:otherwise>—</xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

  <!-- URL Set Template -->
  <xsl:template match="sitemap:urlset">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="col-index">#</th>
            <th>URL</th>
            <th style="width: 90px; text-align: center;">Priority</th>
            <th style="width: 130px;">Change Freq</th>
            <th style="width: 170px;">Last Modified</th>
          </tr>
        </thead>
        <tbody>
          <xsl:for-each select="sitemap:url">
            <tr>
              <td class="col-index"><xsl:value-of select="position()"/></td>
              <td class="col-url">
                <xsl:variable name="itemUrl" select="sitemap:loc"/>
                <a href="{$itemUrl}"><xsl:value-of select="sitemap:loc"/></a>
              </td>
              <td style="text-align: center;">
                <xsl:choose>
                  <xsl:when test="sitemap:priority &gt;= 0.9">
                    <span class="priority-badge priority-high"><xsl:value-of select="sitemap:priority"/></span>
                  </xsl:when>
                  <xsl:when test="sitemap:priority &gt;= 0.7">
                    <span class="priority-badge priority-mid"><xsl:value-of select="sitemap:priority"/></span>
                  </xsl:when>
                  <xsl:when test="sitemap:priority">
                    <span class="priority-badge"><xsl:value-of select="sitemap:priority"/></span>
                  </xsl:when>
                  <xsl:otherwise>
                    <span class="priority-badge">0.5</span>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
              <td>
                <xsl:choose>
                  <xsl:when test="sitemap:changefreq">
                    <span class="freq-badge"><xsl:value-of select="sitemap:changefreq"/></span>
                  </xsl:when>
                  <xsl:otherwise>—</xsl:otherwise>
                </xsl:choose>
              </td>
              <td class="col-date">
                <xsl:choose>
                  <xsl:when test="sitemap:lastmod">
                    <xsl:value-of select="concat(substring(sitemap:lastmod, 0, 11), ' ', substring(sitemap:lastmod, 12, 5), ' UTC')"/>
                  </xsl:when>
                  <xsl:otherwise>—</xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </tbody>
      </table>
    </div>
  </xsl:template>

</xsl:stylesheet>