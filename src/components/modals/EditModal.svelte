<script>
  import EmailInput from '../../ui/inputs/EmailInput.svelte'

  export let showModal = false
  export let modalEditAction, tagToEdit, modalCloseAction
  import TextInput from '../../ui/inputs/TextInput.svelte'
</script>

<div class={showModal ? 'modal is-active' : 'modal'}>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Update Tag with Tag No - {tagToEdit.tag_no}
      </p>
      <button class="delete" on:click={modalCloseAction} aria-label="close" />
    </header>
    <section class="modal-card-body is-size-7">
      <div class="field-group">
        <div class="field is-horizontal">
          <TextInput
            label="Name of Car Owner (staff)"
            placeholder="Staff Name"
            bind:val={tagToEdit.staff_name}
          />
          <EmailInput
            labelClass="ml-3"
            inputClass="ml-3"
            label="Email"
            placeholder="Email"
            bind:val={tagToEdit.email}
          />
        </div>
        <div class="field is-horizontal">
          <TextInput
            label="Phone"
            placeholder="Phone"
            bind:val={tagToEdit.phone}
          />
          <TextInput
            labelClass="ml-3"
            inputClass="ml-3"
            label="Department"
            placeholder="Department"
            bind:val={tagToEdit.department}
          />
        </div>
        <div class="field">
          <label for="" class="label">Residential Address</label>
          <div class="control is-expanded">
            <textarea
              bind:value={tagToEdit.address}
              class="textarea"
              placeholder="Residential Address"
              rows="2"
            />
          </div>
        </div>
        <div class="field is-horizontal">
          <TextInput
            label="Appointment"
            placeholder="Appointment"
            bind:val={tagToEdit.appointment}
          />
          <TextInput
            labelClass="ml-3"
            inputClass="ml-3"
            label="Vehicle Plate No"
            placeholder="Vehicle Plate No"
            bind:val={tagToEdit.vehicle_plate_no}
          />
        </div>
        <div class="field is-horizontal">
          <TextInput
            label="Vehicle Model"
            placeholder="Vehicle Model"
            bind:val={tagToEdit.vehicle_model}
          />
          <TextInput
            labelClass="ml-3"
            inputClass="ml-3"
            label="Vehicle Type"
            placeholder="Vehicle Type"
            bind:val={tagToEdit.vehicle_type}
          />
        </div>
        <div class="field is-horizontal">
          <TextInput
            label="Vehicle Color"
            placeholder="Vehicle Color"
            bind:val={tagToEdit.vehicle_color}
          />
          <TextInput
            labelClass="ml-3"
            inputClass="ml-3"
            label="Vehicle Chasis Number"
            placeholder="Vehicle Chasis Number"
            bind:val={tagToEdit.vehicle_chasis_no}
          />
        </div>
        <div class="field is-horizontal">
          <TextInput
            label="Authorizing Staff Name"
            placeholder="Authorizing Staff Name"
            bind:val={tagToEdit.authorized_staff_name}
          />
          <TextInput
            labelClass="ml-3"
            inputClass="ml-3"
            label="Authorizing Staff Appointment"
            placeholder="Authorizing Staff Appointment"
            bind:val={tagToEdit.authorized_staff_appointment}
          />
        </div>
      </div>
    </section>

    <footer class="modal-card-foot">
      <button class="button is-success" on:click={modalEditAction}
        >Update</button
      >
      <button class="button" on:click={modalCloseAction} aria-label="close">
        Cancel</button
      >
    </footer>
  </div>
</div>
