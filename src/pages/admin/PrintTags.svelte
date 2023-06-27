<script>
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import axios from '../../axios-global'

  import QR from '../../ui/QR.svelte'

  import pdfMake from 'pdfmake/build/pdfmake'
  import pdfFonts from '../../ui/pdfFonts/vfs_fonts.js'

  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'
  toastr.options = toastrConfig

  pdfMake.vfs = pdfFonts

  let auth = false
  let tags = []
  const loadTagsData = async () => {
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/v1/tags`)
      if (!response.data.get) {
        toastr.warning(response.data.message)
      } else {
        tags = await response.data.result
        toastr.success(response.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  onMount(async () => {
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/v1/users`)
      const user = await response.data
      auth = true
    } catch (e) {
      toastr.error('Token Expired')
      navigateTo('login')
    }
    await loadTagsData()
  })
</script>

<svelte:head>
  <title>Print Tag</title>
</svelte:head>

<div class="columns is-multiline">
  {#each tags as tag}
    <div class="column is-one-third qr-container">
      <QR
        className={'has-text-centered'}
        text={`${window.location.origin}/tag/${tag.tag_no}`}
      />
      <div class="has-text-centered">TAG : {tag.tag_no}</div>
    </div>
  {/each}
</div>

<style>
  .qr-container {
    width: 50%;
  }

  @media screen and (max-width: 769px) {
    .qr-container {
      width: 100%;
    }
  }
</style>
