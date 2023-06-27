<script>
  import { navigateTo } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import axios from '../../axios-global'
  import * as yup from 'yup'
  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'
  import { admin } from '../../stores/user'
  import TextInput from '../../ui/inputs/TextInput.svelte'
  import EmailInput from '../../ui/inputs/EmailInput.svelte'
  import { showMobileMenu } from '../../stores/menu'

  toastr.options = toastrConfig

  let user = {}
  let initialValues = {
    tag_no: '',
    staff_name: '',
    email: '',
    phone: '',
    appointment: '',
    department: '',
    address: '',
    vehicle_type: '',
    vehicle_model: '',
    vehicle_color: '',
    vehicle_plate_no: '',
    vehicle_chasis_no: '',
    authorized_staff_name: '',
    authorized_staff_appointment: '',
    slug: '',
  }
  let values = initialValues
  let errors = {}
  let loadingAddTag = false

  onMount(async () => {
    showMobileMenu.set(false)
    await admin.subscribe((value) => (user = value))
    if (user.user_type < 1) {
      toastr.warning('You are not authorized to view page !')
      navigateTo('/')
    }
  })

  const schema = yup.object().shape({
    tag_no: yup.string().required('Tag No is required'),
    staff_name: yup.string().required('Staff Name is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    phone: yup
      .string()
      .required('Phone is required')
      .matches(/^.*(?=.*\d{11,}).*$/, 'This does not look like a phone number'),
    appointment: yup.string().required('Appointment is required'),
    department: yup.string().required('Department is required'),
    address: yup.string().required('Address is required'),
    vehicle_type: yup.string().required('Vehicle Type is required'),
    vehicle_model: yup.string().required('Vehicle Model is required'),
    vehicle_color: yup.string().required('Vehicle Color is required'),
    vehicle_plate_no: yup.string().required('Vehicle Plate No is required'),
    vehicle_chasis_no: yup.string().required('Vehicle Chasis No is required'),
    authorized_staff_name: yup
      .string()
      .required('Authorizing Staff is required'),
    authorized_staff_appointment: yup
      .string()
      .required('Authorizing Staff Appointment is required'),
  })

  const addTag = async () => {
    loadingAddTag = true
    try {
      await schema.validate(values, { abortEarly: false })
      values.slug = values.tag_no.toLowerCase()
      try {
        const response = await axios.post(
          `${process.env.API_ROOT}/api/v1/tags`,
          values
        )
        if (!response.data.creation) {
          loadingAddTag = false
          toastr.error('An Error Occurred')
        } else {
          loadingAddTag = false
          await toastr.success(response.data.message)
          values = initialValues
        }
        errors = {}
        values = initialValues
      } catch (e) {
        loadingAddTag = creation
        let status = await e.response.status
        console.log(e.response)
      }
    } catch (err) {
      loadingAddTag = false
      if (typeof err !== 'undefined') {
        errors = err.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message }
        }, {})
      }
    }
  }
</script>

<svelte:head>
  <title>Add Vehicle Tag</title>
</svelte:head>
<div class="section pt-4 pb-0">
  <div class="card">
    <div class="card-header"><p class="card-header-title">Add Tag</p></div>
    <div class="card-content">
      <div class="content">
        <form action="" on:submit|preventDefault={addTag} autocomplete="off">
          <div class="field-group">
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Tag No"
              placeholder="Tag No"
              bind:val={values.tag_no}
              error={errors.tag_no}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Name of Car Owner (staff)"
              placeholder="Full Staff Name"
              bind:val={values.staff_name}
              error={errors.staff_name}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Phone Number"
              placeholder="Phone Number(s)"
              bind:val={values.phone}
              error={errors.phone}
              {errors}
            />
            <EmailInput
              className="is-inline-block-desktop mx-1"
              label="Email"
              placeholder="Email"
              bind:val={values.email}
              error={errors.email}
              {errors}
            />
            <div class="field  mx-1">
              <label for="" class="label">Residential Address</label>
              <div class="control is-expanded">
                <textarea
                  on:keyup={() => (errors.address = null)}
                  bind:value={values.address}
                  class:is-danger={errors.address}
                  class="textarea"
                  placeholder="Residential Address"
                  rows="2"
                />
              </div>
              {#if errors.address}
                <p class="help is-danger">{errors.address}</p>
              {:else if errors}
                <p class="help">&nbsp;</p>
              {/if}
            </div>
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Department"
              placeholder="Department"
              bind:val={values.department}
              error={errors.department}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Appointment"
              placeholder="Appointment"
              bind:val={values.appointment}
              error={errors.appointment}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Vehicle Type"
              placeholder="Vehicle Type"
              bind:val={values.vehicle_type}
              error={errors.vehicle_type}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Vehicle Model"
              placeholder="Vehicle Model"
              bind:val={values.vehicle_model}
              error={errors.vehicle_model}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Vehicle Color"
              placeholder="Vehicle Color"
              bind:val={values.vehicle_color}
              error={errors.vehicle_color}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Vehicle Plate Number"
              placeholder="Vehicle Plate Number"
              bind:val={values.vehicle_plate_no}
              error={errors.vehicle_plate_no}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Vehicle Chasis Number"
              placeholder="Vehicle Chasis Number"
              bind:val={values.vehicle_chasis_no}
              error={errors.vehicle_chasis_no}
              {errors}
            />
            <br />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Authorizing Staff Name"
              placeholder="Authorizing Staff Name"
              bind:val={values.authorized_staff_name}
              error={errors.authorized_staff_name}
              {errors}
            />
            <TextInput
              className="is-inline-block-desktop mx-1"
              label="Authorizing Staff Appointment"
              placeholder="Authorizing Staff Appointment"
              bind:val={values.authorized_staff_appointment}
              error={errors.authorized_staff_appointment}
              {errors}
            />

            <div class="field">
              <button
                class="button is-success "
                class:is-loading={loadingAddTag}
                type="submit"
              >
                <span class="icon  mr-1">
                  <i class="fa fa-tag" />
                </span>
                Add Vehicle Tag
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
