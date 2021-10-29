<script context="module">
  let globalLabels

  export function setLabels(labels) {
    globalLabels = labels
  }
</script>

<script>
  import { createEventDispatcher, getContext } from 'svelte'
  const dispatch = createEventDispatcher()
  const stateContext = getContext('state')

  export let filter = (row, text, index) => {
    text = text.toLowerCase()
    for (let i in row) {
      if (row[i] === null) {
      } else {
        if (row[i].toString().toLowerCase().indexOf(text) > -1) {
          return true
        }
      }
    }
    return false
  }
  export let index = -1
  export let text = ''

  export let labels = {
    placeholder: 'Search',
    ...globalLabels,
  }

  async function onSearch(event) {
    const state = stateContext.getState()
    const detail = {
      originalEvent: event,
      filter,
      index,
      text,
      page: state.page,
      pageIndex: state.pageIndex,
      pageSize: state.pageSize,
      rows: state.filteredRows,
    }
    dispatch('search', detail)

    if (detail.preventDefault !== true) {
      if (detail.text.length === 0) {
        stateContext.setRows(state.rows)
      } else {
        stateContext.setRows(
          detail.rows.filter((r) => detail.filter(r, detail.text, index))
        )
      }
      stateContext.setPage(0, 0)
    } else {
      stateContext.setRows(detail.rows)
    }
  }
</script>

<div class="field is-inline-block-desktop mx-1 is-pulled-right">
  <div class="control has-icons-left">
    <input
      bind:value={text}
      type="text"
      placeholder={labels.placeholder}
      class="input no-border mb-2"
      on:keyup={onSearch}
    />
    <span class="icon is-small is-left">
      <i class="fa fa-search" />
    </span>
  </div>
</div>

<style>
  .search {
    width: 33.3%;
    float: right;
  }
  .search input {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 5px 3px;
  }

  .no-border {
    border: none;
  }

  @media screen and (max-width: 767px) {
    .search {
      width: 100%;
    }
  }
</style>
