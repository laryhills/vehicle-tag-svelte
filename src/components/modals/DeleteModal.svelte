<script>
  export let showModal = false
  export let modalDeleteAction, modalText, modalCloseAction
</script>

<div class={showModal ? 'modal is-active' : 'modal'}>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Warning</p>
      <button class="delete" on:click={modalCloseAction} aria-label="close" />
    </header>
    <section class="modal-card-body">
      {modalText}
    </section>
    <footer class="modal-card-foot">
      <button class="button is-danger" on:click={modalDeleteAction}
        >Continue</button
      >
      <button class="button" on:click={modalCloseAction} aria-label="close">
        Cancel</button
      >
    </footer>
  </div>
</div>
