# AGENTS.md - AI Coding Agent Documentation

This document provides guidance for AI coding agents (Claude, GPT, Copilot, etc.) when working with the `@page-speed/markdown-to-jsx` library in the DashTrack ecosystem.

## Overview

`@page-speed/markdown-to-jsx` is a performance-optimized React markdown renderer designed for AI-generated content. It automatically handles:

- **Custom heading IDs** using the `{#id}` syntax that AI models commonly generate
- **Phone/email normalization** via `@page-speed/pressable` integration
- **Image optimization** via `@page-speed/img` integration
- **Custom styling** through the `markdownStyles` prop
- **Iframe embeds** for YouTube, Twitter, Spotify, etc.

## AI-Specific Features

### 1. Heading ID Syntax {#custom-ids}

When generating markdown content, AI models should use the `{#id}` syntax for custom heading IDs:

#### ✅ Recommended AI Pattern

```markdown
## Introduction {#intro}
## Getting Started {#getting-started}
## API Reference {#api}
## Troubleshooting {#troubleshooting}
```

#### ❌ Avoid These Patterns

```markdown
<!-- Don't use HTML comments for IDs -->
<a id="intro"></a>
## Introduction

<!-- Don't use anchor tags -->
<h2 id="intro">Introduction</h2>

<!-- Don't use section wrappers in markdown mode -->
<section id="intro">
## Introduction
</section>
```

**Why**: The `<section>` wrapper breaks markdown parsing. Use the `{#id}` syntax instead.

### 2. ID Naming Conventions

When generating heading IDs, follow these conventions:

```markdown
## Example Heading → {#example-heading}
## API Reference → {#api-reference}
## Getting Started Guide → {#getting-started-guide}
## FAQ → {#faq}
## Step 1: Installation → {#step-1-installation}
```

**Rules:**
- Use lowercase
- Replace spaces with hyphens
- Remove special characters except hyphens and underscores
- Keep it concise but descriptive
- Prefix numbered sections: `{#step-1}`, `{#section-2}`

### 3. Table of Contents Generation

When generating TOC, ensure IDs match exactly:

```tsx
// AI-generated article with TOC
const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "methodology", title: "Methodology" },
  { id: "results", title: "Results" },
  { id: "conclusion", title: "Conclusion" },
];

const markdownContent = `
## Introduction {#introduction}
Content about introduction...

## Methodology {#methodology}
Our research approach...

## Results {#results}
Key findings...

## Conclusion {#conclusion}
Summary and recommendations...
`;

<ArticleHeroProse
  sections={sections}
  renderMode="markdown"
  markdownString={markdownContent}
  enableTocTracking
/>
```

## Common AI Use Cases

### Use Case 1: Blog Post Generation

```tsx
// AI generates blog post with structured content
const aiGeneratedPost = `
## Overview {#overview}

This article explores modern web development practices.

For questions, contact us at support@example.com or call (555) 123-4567.

## Key Concepts {#key-concepts}

- Performance optimization
- User experience
- Accessibility

