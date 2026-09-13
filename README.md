# DevSnaps

> A visual reference library for developers who care about the details of their workspace.

DevSnaps brings palettes, IDE skins, terminal environments, and practical code references into one focused workspace where people can browse, save, and share the small pieces of craft that shape how they work.

## The idea

Good developer tooling is more than utility. Color, contrast, typography, and tiny workflow decisions influence how long we can stay focused and how clearly we can think. DevSnaps turns those choices into a browsable, community-minded library.

The interface is designed around:

- **Discovering visual systems** through curated theme cards and searchable references.
- **Saving useful inspiration** into a lightweight personal library.
- **Understanding the details** with expandable previews and individual color values.
- **Sharing a working idea** through the local snap publishing flow.
- **Learning by doing** with a compact field guide for building thoughtful themes.

## What is in the demo

- Discover view with curated themes and community activity signals
- Filters for palettes, IDE skins, and terminal themes
- Search across names, creators, types, and descriptions
- Saved themes with in-session interaction
- Expandable theme cards with swatches and hex values
- Docs view with practical publishing and theme-building guidance
- Upload modal for code, descriptions, tags, and image previews
- Responsive layout for desktop and smaller screens

The current version is a front-end prototype. Theme data and saved items are seeded locally, and publishing ends in a prepared local preview. A production backend would connect the upload flow to storage and a database.

## Built with

- [Next.js](https://nextjs.org/) 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4 and custom CSS tokens
- ESLint

## Run locally

You will need Node.js and npm installed.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the workspace.

## Available scripts

```bash
npm run dev      # Start the development server
npm run lint     # Run ESLint
npm run build    # Create a production build
npm run start    # Serve the production build
```

## Project structure

```text
app/
	page.tsx       # Workspace views, theme catalog, docs, and upload flow
	globals.css    # Design tokens, layout, responsive styles, and components
	layout.tsx     # Root metadata and document layout
public/          # Brand and interface assets
```

## Design notes

DevSnaps uses a quiet editorial direction: warm paper surfaces, botanical greens, coral accents, mono labels, and serif emphasis for moments that deserve a little character. The result is intentionally closer to a personal studio desk than a generic dashboard.

## Next steps

- Connect themes, users, and collections to a database
- Add authentication and private workspaces
- Store uploaded images in object storage
- Support importing and exporting theme tokens
- Add richer snap detail pages and community moderation

## License

This project is a private portfolio project and is not currently published under an open-source license.
