<script>
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import { authenticated } from '../../stores/auth'
  import axios from '../../axios-global'
  // import Table, { Pagination, Search, Sort } from '../../ui/table/Table.svelte'
  // import { sortNumber, sortString } from '../../ui/table/sorting.js'
  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'
  import EditModal from '../../components/modals/EditModal.svelte'
  import DeleteModal from '../../components/modals/DeleteModal.svelte'
  // import { createEventDispatcher } from 'svelte'
  import { admin } from '../../stores/user'
  import { showMobileMenu } from '../../stores/menu'
  import TagsTable from '../../ui/table/TagsTable.svelte'

  toastr.options = toastrConfig

  let auth = false
  let rows = []
  let page = 0 //first page
  let pageSize = 6 //optional, 10 by default
  let tableHeaders = [
    'Tag No',
    'Staff Name',
    // 'Email',
    'Phone',
    // 'Appointment',
    // 'Department',
    // 'Address',
    'Vehicle Type',
    // 'Vehicle Model',
    'Vehicle Color',
    'Vehicle Plate No',
    // 'Vehicle Chasis No',
    // 'Authorizing Staff',
    // 'Authorizing Staff Appointment',
  ]

  const loadTagsData = async () => {
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/tags`)
      if (!response.data.get) {
        toastr.warning(response.data.message)
      } else {
        rows = await response.data.result
        toastr.success(response.data.message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  // auto updateTags
  // const autoLoad = async () => {
  //   await new Promise((f) => setTimeout(f, 2000))
  // }

  authenticated.subscribe((value) => (auth = value))
  onMount(async () => {
    showMobileMenu.set(false)
    if (!auth) {
      authenticated.set(false)
      navigateTo('login')
    }
    await loadTagsData()
  })

  // let showViewModal = false
  let showEditModal = false
  let tagToEdit = {}
  let showDeleteModal = false
  let tagToDelete = {}

  const openEditModal = (tag) => {
    tagToEdit = tag
    showEditModal = true
  }
  const openViewModal = (tag) => {
    showTagData = tag
    showViewModal = true
  }

  const closeViewModal = () => {
    showViewModal = false
  }

  const closeEditModal = () => {
    showEditModal = false
  }

  const openDeleteModal = (tag) => {
    tagToDelete = tag
    showDeleteModal = true
  }

  const closeDeleteModal = () => {
    showDeleteModal = false
  }

  const updateTag = async (updatedTag) => {
    closeEditModal()
    try {
      const response = await axios.put(
        `${process.env.API_ROOT}/api/tags/${updatedTag.id}`,
        updatedTag
      )
      if (!response.data.update) {
        toastr.error('An Error Occurred')
      } else {
        await toastr.success(response.data.message)
        const tagToUpdateIndex =
          rows[rows.findIndex((x) => x.id === updatedTag.id)]
        rows[tagToUpdateIndex] = updatedTag
        rows = rows
        tagToEdit = {}
      }
      /* alternate method
      let tagToUpdate = rows.find((o, i) => {
        if (o.id === updatedTag.id) {
          rows[i] = updatedTag

          toastr.success(`Updated Tag`)
        }
      }) */
    } catch (e) {
      console.log(e)
    }
  }

  const deleteTag = async (tag) => {
    closeDeleteModal()
    const id = tag.id
    try {
      const response = await axios.delete(
        `${process.env.API_ROOT}/api/tags/${id}`
      )
      if (!response.data.delete) {
        toastr.error('An Error Occurred')
      } else {
        toastr.warning(`Deleted Tag No ${tag.tag_no}`)
        const deletedIndex = rows.findIndex((x) => x.id === id)
        rows.splice(deletedIndex, 1)
        rows = rows

        tagToDelete = {}
      }
    } catch (e) {
      console.log(e)
    }
  }

  // function onCellClick(row) {
  //   alert(JSON.stringify(row))
  // }

  // function onSortString(event) {
  //   event.detail.rows = sortString(
  //     event.detail.rows,
  //     event.detail.dir,
  //     event.detail.key
  //   )
  // }

  // function onSortNumber(event) {
  //   event.detail.rows = sortString(
  //     event.detail.rows,
  //     event.detail.dir,
  //     event.detail.key
  //   )
  // }

  // let shown = false
  // let showIndex = -1

  // let dispatch = createEventDispatcher()
  // function show(index) {
  //   shown = !shown
  //   dispatch('show', shown)
  //   showIndex = index
  // }

  const openTagPrintOut = (tag) => {
    const route = `/tag/${tag.tag_no}`
    navigateTo(route)
  }

  // pdf functions

  function buildTableBody(data, columns) {
    var body = []
    let tableColumnNames = [
      { text: 'TAG', bold: true },
      { text: 'NAME', bold: true },
      { text: 'PHONE', bold: true },
      { text: 'EMAIL', bold: true },
      { text: 'ADDRESS', bold: true },
      { text: 'APPOINTMENT', bold: true },
      { text: 'DEPARTMENT', bold: true },
      { text: 'VEHICLE PLATE NO', bold: true },
      { text: 'VEHICLE TYPE', bold: true },
      { text: 'VEHICLE COLOR', bold: true },
    ]
    body.push(tableColumnNames)

    data.forEach(function (row) {
      var dataRow = []

      columns.forEach(function (column) {
        dataRow.push({ text: row[column], fontSize: 11 })
      })

      body.push(dataRow)
    })

    return body
  }

  function table(data, columns) {
    return {
      table: {
        headerRows: 1,
        body: buildTableBody(data, columns),
      },
    }
  }

  let withBarcode = false
  let loadingExport = false
  const downloadPage = async (rows) => {
    loadingExport = true

    let selectedColumns = await rows.map(function (item) {
      const {
        tag_no,
        staff_name,
        phone,
        email,
        address,
        appointment,
        department,
        vehicle_plate_no,
        vehicle_type,
        vehicle_color,
      } = item
      return {
        tag_no,
        staff_name,
        phone,
        email,
        address,
        appointment,
        department,
        vehicle_plate_no,
        vehicle_type,
        vehicle_color,
      }
    })
    if (withBarcode) {
      navigateTo('tags/print')
    } else {
      const docDefinition = {
        pageOrientation: 'LANDSCAPE',
        content: [
          { text: 'Vehicle Tags', style: 'header', bold: true, fontSize: 18 },
          '',
          table(selectedColumns, [
            'tag_no',
            'staff_name',
            'phone',
            'email',
            'address',
            'appointment',
            'department',
            'vehicle_plate_no',
            'vehicle_type',
            'vehicle_color',
          ]),
        ],
      }

      await pdfMake.createPdf(docDefinition).download(`Vehicle Tags`)
      loadingExport = false
    }
  }
</script>

<svelte:head>
  <title>All Vehicle Tags</title>
</svelte:head>

<div class="section pt-4 pb-0 forMobile">
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">All Vehicle Tags</p>
    </div>
    <div class="card-content">
      <div class="content">
        {#if !rows.length < 1}
          Number of Vehicles with Tag No - {rows.length
            ? rows.length
            : 'loading'}

          <div class="my-1">
            <label class="checkbox">
              <input type="checkbox" bind:checked={withBarcode} />
              With BarCodes
            </label>
          </div>

          <button
            class="button is-success is-small"
            on:click={downloadPage(rows)}
            class:is-loading={loadingExport}
          >
            {#if withBarcode}
              <span class="icon  mr-1">
                <i class="fa fa-qrcode" />
              </span>
            {/if}
            Print Tags
          </button>
        {/if}
        <TagsTable
          {page}
          {pageSize}
          {rows}
          {tableHeaders}
          {openEditModal}
          {openDeleteModal}
          {openTagPrintOut}
        />
      </div>
    </div>
  </div>
</div>

<EditModal
  showModal={showEditModal}
  modalCloseAction={closeEditModal}
  {tagToEdit}
  modalEditAction={() => updateTag(tagToEdit)}
/>

<DeleteModal
  showModal={showDeleteModal}
  modalCloseAction={closeDeleteModal}
  modalText={`Delete Tag No of ${tagToDelete.tag_no} for ${tagToDelete.staff_name}`}
  modalDeleteAction={() => deleteTag(tagToDelete)}
/>

<style>
  @media screen and (max-width: 769px) {
    .forMobile {
      padding: 0rem !important;
    }
  }
</style>
