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

```

## Notes

`index.vue` performs a redirect to `/movies`.

This redirect was implemented to keep the routing hierarchy modular and scalable.  
The approach follows a **modular routing design**, which allows the application to  
grow with additional sections (e.g. `/cinemas`, `/tickets`) without refactoring the base routes.

**Reasons:**

- Aligns with REST API structure
- Keeps navigation consistent and predictable
- Allows `/` to be reused later as a landing or marketing page
- Implemented with `definePageMeta({ redirect: '/movies' })`, ensuring SSR-friendly behavior
