<script>
  import { admin } from '../../stores/user'
  import { onMount } from 'svelte'
  import axios from '../../axios-global'
  import { totalTags } from '../../stores/tags'
  import { showMobileMenu } from '../../stores/menu'
  import { add, parseISO } from 'date-fns'
  import format from 'date-fns/format'
  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'
  toastr.options = toastrConfig

  let logs = []
  let loadingLog = false

  const getLogs = async () => {
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/v1/log`)
      if (!response.data.getLog) {
        loadingLog = false
        toastr.warning(response.data.message)
      } else {
        loadingLog = false
        logs = await response.data.result
      }
    } catch (e) {
      loadingLog = false
      if (e.response.status == '500') {
        toastr.error(e.response.statusText)
        console.log(e.response)
      } else {
        console.log(e)
      }
    }
  }
  onMount(async () => {
    loadingLog = true
    showMobileMenu.set(false)
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/v1/count`)
      if (!response.data.count) {
        toastr.warning(response.data.message)
      } else {
        await totalTags.set(response.data.result)
      }
    } catch (e) {
      if (e.response.status == '500') {
        toastr.error(e.response.statusText)
        console.log(e.response)
      } else {
        console.log(e)
      }
    }
    if ($admin.user_type == 3) {
      getLogs()
    }
  })

  // let loadingClearLog = false
  // const clearLogs = async () => {
  //   loadingClearLog = true
  //   if (confirm('Are you sure?')) {
  //     try {
  //       const response = await axios.delete(`${process.env.API_ROOT}/api/v1/log`)
  //       if (!response.data.clearLog) {
  //         loadingClearLog = false
  //         toastr.warning(response.data.message)
  //       } else {
  //         loadingClearLog = false
  //         toastr.success(response.data.message)
  //         getLogs()
  //       }
  //     } catch (e) {
  //       loadingClearLog = false
  //       if (e.response.status == '500') {
  //         toastr.error(e.response.statusText)
  //         console.log(e.response)
  //       } else {
  //         console.log(e)
  //       }
  //     }
  //   }
  // }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>
