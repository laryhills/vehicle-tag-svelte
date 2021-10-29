<script>
  import { Route } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import { admin } from '../../stores/user'
  import { authenticated } from '../../stores/auth'
  import { totalTags } from '../../stores/tags'
  import { showMobileMenu } from '../../stores/menu'
  import axios from '../../axios-global'
  import Sidebar from '../../components/SideMenu/Sidebar.svelte'
  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'
  import SideToTopMenu from '../../components/SideMenu/Top/SideToTopMenu.svelte'
  import { adminRoutes } from '../../functions/utilities'

  toastr.options = toastrConfig

  export let currentRoute

  onMount(async () => {
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/user`)
      const user = await response.data
      admin.set(user)
      authenticated.set(true)
    } catch (e) {
      authenticated.set(false)
      toastr.error('Token Expired')
      navigateTo('login')
    }
  })

  const logout = async () => {
    try {
      // clear all store values
      authenticated.set(false)
      admin.set({})
      totalTags.set(null)

      await axios.post(`${process.env.API_ROOT}/api/logout`)
      navigateTo('login')
    } catch (e) {
      console.log(e)
    }
  }

  const handleMobileMenu = () => {
    showMobileMenu.set(!$showMobileMenu)
  }
</script>

{#if $authenticated}
  <nav class="navbar is-dark is-fixed-top">
    <div class="navbar-brand">
      <a href="/" class="navbar-item">
        <img
          src="/images/afit_logo1.png"
          alt="brand-logo"
          style="max-height:45px;"
        />
      </a>
      <li class="navbar-burger" on:click={handleMobileMenu}>
        <span class="mt-2" />
        <span class="mt-2" />
        <span class="mt-2" />
      </li>
    </div>

    <div class="navbar-menu" class:is-active={$showMobileMenu}>
      <div class="navbar-end">        
        <SideToTopMenu {adminRoutes} {currentRoute} />
        <div class="navbar-item has-dropdown is-hoverable">
          <div class="navbar-link is-arrowless">
            <span class="icon is-small mr-1">
              <i class="fa fa-user-alt" aria-hidden="true" />
            </span>
          </div>
          <ul class="navbar-dropdown is-right">
            <li class="navbar-item">
              <span class="icon is-small mr-1">
                <i class="fa fa-user-alt" aria-hidden="true" />
              </span>
              {$admin.email}
            </li>
            <hr class="navbar-divider" />
            <li class="navbar-item clickable" on:click={() => logout()}>
              <span class="icon is-small mr-1">
                <i class="fa fa-sign-out-alt" aria-hidden="true" />
              </span>
              Logout
            </li>
          </ul>
        </div>
        <li class="navbar-item is-hidden-touch">&nbsp;</li>
      </div>
    </div>
  </nav>
  <section class="main-content columns is-fullheight extra ">
    <Sidebar {adminRoutes} {currentRoute} />
    <div class="container column is-10">
      <div class="section mt-5 forMobile">
        <Route {currentRoute} restoreScrollState={true} />
      </div>
    </div>
  </section>
{/if}

<style>
  * {
    font-size: 0.85rem;
  }

  .extra {
    padding-top: 35px;
  }

  .clickable {
    cursor: pointer;
  }
  .clickable:hover {
    background-color: #eaeaea;
  }

  .is-arrowless {
    padding-right: 0.75rem;
  }
  .is-arrowless::after {
    border: 0px solid transparent;
  }
  @media screen and (min-width: 1024px) {
    .section {
      padding: 3rem 1.5rem;
    }
    .extra {
      padding-top: 15px;
    }
  }

  @media screen and (max-width: 769px) {
    .forMobile {
      padding: 0rem !important;
    }
  }
</style>
