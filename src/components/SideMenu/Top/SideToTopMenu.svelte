<script>
  import SideToTopMenuItem from './SideToTopMenuItem.svelte'
  export let currentRoute
  export let adminRoutes
</script>

{#each adminRoutes as groupRoute}
  <p class="menu-label pl-2 is-hidden-desktop">{groupRoute.group}</p>
  {#each groupRoute.routes as route}
    {#if !route.isExcludedFromNav}
      <SideToTopMenuItem {route} {currentRoute} />
    {/if}
  {/each}
{/each}
