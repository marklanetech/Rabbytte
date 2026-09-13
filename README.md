# rabbytte-mcp

Search **[Rabbytte](https://rabbytte.com)** from Claude, Cursor, or any MCP-compatible assistant.

Rabbytte is a small, human-curated search engine. Every site in the index was submitted by a person and approved by a person. No crawler, no SEO spam, no machine-generated filler. That makes it useful grounding data: when an assistant searches Rabbytte, every result is a site a human already vetted.

The whole index is free to use. No API key, no signup.

## Install

You need Node.js 18 or newer. The server is published on npm and runs with `npx`, so there is nothing to clone or build.

### Claude Desktop

Add this to `claude_desktop_config.json` (Claude → Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "rabbytte": {
      "command": "npx",
      "args": ["-y", "rabbytte-mcp"]
    }
  }
}
```

Restart Claude Desktop. You can then ask things like "search Rabbytte for independent music blogs" or "ask Rabbytte what it knows about self-storage in Canyon Lake."

### Claude Code

```bash
claude mcp add rabbytte -- npx -y rabbytte-mcp
```

### Cursor

Add the same block to `.cursor/mcp.json` in your project, or to `~/.cursor/mcp.json` for all projects:

```json
{
  "mcpServers": {
    "rabbytte": {
      "command": "npx",
      "args": ["-y", "rabbytte-mcp"]
    }
  }
}
```

### Anything else that speaks MCP

The server uses stdio transport. Point your client at `npx -y rabbytte-mcp` and it will work.

## Tools

| Tool | What it does |
|---|---|
| `search_rabbytte` | Full-text search over the curated index. Returns titles, URLs, descriptions, tags, and addresses where known. Accepts `query` and an optional `page`. |
| `ask_rabbytte` | Answers a natural-language `question` strictly from the index, with cited sources. Says so when the index has no answer rather than making one up. |

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `RABBYTTE_URL` | `https://rabbytte.com` | Point the server at a different Rabbytte instance. |

## The plain HTTP API

If you'd rather not use MCP, the same index is available over HTTP:

- `GET https://rabbytte.com/api/search?q=...`
- `GET https://rabbytte.com/api/ask?q=...`

Docs and an OpenAPI spec are at [rabbytte.com/api-docs](https://rabbytte.com/api-docs). There is also an [`llms.txt`](https://rabbytte.com/llms.txt).

## Submitting a site

Know a site that belongs in a hand-picked index? [Submit it](https://rabbytte.com/submit). A person reads every submission.

## License

MIT. See [LICENSE](LICENSE).
