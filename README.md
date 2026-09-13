# rabbytte-mcp

Search **[Rabbytte](https://rabbytte.com)** — a small, human-curated index of the good web — from Claude, Cursor, or any MCP-compatible AI assistant. Every site in the index was submitted and approved by a person. No SEO slop, no scraped sludge.

## Tools
- **search_rabbytte** — full-text search over the curated index (titles, URLs, descriptions, tags, addresses).
- **ask_rabbytte** — a question answered strictly from the index, with cited sources.

## Add to Claude Desktop
In `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rabbytte": { "command": "npx", "args": ["-y", "rabbytte-mcp"] }
  }
}
```

Works anywhere MCP does. The index's plain HTTP API also exists at `https://rabbytte.com/api-docs`.

*Curated by humans. Readable by machines.* 🐾