![Architecture Diagram](https://cdn.example.com/diagram.jpg)

## Video Tutorial {#video}

<iframe src="https://www.youtube.com/embed/abc123" title="Tutorial"></iframe>

## Conclusion {#conclusion}

Learn more at [our documentation](https://docs.example.com).
`;

<Markdown
  markdownStyles={{
    h2: 'text-3xl font-bold text-primary mb-6',
    img: 'rounded-lg shadow-md',
    iframe: 'aspect-video w-full rounded-xl my-8'
  }}
>
  {aiGeneratedPost}
</Markdown>
```

**What happens automatically:**
- ✅ Heading IDs: `#overview`, `#key-concepts`, `#video`, `#conclusion`
- ✅ Email: `support@example.com` → `<a href="mailto:support@example.com">`
- ✅ Phone: `(555) 123-4567` → `<a href="tel:+15551234567">`
- ✅ Images: Rendered with `@page-speed/img` (responsive formats, lazy loading)
- ✅ Links: Rendered with `@page-speed/pressable` (security attributes)
- ✅ Iframe: Lazy loaded with `allowFullScreen`

### Use Case 2: Documentation Pages

```tsx
// AI generates API documentation
const apiDocs = `
## Authentication {#authentication}

All API requests require authentication using Bearer tokens.

### Getting a Token {#getting-token}

Send a POST request to \`/api/auth/token\`:

\`\`\`bash
curl -X POST https://api.example.com/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "***"}'
\`\`\`

For support, email api-support@example.com

## Rate Limits {#rate-limits}

- Free tier: 1,000 requests/hour
- Pro tier: 10,000 requests/hour

Contact sales@example.com or call (800) 555-0199 for enterprise plans.
`;

<ArticleCompactToc
  renderMode="markdown"
  markdownString={apiDocs}
  sections={[
    { id: "authentication", title: "Authentication" },
    { id: "getting-token", title: "Getting a Token" },
    { id: "rate-limits", title: "Rate Limits" },
  ]}
  markdownStyles={{
    h2: 'text-2xl font-bold mb-4',
    h3: 'text-xl font-semibold mb-3',
    code: 'bg-muted px-1 rounded text-sm',
    pre: 'bg-muted p-4 rounded-lg overflow-x-auto',
  }}
/>
```

### Use Case 3: Marketing Content with Embeds

```tsx
// AI generates marketing content with media
const marketingContent = `
## Why Choose Us {#why-choose}

See what our customers are saying:

<iframe
  src="https://www.youtube.com/embed/testimonial-video"
  title="Customer Testimonials"
></iframe>

### Our Services {#services}

![Service Overview](https://cdn.example.com/services.jpg)

Ready to get started? Visit [our pricing page](https://example.com/pricing) or call us at (888) 555-0100.

## Success Stories {#success-stories}

Watch our case study:

<iframe
  src="https://player.vimeo.com/video/123456"
  title="Case Study"
></iframe>

For a free consultation, email sales@example.com
`;

<Markdown
  markdownStyles={{
    h2: 'text-4xl font-bold text-center mb-8',
    h3: 'text-2xl font-semibold mb-4',
    img: 'rounded-2xl shadow-xl mx-auto',
    iframe: 'aspect-video w-full max-w-4xl mx-auto rounded-xl shadow-lg my-12'
  }}
>
  {marketingContent}
</Markdown>
```

## Integration with DashTrack Blocks

### Article Blocks with AI Content

All DashTrack article blocks support `renderMode="markdown"` and `markdownString` props:

```tsx
// AI generates article content
const aiContent = generateArticleContent(); // Returns markdown string

<ArticleHeroProse
  renderMode="markdown"
  markdownString={aiContent}
  post={{
    title: "AI-Generated Article",
    authorName: "AI Research Team",
    pubDate: new Date(),
  }}
  optixFlowConfig={{
    // Image optimization config passed to all <Img> components
    quality: 85,
    format: "webp"
  }}
/>
```

**Automatic Features:**
- All images use `@page-speed/img` with `optixFlowConfig`
- All links use `@page-speed/pressable` with phone/email normalization
- Custom heading IDs work with TOC tracking
- Iframes get lazy loading and security attributes

### Available Article Block Components

All support markdown rendering:

```tsx
// 1. Hero prose style
<ArticleHeroProse
  renderMode="markdown"
  markdownString={aiContent}
/>

// 2. Breadcrumb with social sharing
<ArticleBreadcrumbSocial
  renderMode="markdown"
  markdownString={aiContent}
  breadcrumbs={[...]}
/>

// 3. Chapters with author card
<ArticleChaptersAuthor
  renderMode="markdown"
  markdownString={aiContent}
  chapters={[...]}
  author={{...}}
/>

// 4. Compact TOC (mobile-optimized)
<ArticleCompactToc
  renderMode="markdown"
  markdownString={aiContent}
  sections={[...]}
  enableTocTracking
/>

// 5. Sidebar sticky layout
<ArticleSidebarSticky
  renderMode="markdown"
  markdownString={aiContent}
  sidebarContent={<>...</>}
/>

// 6. TOC in sidebar
<ArticleTocSidebar
  renderMode="markdown"
  markdownString={aiContent}
  sections={[...]}
/>
```

## AI Content Generation Best Practices

### 1. Structure Long-Form Content

```markdown
## Main Topic {#main}

Introduction paragraph...

### Subtopic 1 {#subtopic-1}

Details...

### Subtopic 2 {#subtopic-2}

More details...

## Next Section {#next}

Content continues...
```

### 2. Include Contact Information

The library auto-detects and normalizes:

```markdown
For support:
- Email: support@example.com
- Phone: (555) 123-4567
- Website: https://example.com
```

Renders as:
- Email: `<a href="mailto:support@example.com">`
- Phone: `<a href="tel:+15551234567">`
- Website: `<a href="https://example.com" target="_blank" rel="noopener noreferrer">`

### 3. Embed Rich Media

```markdown
## Product Demo {#demo}

Watch our product in action:

<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Product Demo"
></iframe>

![Product Screenshot](https://cdn.example.com/screenshot.jpg)

Listen to our podcast:

<iframe
  src="https://open.spotify.com/embed/episode/EPISODE_ID"
  title="Podcast Episode"
></iframe>
```

### 4. Use Semantic HTML Structure

```markdown
## Overview {#overview}

> "Quote from expert or testimonial"

Key features:
- Feature 1
- Feature 2
- Feature 3

### Technical Details {#technical}

\`\`\`typescript
// Code example
const example = "code";
\`\`\`

For technical support, contact devs@example.com
```

## Styling Guidelines for AI-Generated Content

### Recommended markdownStyles Configurations

#### Blog Posts
```tsx
markdownStyles={{
  h1: 'text-4xl md:text-5xl font-bold mb-8',
  h2: 'text-3xl md:text-4xl font-bold mb-6 mt-12',
  h3: 'text-2xl md:text-3xl font-semibold mb-4 mt-8',
  p: 'text-base md:text-lg leading-relaxed mb-4',
  img: 'rounded-xl shadow-lg my-8',
  iframe: 'aspect-video w-full rounded-xl shadow-lg my-12',
  blockquote: 'border-l-4 border-primary pl-6 italic my-6',
  code: 'bg-muted px-2 py-1 rounded text-sm',
  pre: 'bg-muted p-6 rounded-lg overflow-x-auto my-6',
}}
```

#### Documentation
```tsx
markdownStyles={{
  h2: 'text-2xl font-bold mb-4 pb-2 border-b',
  h3: 'text-xl font-semibold mb-3 mt-6',
  h4: 'text-lg font-medium mb-2 mt-4',
  code: 'bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono',
  pre: 'bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto my-4',
  a: 'text-primary hover:underline',
  ul: 'list-disc pl-6 my-4 space-y-2',
  ol: 'list-decimal pl-6 my-4 space-y-2',
}}
```

#### Marketing Landing Pages
```tsx
markdownStyles={{
  h2: 'text-4xl md:text-6xl font-extrabold text-center mb-8',
  h3: 'text-2xl md:text-3xl font-bold mb-6',
  p: 'text-lg md:text-xl text-center mb-6',
  img: 'rounded-2xl shadow-2xl mx-auto',
  iframe: 'aspect-video w-full max-w-5xl mx-auto rounded-2xl shadow-2xl my-16',
  blockquote: 'text-2xl font-medium text-center italic my-12',
}}
```

## Error Handling for AI Agents

### Common Issues and Solutions

#### Issue: Section IDs Not Working

```markdown
<!-- ❌ WRONG: Don't wrap in section tags -->
<section id="intro">
## Introduction
Content...
</section>

<!-- ✅ CORRECT: Use heading ID syntax -->
## Introduction {#intro}
Content...
```

**Explanation**: In markdown mode, `<section>` tags break markdown parsing. Use `{#id}` syntax on headings instead.

#### Issue: Heading ID Displays in Text

```markdown
<!-- ❌ WRONG: Extra spaces or malformed syntax -->
## Introduction { #intro }
## Introduction {# intro}
## Introduction {#intro-section }

<!-- ✅ CORRECT: No spaces, valid characters only -->
## Introduction {#intro}
## Introduction {#intro-section}
## Introduction {#intro_section}
```

**Valid ID characters**: `a-z`, `A-Z`, `0-9`, `-`, `_`

#### Issue: Phone/Email Links Not Normalizing

```markdown
<!-- ✅ These all work automatically -->
Email: support@example.com
Call: (555) 123-4567
Phone: 555.123.4567
Contact: +1-555-123-4567

<!-- The library auto-detects and converts:
- support@example.com → mailto:support@example.com
- (555) 123-4567 → tel:+15551234567
- Plain links → proper <a> tags with security attributes
-->
```

## AI Content Generation Patterns

### Pattern 1: Research Articles

```typescript
// AI agent generates research article
interface ResearchArticle {
  title: string;
  sections: Array<{id: string; title: string}>;
  content: string; // Markdown with {#id} syntax
}

function generateResearchArticle(topic: string): ResearchArticle {
  // AI generates structured markdown
  return {
    title: "Understanding " + topic,
    sections: [
      { id: "abstract", title: "Abstract" },
      { id: "introduction", title: "Introduction" },
      { id: "methodology", title: "Methodology" },
      { id: "results", title: "Results" },
      { id: "discussion", title: "Discussion" },
      { id: "conclusion", title: "Conclusion" },
    ],
    content: `
## Abstract {#abstract}

Brief summary of the research...

## Introduction {#introduction}

Background and context...

For the full paper, contact research@university.edu

## Methodology {#methodology}

![Research Framework](https://cdn.example.com/framework.jpg)

Our approach consisted of...

## Results {#results}

Key findings:
- Finding 1
- Finding 2
- Finding 3

## Discussion {#discussion}

> "This research demonstrates the importance of systematic approaches to modern challenges."

The implications of our findings...

## Conclusion {#conclusion}

For questions or collaboration opportunities, reach out to team@university.edu or call (555) 123-4567.
    `
  };
}

// Usage in component
const article = generateResearchArticle("AI in Healthcare");

<ArticleCompactToc
  title={article.title}
  sections={article.sections}
  renderMode="markdown"
  markdownString={article.content}
  enableTocTracking
  markdownStyles={{
    h2: 'text-2xl md:text-4xl font-bold text-primary mb-6',
    img: 'shadow-lg rounded-xl',
    blockquote: 'border-l-4 border-primary pl-6 italic text-xl my-8',
  }}
/>
```

### Pattern 2: Product Documentation

```typescript
// AI generates product docs with code examples
function generateProductDocs(product: string): string {
  return `
## Installation {#installation}

Install via npm:

\`\`\`bash
npm install ${product}
\`\`\`

## Quick Start {#quick-start}

\`\`\`typescript
import { Component } from '${product}';

function App() {
  return <Component />;
}
\`\`\`

## Configuration {#configuration}

For advanced configuration, see our [full documentation](https://docs.example.com/${product}).

## Support {#support}

- Email: support@example.com
- Discord: https://discord.gg/example
- Phone: (888) 555-0100

## Video Tutorial {#tutorial}

<iframe src="https://youtube.com/embed/tutorial-id" title="${product} Tutorial"></iframe>
  `;
}
```

### Pattern 3: Marketing Content with CTAs

```typescript
// AI generates landing page content
function generateLandingPage(service: string): string {
  return `
## Transform Your Business {#transform}

Discover how ${service} can revolutionize your workflow.

<iframe
  src="https://www.youtube.com/embed/demo-video"
  title="${service} Demo"
></iframe>

## Key Benefits {#benefits}

![Benefits Overview](https://cdn.example.com/benefits.jpg)

- **Faster**: 10x performance improvement
- **Easier**: Intuitive interface
- **Reliable**: 99.9% uptime guarantee

## Get Started Today {#get-started}

Ready to transform your business?

- Schedule a demo: [Book Now](https://example.com/demo)
- Contact sales: sales@example.com
- Call us: (800) 555-0123

## Customer Success {#success}

> "This tool saved us 40 hours per week and increased our productivity by 300%."
> — Jane Smith, CEO at TechCorp

<iframe
  src="https://player.vimeo.com/video/case-study"
  title="Customer Success Story"
></iframe>
  `;
}
```

## Advanced AI Patterns

### Multi-Language Content

```typescript
// AI generates translated content with preserved IDs
function generateTranslatedContent(locale: string): string {
  // IDs stay the same across languages for consistent navigation
  if (locale === "es") {
    return `
## Introducción {#introduction}
Contenido en español...

## Características {#features}
Lista de características...
    `;
  }

  return `
## Introduction {#introduction}
English content...

## Features {#features}
Feature list...
  `;
}
```

### Dynamic Content Assembly

```typescript
// AI assembles content from multiple sources
function assembleArticle(sections: ContentSection[]): string {
  return sections
    .map(section => `
## ${section.title} {#${section.id}}

${section.content}

${section.media ? `![${section.mediaAlt}](${section.media})` : ''}

${section.contactEmail ? `Contact: ${section.contactEmail}` : ''}
    `)
    .join('\n\n');
}
```

### Conditional Embeds

```typescript
// AI decides which media type to include
function generateContentWithMedia(topic: string, mediaType: 'youtube' | 'vimeo' | 'image'): string {
  const embedCode = {
    youtube: '<iframe src="https://youtube.com/embed/VIDEO_ID" title="Video"></iframe>',
    vimeo: '<iframe src="https://player.vimeo.com/video/VIDEO_ID" title="Video"></iframe>',
    image: '![Visual Explanation](https://cdn.example.com/image.jpg)',
  }[mediaType];

  return `
## ${topic} {#${slugify(topic)}}

Introduction to ${topic}...

${embedCode}

For more information, visit https://example.com or email info@example.com
  `;
}
```

## Performance Optimization for AI Content

### 1. Lazy Loading Strategy

```tsx
// AI generates content with performance hints
const performanceOptimizedContent = `
## Above the Fold {#hero}

Critical content loaded immediately...

## Below the Fold {#details}

![Large Image](https://cdn.example.com/large.jpg)

<iframe src="https://youtube.com/embed/video" title="Demo"></iframe>

Additional content...
`;

<Markdown
  markdownStyles={{
    img: 'rounded-lg', // Img component handles lazy loading automatically
    iframe: 'aspect-video w-full', // Iframes get loading="lazy" by default
  }}
>
  {performanceOptimizedContent}
</Markdown>
```

### 2. Image Optimization

```tsx
// All images automatically use @page-speed/img when available
<Markdown
  overrides={{
    img: (props: any) => <Img {...props} optixFlowConfig={{
      quality: 85,
      format: 'webp', // Auto-generates WebP, AVIF, JPEG variants
      sizes: {
        sm: 640,
        md: 1024,
        lg: 1920,
      }
    }} />
  }}
>
  {aiGeneratedContentWithImages}
</Markdown>
```

## Testing AI-Generated Content

### Validation Checklist

Before rendering AI-generated markdown, validate:

- [ ] Heading IDs use valid characters: `a-z`, `A-Z`, `0-9`, `-`, `_`
- [ ] No conflicting IDs (each ID is unique)
- [ ] Email addresses are valid format
- [ ] Phone numbers are parseable
- [ ] Image URLs are accessible
- [ ] Iframe sources are from trusted domains
- [ ] Links use proper protocols (https://, mailto:, tel:)
- [ ] No malicious code in iframe src or image URLs

### Example Validation Function

```typescript
function validateAIMarkdown(markdown: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check for duplicate IDs
  const idMatches = markdown.matchAll(/\{#([a-zA-Z0-9_-]+)\}/g);
  const ids = Array.from(idMatches, m => m[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0) {
    errors.push(`Duplicate IDs found: ${duplicates.join(', ')}`);
  }

  // Check for invalid ID characters
  const invalidIds = ids.filter(id => !/^[a-zA-Z0-9_-]+$/.test(id));
  if (invalidIds.length > 0) {
    errors.push(`Invalid ID characters: ${invalidIds.join(', ')}`);
  }

  // Check for section tags (not supported in markdown mode)
  if (markdown.includes('<section ')) {
    errors.push('Section tags not supported - use heading {#id} syntax instead');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Usage
const aiContent = generateContent();
const validation = validateAIMarkdown(aiContent);

if (!validation.valid) {
  console.error('AI content validation failed:', validation.errors);
  // Fix or regenerate content
} else {
  // Safe to render
  <Markdown renderMode="markdown">{aiContent}</Markdown>
}
```

## TypeScript Types for AI Integration

```typescript
import type {
  MarkdownProps,
  MarkdownStylesMap,
  OverrideMap,
} from '@page-speed/markdown-to-jsx';

// AI content structure
interface AIGeneratedArticle {
  title: string;
  sections: Array<{
    id: string;
    title: string;
  }>;
  content: string; // Markdown with {#id} syntax
  styles?: MarkdownStylesMap;
  metadata: {
    author?: string;
    date?: Date;
    readTime?: string;
  };
}

// Render function
function renderAIArticle(article: AIGeneratedArticle) {
  return (
    <ArticleCompactToc
      title={article.title}
      sections={article.sections}
      renderMode="markdown"
      markdownString={article.content}
      authorName={article.metadata.author}
      publishDate={article.metadata.date?.toLocaleDateString()}
      readTime={article.metadata.readTime}
      markdownStyles={article.styles}
      enableTocTracking
    />
  );
}
```

## Security Considerations

### XSS Prevention

The library automatically sanitizes:
- ✅ JavaScript URLs: `javascript:alert('xss')` → Blocked
- ✅ Data URLs with scripts: `data:text/html,<script>` → Blocked
- ✅ Dangerous attributes: `onerror`, `onclick`, etc. → Stripped

### Trusted Iframe Sources

When AI generates iframe embeds, validate the source:

```typescript
const trustedDomains = [
  'youtube.com',
  'youtube-nocookie.com',
  'vimeo.com',
  'spotify.com',
  'soundcloud.com',
  'twitter.com',
  'x.com',
];

function validateIframeSrc(src: string): boolean {
  try {
    const url = new URL(src);
    return trustedDomains.some(domain =>
      url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}
```

## Debugging AI Content

### Enable Detailed Logging

```typescript
// Add logging to track what's being rendered
function renderWithLogging(aiContent: string) {
  console.log('AI Content Length:', aiContent.length);
  console.log('Headings with IDs:',
    aiContent.match(/##.*\{#[a-zA-Z0-9_-]+\}/g)
  );
  console.log('Emails:',
    aiContent.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)
  );
  console.log('Phone numbers:',
    aiContent.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g)
  );

  return <Markdown>{aiContent}</Markdown>;
}
```

### Test Rendering

```typescript
// Test AI-generated content in isolation
import { render } from '@testing-library/react';

function testAIContent(markdown: string) {
  const { container } = render(<Markdown>{markdown}</Markdown>);

  // Verify heading IDs
  const headings = container.querySelectorAll('h2[id]');
  console.log('Generated heading IDs:',
    Array.from(headings).map(h => ({ text: h.textContent, id: h.id }))
  );

  // Verify links
  const links = container.querySelectorAll('a[href]');
  console.log('Generated links:',
    Array.from(links).map(a => ({ text: a.textContent, href: a.getAttribute('href') }))
  );
}
```

## Best Practices Summary

### DO:
✅ Use `{#id}` syntax for custom heading IDs
✅ Include contact info (emails, phone numbers) - they auto-normalize
✅ Use iframe HTML for video/audio embeds
✅ Apply `markdownStyles` for consistent styling
✅ Test generated content before production
✅ Validate heading ID uniqueness
✅ Use semantic heading hierarchy (h2 → h3 → h4)

### DON'T:
❌ Wrap content in `<section>` tags in markdown mode
❌ Use HTML heading tags (`<h2>`) - use markdown (`##`)
❌ Forget to specify iframe title attribute
❌ Use untrusted iframe sources
❌ Include `{#id}` syntax in regular text (only after headings)
❌ Use special characters in IDs (only a-z, 0-9, -, _)

## Quick Reference

### Component Props

```typescript
// Markdown component (standalone usage)
<Markdown
  markdownStyles?: MarkdownStylesMap;  // NEW in v0.0.3: Custom className mappings
  overrides?: OverrideMap;             // Custom component overrides
  useDefaults?: boolean;               // Use ecosystem defaults (default: true)
  className?: string;                  // Wrapper className
  wrapper?: ElementType | null;        // Wrapper component (default: 'div')
>
  {markdownString}
</Markdown>

// Article blocks (all support these props)
<ArticleHeroProse
  renderMode?: "jsx" | "markdown";     // NEW in v0.0.3: Render mode
  markdownString?: string;             // NEW in v0.0.3: Markdown content
  optixFlowConfig?: OptixFlowConfig;   // Passed to all <Img> components
  // ... other block-specific props
/>
```

### markdownStyles Type

```typescript
type MarkdownStylesMap = Record<string, string>;

// Examples
const styles: MarkdownStylesMap = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  p: 'text-base leading-relaxed',
  img: 'rounded-lg shadow-md',
  iframe: 'aspect-video w-full',
  code: 'bg-muted px-2 py-1 rounded',
  pre: 'bg-muted p-4 rounded-lg',
  blockquote: 'border-l-4 pl-4 italic',
  ul: 'list-disc pl-6 space-y-2',
  ol: 'list-decimal pl-6 space-y-2',
  li: 'mb-2',
  a: 'text-primary hover:underline',
  table: 'w-full border-collapse',
  th: 'border px-4 py-2 bg-muted font-semibold',
  td: 'border px-4 py-2',
};
```

## Migration Guide for AI Agents

### Version 0.0.2 → 0.0.3

**New Features:**
1. **Heading IDs**: Use `{#id}` syntax instead of `<section>` wrappers
2. **markdownStyles**: Use instead of creating custom override components
3. **Iframe support**: Now works out of the box

**Breaking Changes:**
- None - fully backwards compatible

**Migration Example:**

```typescript
// OLD (v0.0.2)
const content = `
<section id="intro">
## Introduction
Content...
</section>
`;

// NEW (v0.0.3)
const content = `
## Introduction {#intro}
Content...
`;
```

```typescript
// OLD (v0.0.2) - Custom component for styling
const CustomH2 = ({children}) => (
  <h2 className="text-3xl font-bold">{children}</h2>
);

<Markdown overrides={{ h2: CustomH2 }}>
  {content}
</Markdown>

// NEW (v0.0.3) - Use markdownStyles
<Markdown markdownStyles={{ h2: 'text-3xl font-bold' }}>
  {content}
</Markdown>
```

## AI Prompt Examples

### Example Prompt for Content Generation

```
Generate a technical article about [TOPIC] with the following structure:

1. Use markdown format
2. Include heading IDs using {#id} syntax (lowercase, hyphenated)
3. Create sections: Introduction, Key Concepts, Implementation, Best Practices, Conclusion
4. Include at least one code example
5. Add contact email and phone number in conclusion
6. Include 1-2 images with descriptive alt text
7. Add a YouTube tutorial iframe if relevant

Format each heading like: ## Section Title {#section-id}
```

### Example Prompt for Documentation

```
Create API documentation for [ENDPOINT] with:

1. Markdown format with heading IDs {#id}
2. Sections: Overview, Authentication, Request, Response, Examples, Errors
3. Include curl examples in code blocks
4. Add support email and phone number
5. Use proper HTTP status codes
6. Include example request/response JSON

Each heading should have an ID: ## Section Name {#section-name}
```

## Support

- **Documentation**: [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/opensite-ai/markdown-to-jsx/issues)
- **DashTrack Ecosystem**: [CLAUDE.md](/Users/jordanhudgens/code/dashtrack/CLAUDE.md)

## Version

Current version: **0.0.3**

**Changelog:**
- v0.0.3: Added heading {#id} syntax, markdownStyles prop, iframe support
- v0.0.2: Added @page-speed/pressable integration
- v0.0.1: Initial release with @page-speed/img integration

---

**For AI Agents**: This library is specifically optimized for AI-generated content. Always use the `{#id}` syntax for heading IDs (not `<section>` tags), apply `markdownStyles` for consistent styling, and leverage automatic phone/email normalization. All features are tested and production-ready for AI workflows.

## OptixFlow Image Optimization

### Automatic Configuration Passing

The library now supports passing `optixFlowConfig` directly to the Markdown component, which automatically configures the `@page-speed/img` component:

```tsx
<Markdown
  optixFlowConfig={{
    quality: 85,
    format: 'webp',
    sizes: {
      sm: 640,
      md: 1024,
      lg: 1920,
    }
  }}
  overrides={{
    img: Img,  // No wrapper needed!
    a: Pressable,
  }}
>
  {markdownContent}
</Markdown>
```

**Before (v0.0.3):**
```tsx
// Required wrapper function to pass optixFlowConfig
<Markdown
  overrides={{
    img: (props) => <Img {...props} optixFlowConfig={config} />,
    a: Pressable,
  }}
>
  {content}
</Markdown>
```

**After (v0.0.4):**
```tsx
// Clean, simple - optixFlowConfig passed via context
<Markdown
  optixFlowConfig={config}
  overrides={{
    img: Img,
    a: Pressable,
  }}
>
  {content}
</Markdown>
```

### Benefits

✅ **markdownStyles Work Properly**: Image className from markdownStyles now applies correctly
✅ **Cleaner Code**: No wrapper functions needed
✅ **Consistent API**: Same pattern as Pressable
✅ **Context-Based**: OptixFlow config shared via React Context

### Usage in DashTrack Blocks

```tsx
<ArticleCompactToc
  renderMode="markdown"
  markdownString={content}
  optixFlowConfig={{
    quality: 85,
    format: 'webp'
  }}
  markdownStyles={{
    h2: 'text-3xl font-bold',
    img: 'rounded-xl shadow-xl',  // Now works correctly!
    iframe: 'aspect-video w-full'
  }}
/>
```

The block automatically passes optixFlowConfig to the Markdown component, which shares it via context with all Image components.
