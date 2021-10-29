<script>
  import { onMount } from 'svelte'
  import QRCode from 'easyqrcodejs'

  export let text
  export let className
  let node

  onMount(() => {
    const options = {
      text: text,
      // ... your other options
      width: 240, // Widht
      height: 240, // Height
      quietZone: 10,
      logo: '/images/afit_logo.png',
    }
    new QRCode(node, options)
  })
</script>

<div class={className} bind:this={node} />

<style>
  div {
    /* make QR-wrapper squared */
    width: 100%;
    position: relative;
    z-index: 1;
  }
  div :global(canvas) {
    /* fit QR to wrapper */
    /*width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;*/
  }
</style>
