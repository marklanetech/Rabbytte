#!/usr/bin/env node
// Rabbytte MCP server — plugs the human-curated index into any AI assistant.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const BASE = process.env.RABBYTTE_URL || 'https://rabbytte.com';

async function get(path) {
  const res = await fetch(BASE + path, { headers: { 'user-agent': 'rabbytte-mcp/1.0' } });
  if (!res.ok) throw new Error(`Rabbytte API ${res.status}`);
  return res.json();
}

const server = new McpServer({ name: 'rabbytte', version: '1.0.0' });

server.tool(
  'search_rabbytte',
  'Search Rabbytte, a small human-curated index of the good web. Every site was submitted and approved by a person. Returns titles, URLs, descriptions, tags, and rank scores.',
  { query: z.string().describe('What to search for'), page: z.number().int().min(1).optional() },
  async ({ query, page }) => {
    const d = await get('/api/search?q=' + encodeURIComponent(query) + (page ? '&page=' + page : ''));
    const text = d.total === 0
      ? `No sites in the Rabbytte index match "${query}".`
      : d.results.map((r, i) =>
          `${i + 1}. ${r.title}\n   ${r.url}\n   ${r.description || ''}${r.tags?.length ? '\n   tags: ' + r.tags.join(', ') : ''}${r.address ? '\n   address: ' + r.address : ''}`
        ).join('\n\n') + `\n\n(${d.total} result${d.total === 1 ? '' : 's'} total)`;
    return { content: [{ type: 'text', text }] };
  }
);

server.tool(
  'ask_rabbytte',
  'Ask a question answered strictly from the Rabbytte curated index — grounded, cited, and honest when the index has no answer.',
  { question: z.string().describe('A natural-language question') },
  async ({ question }) => {
    const d = await get('/api/ask?q=' + encodeURIComponent(question));
    const sources = (d.sources || []).map((s) => `- ${s.title}: ${s.url}`).join('\n');
    return { content: [{ type: 'text', text: d.answer + (sources ? '\n\nSources from the index:\n' + sources : '') }] };
  }
);

await server.connect(new StdioServerTransport());
