<svelte:options accessors={true} />

<script>
  import { createEventDispatcher } from 'svelte'

  let shown = false

  let dispatch = createEventDispatcher()

  export function show() {
    shown = !shown
    dispatch('show', shown)
  }
</script>

<!-- <button on:click={show}>Child's button</button> -->

{#if shown}
  <slot />
{/if}
