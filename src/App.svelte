<script>
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
</script>

<main style="overflow: hidden;">
  <Router {routes} />
</main>
