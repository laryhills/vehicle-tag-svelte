<script>
  import { navigateTo } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import axios from '../../axios-global'
  import * as yup from 'yup'
  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'
  import { admin } from '../../stores/user'
  import { convertAccessType } from '../../functions/utilities'
  import { showMobileMenu } from '../../stores/menu'

  toastr.options = toastrConfig

  let user = {}
  let initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_type: '',
  }
  let values = initialValues

  let errors = {}
  let loadingAddAmin = false
  let loadingAdminList = false

  let adminList = []
  let tableHeaders = ['Name', 'Email', 'Access Level', 'Status']

  onMount(async () => {
    showMobileMenu.set(false)
    await admin.subscribe((value) => (user = value))
    if (user.user_type != 3) {
      toastr.warning('You are not authorized to view page !')
      navigateTo('/')
    }
    loadAdminList()
  })

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    // password: yup.string().password().required('Password is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(
        /^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least one uppercase, one number and one special case character'
      ),
    password_confirmation: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
    user_type: yup.string().required('User Type is required'),
  })

  const addAdmin = async () => {
    loadingAddAmin = true
    try {
      await schema.validate(values, { abortEarly: false })
      try {
        const response = await axios.post(
          `${process.env.API_ROOT}/api/register`,
          values
        )
        if (!response.data.register) {
          loadingAddAmin = false
          toastr.error('An Error Occurred')
        } else {
          loadingAddAmin = false
          loadAdminList()
          await toastr.success(response.data.message)
          values = initialValues
        }
        errors = {}
      } catch (e) {
        loadingAddAmin = false
        let status = await e.response.status
        if (status == 422) {
          toastr.error(e.response.data.errors.email.toString())
        }
      }
    } catch (err) {
      loadingAddAmin = false
      if (typeof err !== 'undefined') {
        errors = err.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message }
        }, {})
      }
    }
  }

  const loadAdminList = async () => {
    loadingAdminList = true
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/users`)
      adminList = await response.data
      adminList = await adminList.filter(function (obj) {
        return obj.id !== user.id
      })
      loadingAdminList = false
    } catch (e) {
      loadingAdminList = false
      console.log(e)
    }
  }

  const updateAdmin = async (adminData) => {
    // adminData.status = !adminData.status
    try {
      const response = await axios.put(
        `${process.env.API_ROOT}/api/user/${adminData.id}`,
        adminData
      )
      if (!response.data.update) {
        toastr.error('An Error Occurred')
      } else {
        await toastr.success(response.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }
</script>

<svelte:head>
  <title>Manage Admin</title>
</svelte:head>
<div class="section pt-4 pb-0">
  <div class="card">
    <div class="card-header"><p class="card-header-title">Add Admin</p></div>
    <div class="card-content">
      <div class="content" />
      <form action="" on:submit|preventDefault={addAdmin} autocomplete="off">
        <div class="field-group">
          <div class="field is-inline-block-desktop mx-1">
            <label for="" class="label">Name</label>
            <div class="control has-icons-left">
              <input
                bind:value={values.name}
                type="text"
                placeholder="e.g. John Doe"
                class="input is-small"
                class:is-danger={errors.name}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope" />
              </span>
            </div>
            {#if errors.name}
              <p class="help is-danger">{errors.name}</p>
            {:else if errors}
              <p class="help">&nbsp;</p>
            {/if}
          </div>
          <div class="field is-inline-block-desktop mx-1">
            <label for="" class="label">Email</label>
            <div class="control has-icons-left">
              <input
                bind:value={values.email}
                type="email"
                placeholder="e.g. bobsmith@gmail.com"
                class="input is-small"
                class:is-danger={errors.email}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-envelope" />
              </span>
            </div>
            {#if errors.email}
              <p class="help is-danger">{errors.email}</p>
            {:else if errors}
              <p class="help">&nbsp;</p>
            {/if}
          </div>
          <div class="field is-inline-block-desktop mx-3">
            <label for="" class="label">Access Level</label>
            <div class="control has-icons-left">
              <div class="select  is-small is-fullwidth">
                <select bind:value={values.user_type}>
                  <option selected value="">Choose ...</option>
                  <option value="0">Checker Admin</option>
                  <option value="1">Data Entry Admin</option>
                  <option value="2">Stats Admin</option>
                </select>
              </div>
              <span class="icon is-small is-left">
                <i class="fa fa-users-cog" />
              </span>
            </div>
            {#if errors.user_type}
              <p class="help is-danger">{errors.user_type}</p>
            {:else if errors}
              <p class="help">&nbsp;</p>
            {/if}
          </div>
          <br />
          <div class="field is-inline-block-desktop mx-1">
            <label for="" class="label">Password</label>
            <div class="control has-icons-left">
              <input
                bind:value={values.password}
                type="password"
                placeholder="*******"
                class="input is-small"
                class:is-danger={errors.password}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-lock" />
              </span>
            </div>
            {#if errors.password}
              <p class="help is-danger">{errors.password}</p>
            {:else if errors}
              <p class="help">&nbsp;</p>
            {/if}
          </div>
          <div class="field is-inline-block-desktop mx-1 ml-2">
            <label for="" class="label">Confirm Password</label>
            <div class="control has-icons-left">
              <input
                bind:value={values.password_confirmation}
                type="password"
                placeholder="*******"
                class="input is-small"
                class:is-danger={errors.password_confirmation ||
                  errors.password}
              />
              <span class="icon is-small is-left">
                <i class="fa fa-lock" />
              </span>
            </div>
            {#if errors.password_confirmation}
              <p class="help is-danger">{errors.password_confirmation}</p>
            {:else if errors}
              <p class="help">&nbsp;</p>
            {/if}
          </div>
          <div class="field">
            <button
              class="button is-success is-small"
              class:is-loading={loadingAddAmin}
              type="submit"
            >
              <span class="icon is-small mr-1">
                <i class="fa fa-user" />
              </span>
              Add Admin
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<div class="section pt-4 pb-0">
  <div class="card">
    <div class="card-header"><p class="card-header-title">Manage Admin</p></div>
    <div class="card-content">
      <div class="content">
        {#if adminList.length !== 0}
          <div class="table-container">
            <table
              class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
              <thead class="is-primary has-text-centered">
                <tr>
                  {#each tableHeaders as th}
                    <th>{th}</th>
                  {/each}
                </tr>
              </thead>
              <tbody>
                {#each adminList as admin_}
                  <tr class="has-text-centered">
                    <td class="py-2">{admin_.name}</td>
                    <td class="py-2">{admin_.email}</td>
                    <td>
                      <div class="select">
                        <select
                          bind:value={admin_.user_type}
                          on:change={updateAdmin(admin_)}
                        >
                          <option value="0">Checker Admin</option>
                          <option value="1">Data Entry Admin</option>
                          <option value="2">Stats Admin</option>
                        </select>
                      </div>
                    </td>
                    <td>
                      <!--<input type="checkbox" bind:checked={admin_.status} />-->
                      <div class="field">
                        <label for="switchExample" />
                        <input
                          id="switchSmall"
                          type="checkbox"
                          name="switchSmall"
                          class="switch is-small"
                          bind:checked={admin_.status}
                          on:change={updateAdmin(admin_)}
                        />
                        <label for="switchSmall" />
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<style type="text/scss">
  @import '../../styles/bulma-switch.sass';
  * {
    font-size: 0.85rem;
  }
</style>
