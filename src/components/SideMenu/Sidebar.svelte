<script>
  import SidebarMenuItem from './SidebarMenuItem.svelte'
  export let currentRoute
  export let adminRoutes
</script>

<aside
  class="column is-2 is-narrow-mobile is-fullheight section is-hidden-touch"
>
  <ul class="menu-list">
    {#each adminRoutes as groupRoute}
      <p class="menu-label">{groupRoute.group}</p>
      {#each groupRoute.routes as route}
        {#if !route.isExcludedFromNav}
          <SidebarMenuItem {route} {currentRoute} />
        {/if}
      {/each}
    {/each}
  </ul>
</aside>

<style>
  @media screen and (min-width: 1024px) {
    .section {
      padding: 3rem 1.5rem;
    }
  }
</style>
