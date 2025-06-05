---
title: InstantPlex
date: 2005
description: A minimal new tab page for Google Chrome.
link: /projects/spring
image:
  url: ./cover.jpg
  alt: Spring logo
links:
  - label: Github
    icon: github
    href: https://github.com/jamiller619/spring
  - label: Chrome Webstore
    icon: chromewebstore
    href: https://chrome.google.com/webstore/detail/spring/lcomlokgcbklomfecjjpjlncapnhepbl
---

Spring is a minimal new tab page for Google Chrome that
brings daily inspiration to your browser with a clean design
featuring a clock inspired by <a href="https://www.ziiiro.com/">Ziiiro</a> and curated photography
from <a href="https://www.unsplash.com/">Unsplash</a>. What started as a simple idea quickly grew
into a full-stack project combining a native Web Component
frontend with a backend based on <a href="https://www.deno.com/">Deno</a>.

## The Concept

Spring is meant to do one thing well: deliver a
distraction-free start to each browsing session. When you
open a new tab, you're greeted with:

- A full-bleed curated photo from <a href="https://www.unsplash.com/">Unsplash</a>.
- An analog clock face inspired by <a href="https://www.ziiiro.com/">Ziiiro</a>.
- No clutter - no weather, no widgets and no todo lists!

I wanted the implementation to be just as minimal as the
interface, so I kept the stack lean, modern and native
wherever possible.

## The Tech Stack

Spring is built as a Deno-based monorepo with two packages:

1. 🚀 `spring-api` – A Deno server

At the heart of Spring is a rotating selection of Unsplash
photos. To handle this, I wrote a small API server using
Deno, which fetches and caches a new image at regular
intervals.

The API serves a single endpoint, which returns a
lightweight JSON object with a photo URL, photographer's
name and alt text. A simple caching mechanism prevents
excess API requests to Unsplash and ensures consistent image delivery.

2. 🏵️ `spring-extension` – The Chrome extension

The actual extension is a simple bundle that replaces the
browser's new tab page. It is made up of three Web Components:
- `<EpicUnsplash />`
- `<DateTime />`
- `<ZiiiroClock />`

Each Web Component includes an API via native HTML
attributes that control its various options. In addition,
the extension includes an Options page to allow overall customization.

### Why Deno?

If it wasn't for Deno, and their generous free hosting for
small apps, this project wouldn't be possible. Or, at least,
wouldn't be possible using Unsplash.

## Monorepo Structure

I structured the project as a monorepo using `deno.json` to
manage both packages from the root. This keeps versioning
consistent and simplifies local development.

```bash
/spring
  ├── /api
  │    └── main.ts         # Deno API server
  ├── /extension
  │    ├── index.html      # New tab template
  │    └── app.js          # Web Component logic
  ├── deno.json            # Deno workspace config
  └── README.md
```

## Final Thoughts

Spring is a small project that served a need when I couldn't
find a new tab page extension that I liked. As a designer
and developer, it encapsulates many of my current values:
minimalism, native APIs, composable architecture and a
thoughtful user experience. It's also a great example of how
modern tools like Deno and Web Components can be combined to
create something that is much easier to deploy and maintain – without the weight of traditional frameworks.

Check out the <a href="https://github.com/jamiller619/spring">project on Github</a> or install the extension
from the <a href="">Chrome Web Store</a>.
