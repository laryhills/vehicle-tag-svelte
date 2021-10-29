<script>
  import { routeIsActive, Navigate } from 'svelte-router-spa'
  export let route = {}
  export let currentRoute
  let isActive = false
  $: isActive =
    currentRoute.childRoute && route.path && routeIsActive(route.path, true)
</script>

<li class="navbar-item is-hidden-desktop">
  <Navigate
    to={route.path}
    title={route.label}
    styles={isActive ? 'is-active' : ''}
  >
    <span class="icon is-small mr-1">
      <i class={route.icon} />
    </span>
    {route.label}
  </Navigate>
</li>
