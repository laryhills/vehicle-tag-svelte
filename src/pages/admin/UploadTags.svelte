<script>
  import { navigateTo } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import axios from '../../axios-global'
  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'
  import { admin } from '../../stores/user'
  import XLSX from 'xlsx'
  import { showMobileMenu } from '../../stores/menu'

  toastr.options = toastrConfig

  let user = {}
  let loadingAddTag = false

  onMount(async () => {
    showMobileMenu.set(false)
    await admin.subscribe((value) => (user = value))
    if (user.user_type < 1) {
      toastr.warning('You are not authorized to view page !')
      navigateTo('/')
    }
  })

  let uploadedTags = 0
  let files
  let columns
  let items

  const handleFileClick = async (dataURL, fileName) => {
    const downloadLink = document.createElement('a')
    downloadLink.href = dataURL
    downloadLink.download = fileName
    downloadLink.click()
  }

  const uploadData = async () => {
    loadingAddTag = true
    if (!files) {
      loadingAddTag = false
      toastr.error('Please Upload a File')
      return
    }
    let file = files[0]
    try {
      const reader = await new FileReader()
      reader.onload = function (e) {
        const result = e.target.result
        const workbook = XLSX.read(result, {
          type: 'binary',
        })
        workbook.SheetNames.forEach(async (sheetName) => {
          if (sheetName != 'tags') {
            loadingAddTag = false
            toastr.error('Uploaded File is does not look like Tags upload File')
            return
          }
          const rowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets['tags']
          )
          if (rowObject.length == 0) {
            loadingAddTag = false
            toastr.error('Uploaded File is empty')
            return
          }

          // extracting headers
          const keys = Object.keys(rowObject[0]).map((col) => {
            return col.replaceAll('_', ' ').toUpperCase()
          })

          // check excel file with valid headers
          if (
            !(
              keys[0] == 'TAG NO' &&
              keys[1] == 'STAFF NAME' &&
              keys[10] == 'VEHICLE PLATE NO' &&
              keys[13] == 'AUTHORIZED STAFF APPOINTMENT'
            )
          ) {
            loadingAddTag = false
            toastr.error('Uploaded File is does not look like Tags upload File')
            return
          }

          columns = await keys
          items = rowObject

          // check if avaliable first
          // MAKE BACKEND ACCEPT ARRAY AND USE stores to check tags
          for (let tag of items) {
            try {
              let response = await axios.get(
                `${process.env.API_ROOT}/api/tags/${tag.tag_no}`
              )
              if (!response.data.find) {
                // upload to database
                try {
                  tag.slug = tag.tag_no.toLowerCase()
                  const response = await axios.post(
                    `${process.env.API_ROOT}/api/tags`,
                    tag
                  )
                  if (!response.data.creation) {
                    // loadingAddTag = false
                    // toastr.error('An Error Occurred')
                    continue
                  } else {
                    // uploaded
                    uploadedTags += 1
                  }
                } catch (e) {
                  console.log(e)
                  console.log(e.response)
                }
              } else {
                // skip iteration
                continue
              }
            } catch (e) {
              console.log(e.response)
            }
          }
          let text =
            uploadedTags == 1
              ? `${uploadedTags} Tag Uploaded`
              : `${uploadedTags} Tags Uploaded`
          if (uploadedTags == 0) {
            toastr.warning('No Tag Uploaded')
          } else {
            toastr.success(text)
          }

          loadingAddTag = false
          uploadedTags = 0
        })
      }
      reader.onerror = function (e) {
        loadingAddTag = false
        console.error(e)
      }
      reader.readAsBinaryString(file)
    } catch (e) {
      loadingAddTag = false
      console.log(e)
    }
  }
</script>

<svelte:head>
  <title>Upload Vehicle Tags</title>
</svelte:head>
<div class="section pt-4 pb-0">
  <div class="card">
    <div class="card-header">
      <div class="card-header-title title-special">
        <div>Upload Vehicle Tags</div>
        <div>
          <!--<a href="/docs/upload_template.xlsx" download>
            Save This As To Download Excel Template
          </a>-->
          <button
            on:click={() =>
              handleFileClick(
                `/docs/upload_template.xlsx`,
                `Upload tags template.pdf`
              )}>Download Excel Template</button
          >
        </div>
      </div>
    </div>
    <div class="card-content">
      <div class="content">
        <br />

        <form
          action=""
          on:submit|preventDefault={uploadData}
          autocomplete="off"
          enctype="multipart/form-data"
        >
          <div class="field-group">
            <div class="field is-inline-block-desktop mx-1">
              <label for="" class="label">Upload Excel File</label>
              <div class="control">
                <input
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  bind:files
                />
              </div>
            </div>

            <div class="field">
              <button
                class="button is-success "
                class:is-loading={loadingAddTag}
                type="submit"
              >
                <span class="icon  mr-1">
                  <i class="fa fa-upload" />
                </span>
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .title-special {
    justify-content: space-between;
  }
</style>
