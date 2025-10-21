## **Setup**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview

# Run all unit and integration tests
npm run test

# Run tests once in headless mode
npm run test:run

# Open Vitest’s visual test runner in the browser
npm run test:ui
```

## Notes

`index.vue` performs a redirect to `/movies`.

This redirect was implemented to keep the routing hierarchy modular and scalable.  
The approach follows a modular routing design, which allows the application to  
grow with additional sections (e.g. `/cinemas`, `/tickets`) without refactoring the base routes.

**Reasons:**

- Aligns with REST API structure
- Keeps navigation consistent and predictable
- Allows `/` to be reused later as a landing or marketing page
- Implemented with `definePageMeta({ redirect: '/movies' })`, ensuring SSR-friendly behavior

## Environment Configuration

Before running the application for the first time, make sure to set up your environment variables.
Copy and configure .env and create a development environment file

```bash
cp .env.example .env
cp .env .env.development
```
