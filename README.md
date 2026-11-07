# Metron Cybersecurity Integrations

A responsive Next.js 14 + TypeScript + Tailwind CSS integrations directory.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Quality Checks (CI Scripts)

Run the automated checks locally before pushing:

```bash
npm run lint
npm run typecheck
npm run build
```

## CI/CD Pipeline

The project uses GitHub Actions for Continuous Integration and Continuous Deployment (`.github/workflows/ci-cd.yml`):

1. **Continuous Integration (CI)**:
   - Triggers on push and pull requests.
   - Sets up Node.js 20 with npm caching.
   - Runs `npm ci` for deterministic dependency installation.
   - Runs linting (`npm run lint`), TypeScript checks (`npm run typecheck`), and static export build (`npm run build`).
   - Packages and uploads production build artifacts.

2. **Continuous Deployment (CD)**:
   - Triggers automatically when code merges into the `main` branch after CI checks pass.
   - Deploys the static export build to GitHub Pages.

## Included functionality

- All integration names and categories supplied in the assignment data
- Search by integration name or category
- Category filtering and result counts
- Integration details modal
- Responsive navigation and layout
- Animated hero and integration cards
- No invented integrations or third-party logo assets

## Data accuracy note

The integration names are rendered as text-based identity marks because official logo files were not supplied. The project intentionally does not introduce additional vendors or change the supplied category assignments.
