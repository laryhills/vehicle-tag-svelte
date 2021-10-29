<script>
  export let className = ''
  export let label
  export let labelClass = ''
  export let inputClass = ''
  export let error = ''
  export let placeholder = ''
  export let errors = {}
  export let val
</script>

<div class="field {className}">
  <label for="" class="label {labelClass}">{label}</label>
  <div class="control">
    <input
      on:keyup={() => (error = null)}
      bind:value={val}
      type="text"
      {placeholder}
      class="input {inputClass}"
      class:is-danger={error}
    />
  </div>
  {#if error}
    <p class="help is-danger">{error}</p>
  {:else if errors}
    <p class="help">&nbsp;</p>
  {/if}
</div>
