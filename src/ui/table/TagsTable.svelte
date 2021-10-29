<script>
  import { createEventDispatcher } from 'svelte'
  import Table, { Pagination, Search, Sort } from '../../ui/table/Table.svelte'
  import { sortNumber, sortString } from '../../ui/table/sorting.js'
  import { admin } from '../../stores/user'

  export let page
  export let pageSize
  export let rows
  export let tableHeaders
  export let openEditModal
  export let openDeleteModal
  export let openTagPrintOut

  function onCellClick(row) {
    alert(JSON.stringify(row))
  }

  function onSortString(event) {
    event.detail.rows = sortString(
      event.detail.rows,
      event.detail.dir,
      event.detail.key
    )
  }

  function onSortNumber(event) {
    event.detail.rows = sortString(
      event.detail.rows,
      event.detail.dir,
      event.detail.key
    )
  }

  let shown = false
  let showIndex = -1

  let dispatch = createEventDispatcher()
  function show(index) {
    shown = !shown
    dispatch('show', shown)
    showIndex = index
  }
</script>

<div class="table-container">
  <Table {page} {pageSize} {rows} let:rows={tags}>
    <thead slot="head">
      <tr class="thead">
        <th> # </th>
        {#each tableHeaders as th, index}
          <th>
            {th}
            &nbsp;&nbsp;
            <Sort
              key={th.toLowerCase().replaceAll(' ', '_')}
              on:sort={onSortString}
            />
          </th>
        {/each}
        {#if $admin.user_type != '0'}
          <th />
        {/if}
        <th />
        {#if $admin.user_type === '3'}
          <th />
        {/if}
      </tr>
    </thead>
    <tbody>
      {#each tags as tag, index (tag)}
        <tr {index} class="thead">
          <td
            >{index + 1}
            <span class="clickable ml-2" on:click={show(index)}>
              <i
                class="arrow"
                class:up={shown && showIndex == index}
                class:down={!(shown && showIndex == index)}
              />
            </span>
          </td>
          <td data-label="staff_name">{tag.tag_no}</td>
          <td data-label="staff_name">{tag.staff_name}</td>
          <td data-label="phone">{tag.phone}</td>
          <td data-label="vehicle_type">{tag.vehicle_type}</td>
          <td data-label="vehicle_color">{tag.vehicle_color}</td>
          <td data-label="vehicle_plate_no">{tag.vehicle_plate_no}</td>
          {#if $admin.user_type != '0'}<td class="center">
              <span
                class="has-text-info icon-style"
                on:click={() => openEditModal(tag)}
              >
                <i class="fa fa-edit" />
              </span>
            </td>
          {/if}
          <td class="center">
            <span
              class="has-text-success icon-style"
              on:click={openTagPrintOut(tag)}
            >
              <i class="fa fa-print" />
            </span>
          </td>
          {#if $admin.user_type === '3'}
            <td>
              <!--<span
                class="button is-danger is-small"
                on:click={openDeleteModal(tag)}
              >
                <i class="fa fa-trash-alt" />
              </span>-->
              <span
                class="has-text-danger icon-style py-1 "
                on:click={openDeleteModal(tag)}
              >
                <i class="fa fa-trash-alt" />
              </span>
            </td>
          {/if}
        </tr>
        {#if shown && showIndex == index}
          <tr class="thead">
            <td colspan="100%">
              <div class="columns">
                <div class="column">
                  <span class="mx-1">Email:</span>
                  <br />
                  <span class="mx-1">Appointment:</span>
                  <br />
                  <span class="mx-1">Department:</span>
                </div>
                <div class="column">
                  <span class="mx-1 has-text-weight-medium">{tag.email}</span>
                  <br />
                  <span class="mx-1 has-text-weight-medium"
                    >{tag.appointment}</span
                  >
                  <br />
                  <span class="mx-1 has-text-weight-medium"
                    >{tag.department}</span
                  >
                </div>
                <div class="column">
                  <span class="mx-1">Vehicle Chasis No :</span>

                  <br />
                  <span class="mx-1">Authorizing Staff:</span>

                  <br />
                  <span class="mx-1">Authorizing Staff Appointment :</span>
                </div>
                <div class="column">
                  <span class="mx-1 has-text-weight-medium"
                    >{tag.vehicle_chasis_no}</span
                  >
                  <br />
                  <span class="mx-1 has-text-weight-medium"
                    >{tag.authorized_staff_name}</span
                  >
                  <br />
                  <span class="mx-1 has-text-weight-medium"
                    >{tag.authorized_staff_appointment}</span
                  >
                </div>
                <div class="column" />
                <div class="column" />
              </div>
            </td>
          </tr>
        {/if}
      {/each}
    </tbody>
  </Table>
</div>

<style>
  .thead {
    font-size: 13px;
  }

  .clickable {
    cursor: pointer;
    padding-left: 1px;
  }
  /* .clickable:hover {
    color: white;
    background-color: #485fc7 !important;
  } */

  .arrow {
    border: solid black;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
  }

  .up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .icon-style {
    font-size: 18px;
    cursor: pointer;
  }

  .center {
    text-align: center;
    font-style: italic;
  }

  @media screen and (max-width: 769px) {
    .thead {
      font-size: 10.5px;
    }
    .clickable {
      padding-left: 0px;
    }
  }
</style>
