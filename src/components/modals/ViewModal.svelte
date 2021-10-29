<script>
  export let showModal = false
  export let modalCloseAction
  export let showTagData
</script>

<div class={showModal ? 'modal is-active' : 'modal'}>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Tag No : {showTagData.tag_no}</p>
      <button class="delete" on:click={modalCloseAction} aria-label="close" />
    </header>
    <section class="modal-card-body">
      <div class="columns">
        <div class="column">
          <span class="mx-1">Staff Email :</span>
          <span class="mx-1 has-text-weight-medium">{showTagData.email}</span>
          <br />
          <span class="mx-1">Staff Appointment :</span>
          <span class="mx-1 has-text-weight-medium"
            >{showTagData.appointment}</span
          >
          <br />
          <span class="mx-1">Staff Department :</span>
          <span class="mx-1 has-text-weight-medium"
            >{showTagData.department}</span
          >
          <br />
          <span class="mx-1">Staff Address :</span>
          <span class="mx-1 has-text-weight-medium">{showTagData.address}</span>
          <br />
        </div>
        <div class="column">
          <span class="mx-1">Vehicle Chasis No :</span>
          <span class="mx-1 has-text-weight-medium"
            >{showTagData.vehicle_chasis_no}</span
          >
          <br />
          <span class="mx-1">Authorizing Staff:</span>
          <span class="mx-1 has-text-weight-medium"
            >{showTagData.authorized_staff_name}</span
          >
          <br />
          <span class="mx-1">Authorizing Staff Appointment :</span>
          <span class="mx-1 has-text-weight-medium"
            >{showTagData.authorized_staff_appointment}</span
          >
          <br />
          <!-- <span class="mx-1">Staff Address :</span>
          <span class="mx-1 has-text-weight-medium"
            >{showTagData.address}</span
          >
          <br> -->
        </div>
      </div>
    </section>
    <footer class="modal-card-foot" style="justify-content: flex-end;">
      <button
        class="button is-pulled-right"
        on:click={modalCloseAction}
        aria-label="close"
      >
        Close</button
      >
    </footer>
  </div>
</div>