<div class="section pt-4 pb-0">
  <div class="card">
    <div class="card-header hero is-info welcome is-small">
      <p class="card-header-title is-capitalized is-size-4 title">
        Welcome back, {$admin.name}
      </p>
    </div>
    <div class="card-content">
      <section class="page-contain">
        <a href="/admin/tags" class="data-card">
          <h3>{$totalTags ? $totalTags : '**'}</h3>
          <h4>Vehicle Tags</h4>
          <p>Registered Vehicle Tags</p>
          <span class="link-text">
            View All
            <svg
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z"
                fill="#485FC7"
              />
            </svg>
          </span>
        </a>
      </section>
      {#if $admin.user_type == 3}
        <div class="columns mt-2">
          <div class="column is-12">
            <div class="card events-card">
              <header class="card-header">
                <p class="card-header-title">Event Log</p>
                <!--<a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                  <i class="fa fa-angle-down" aria-hidden="true" />
                </span>
              </a>-->
              </header>
              <div class="card-table">
                <div class="content">
                  <table class="table is-fullwidth is-striped">
                    <thead class="sticky">
                      <tr>
                        <th>Admin</th>
                        <th>Action</th>
                        <th>Parameters</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    {#if loadingLog}
                      <tbody>
                        <tr>
                          <td class="center" colspan="100%">
                            <span> Loading Logs </span>
                          </td>
                        </tr>
                      </tbody>
                    {:else if logs.length === 0}
                      <tbody>
                        <tr>
                          <td class="center" colspan="100%">
                            <span> No Logs To Display </span>
                          </td>
                        </tr>
                      </tbody>
                    {:else}
                      <tbody>
                        {#each logs as log}
                          <tr>
                            <td>{log.user}</td>
                            <td>{log.action}</td>
                            <td>{log.parameters}</td>
                            <td
                              >{format(
                                parseISO(log.created_at),
                                'yyyy-MM-dd HH:mm:ss'
                              )}</td
                            >
                          </tr>
                        {/each}
                        <!-- Special Row
                        <tr>
                          <td width="5%"><i class="fa fa-bell-o"></i></td>
                          <td>Lorum ipsum dolem aire</td>
                          <td class="level-right">
                            <a class="button is-small is-primary" href="#"
                              >Action</a
                            >
                          </td>
                        </tr>-->
                      </tbody>
                    {/if}
                  </table>
                </div>
              </div>
              <footer class="card-footer">
                <div class="card-footer-item">
                  <!--<button
                  class="button is-grey is-small"
                  on:click={clearLogs}
                  class:is-loading={loadingClearLog}>Clear Logs</button
                >-->
                </div>
              </footer>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .sticky {
    background: white;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .hero.welcome.is-info {
    background: #36d1dc;
    background: -webkit-linear-gradient(to right, #485fc7, #36d1dc);
    background: linear-gradient(to right, #485fc7, #36d1dc);
  }
  .hero.welcome .title,
  .hero.welcome .subtitle {
    color: hsl(192, 17%, 99%);
  }

  .card .content {
    font-size: 14px;
  }
  .card-footer-item {
    font-size: 14px;
    font-weight: 700;
    color: #8f99a3;
  }

  .card-table .table {
    margin-bottom: 0;
  }
  .events-card {
    background-color: #eee;
  }
  .events-card .card-table {
    max-height: 250px;
    overflow-y: scroll;
  }

  @media screen and (max-width: 769px) {
    .events-card .card-table {
      max-height: 400px;
    }
  }

  .center {
    text-align: center;
    font-style: italic;
  }

  .center > span {
    padding: 10px 10px;
    float: left;
    width: 100%;
  }

  .page-contain {
    /* display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background: #e7f3f1;
    border: 0.75em solid white;
    padding: 2em; */
    font-family: 'Open Sans', sans-serif;
  }

  .data-card {
    display: flex;
    flex-direction: column;
    max-width: 20.75em;
    min-height: 10.75em;
    overflow: hidden;
    border-radius: 0.5em;
    text-decoration: none;
    background: #eee;
    margin: 1em;
    padding: 2.75em 2.5em;
    box-shadow: 0 1.5em 2.5em -0.5em rgba(0, 0, 0, 0.1);
    transition: transform 0.45s ease, background 0.45s ease;
  }
  .data-card h3 {
    color: #2e3c40;
    font-size: 3.5em;
    font-weight: 600;
    line-height: 1;
    padding-bottom: 0.5em;
    margin: 0 0 0.142857143em;
    border-bottom: 2px solid #485fc7;
    transition: color 0.45s ease, border 0.45s ease;
  }
  .data-card h4 {
    color: #627084;
    text-transform: uppercase;
    font-size: 1.125em;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.1em;
    margin: 0 0 1.777777778em;
    transition: color 0.45s ease;
  }
  .data-card p {
    opacity: 0;
    color: #ffffff;
    font-weight: 600;
    line-height: 1.8;
    margin: 0 0 1.25em;
    transform: translateY(-1em);
    transition: opacity 0.45s ease, transform 0.5s ease;
  }
  .data-card .link-text {
    display: block;
    color: #485fc7;
    font-size: 1.125em;
    font-weight: 600;
    line-height: 1.2;
    margin: auto 0 0;
    transition: color 0.45s ease;
  }
  .data-card .link-text svg {
    margin-left: 0.5em;
    transition: transform 0.6s ease;
  }
  .data-card .link-text svg path {
    transition: fill 0.45s ease;
  }
  .data-card:hover {
    background: #485fc7;
    transform: scale(1.02);
  }
  .data-card:hover h3 {
    color: #ffffff;
    border-bottom-color: #7e8ed7;
  }
  .data-card:hover h4 {
    color: #ffffff;
  }
  .data-card:hover p {
    opacity: 1;
    transform: none;
  }
  .data-card:hover .link-text {
    color: #ffffff;
  }
  .data-card:hover .link-text svg {
    -webkit-animation: point 1.25s infinite alternate;
    animation: point 1.25s infinite alternate;
  }
  .data-card:hover .link-text svg path {
    fill: #ffffff;
  }

  @-webkit-keyframes point {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(0.125em);
    }
  }

  @keyframes point {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(0.125em);
    }
  }
</style>
