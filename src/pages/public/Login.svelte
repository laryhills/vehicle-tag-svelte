<script>
  import { navigateTo } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import axios from 'axios'
  import * as yup from 'yup'
  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'

  toastr.options = toastrConfig
  onMount(async () => {
    // if (document.cookie.indexOf('jwt') == -1) {
    //   // navigateTo('/')
    //   console.log(document.cookie.indexOf('jwt'))
    // }
  })

  let loadingLogin = false

  let values = {
    email: '',
    password: '',
  }
  let errors = {}

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required'),
  })

  // Login User
  const login = async () => {
    loadingLogin = true
    try {
      await schema.validate(values, { abortEarly: false })
      try {
        const response = await axios.post(
          `${process.env.API_ROOT}/api/v1/login`,
          values,
          {
            withCredentials: true,
          }
        )
        if (!response.data.login) {
          loadingLogin = false
          toastr.error(response.data.message)
        } else {
          loadingLogin = false
          await toastr.success(response.data.message)
          navigateTo('/')
        }
        errors = {}
      } catch (e) {
        loadingLogin = false
        toastr.error('An Error Occurred!')
        console.log(e)
        console.log(e.response)
      }
    } catch (err) {
      loadingLogin = false
      errors = err.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message }
      }, {})
    }
  }
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section class="hero is-dark is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-6-desktop is-4-widescreen">
          <form action="" class="box" on:submit|preventDefault={login}>
            <div class="has-text-centered">
              <img
                src="/images/logo.png"
                alt="brand-logo"
                class="is-fullwidth"
                style="max-height:55px;"
              />
              <h1>Vehicle Tagging System</h1>
            </div>
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input
                  bind:value={values.email}
                  type="email"
                  placeholder="e.g. bobsmith@gmail.com"
                  class="input"
                  class:is-danger={errors.email}
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope" />
                </span>
              </div>
              {#if errors.email}
                <p class="help is-danger">{errors.email}</p>
              {/if}
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input
                  bind:value={values.password}
                  type="password"
                  placeholder="*******"
                  class="input"
                  class:is-danger={errors.password}
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock" />
                </span>
              </div>
              {#if errors.password}
                <p class="help is-danger">{errors.password}</p>
              {/if}
            </div>
            <div class="field">
              <!--  <label for="" class="checkbox">
                <input type="checkbox" />
                Remember me
              </label>-->
            </div>
            <div class="field">
              <button
                class="button is-fullwidth is-success"
                class:is-loading={loadingLogin}
                type="submit"
              >
                <span class="icon is-small mr-1">
                  <i class="fa fa-user" />
                </span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

<!--<style>
  .success {
    color: hsl(141, 53%, 53%) !important;
  }
</style>-->
