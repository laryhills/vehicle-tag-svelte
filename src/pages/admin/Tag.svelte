<script>
  import { onMount } from 'svelte'
  import axios from '../../axios-global'
  import QR from '../../ui/QR.svelte'
  import toastr from 'toastr'
  import toastrConfig from '../../ui/toastr-config'

  toastr.options = toastrConfig
  export let currentRoute

  const tagNo = currentRoute.namedParams.tagNo

  let tag = null

  const searchTag = async (tagNo) => {
    try {
      let response = await axios.get(
        `${process.env.API_ROOT}/api/tags/search/${tagNo}`
      )
      if (!response.data.search) {
        toastr.warning(response.data.message)
      } else {
        tag = await response.data.result[0]
      }
    } catch (e) {
      console.log(e)
    }
  }
  onMount(async () => {
    await searchTag(tagNo)
  })
</script>

<svelte:head>
  <title>Print Tag</title>
</svelte:head>

<div class="section pt-4 pb-0 mb-3">
  <!-- <Qrcode value={`/tag/${tagNo}`} size="150" />
  <img src={image} alt={tagNo} class={className} />
  <button class="button is-success is-small" on:click={downloadPage}>
    Download PDF
  </button> 
  <div class="card">
    <div class="card-content">
      <div class="content">-->
  <div class="columns is-multiline">
    {#if tag}
      <div class="qr-container">
        <QR
          className="has-text-centered"
          text={`${window.location.origin}/tag/${tag.tag_no}`}
        />
        <div class="has-text-centered">
          TAG : {tag.tag_no}
        </div>
      </div>
      <div class="auto ticket">
        <div class="table-container">
          <table border="0">
            <tr>
              <td>
                <div class="place-block">
                  <div class="place-label">Name</div>
                  <div class="place-value">{tag.staff_name}</div>
                </div>
              </td>
              <td>
                <div class="place-block">
                  <div class="place-label">Email</div>
                  <div class="place-value">{tag.email}</div>
                </div>
              </td>
              <td>
                <div class="place-block">
                  <div class="place-label">Phone</div>
                  <div class="place-value">{tag.phone}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="place-block">
                  <div class="place-label">Address</div>
                  <div class="place-value">{tag.address}</div>
                </div>
              </td>
              <td>
                <div class="place-block">
                  <div class="place-label">Appointment</div>
                  <div class="place-value">{tag.appointment}</div>
                </div>
              </td>
              <td>
                <div class="place-block">
                  <div class="place-label">Department</div>
                  <div class="place-value">{tag.department}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="place-block">
                  <div class="place-label">Vehicle Plate No</div>
                  <div class="place-value">{tag.vehicle_plate_no}</div>
                </div>
              </td>
              <td>
                <div class="place-block">
                  <div class="place-label">Vehicle Chasis No</div>
                  <div class="place-value">{tag.vehicle_chasis_no}</div>
                </div>
              </td>
              <td>
                <div class="place-block">
                  <div class="place-label">Authorizing Staff</div>
                  <div class="place-value">{tag.authorized_staff_name}</div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="column auto special ">
        <div class="qr" style="display: flex;">
          <img
            alt={tag.staff_name}
            src="/images/passport/default.webp"
            class="passport"
          />
        </div>
      </div>
      <div class="auto ticket">
        <!--<section class="place">
                <div class="place-block">
                  <div class="place-label">Name</div>
                  <div class="place-value">{tag.staff_name}</div>
                </div>
                <div class="place-block">
                  <div class="place-label">Email</div>
                  <div class="place-value">{tag.email}</div>
                </div>
                <div class="place-block">
                  <div class="place-label">Phone</div>
                  <div class="place-value">{tag.phone}</div>
                </div>
              </section>-->
      </div>
    {/if}
  </div>
  <!--</div>
    </div>
  </div>-->
</div>

<style>
  /*.qr-container {
    width: 30%;
  }*/
  /* .text-head {
    font-family: Epilogue;
    font-size: 1.125em;
    font-weight: 600;
    line-height: 1.2;
  }

  .text {
    font-family: Epilogue;
    font-size: 1.125em;
    line-height: 1.2;
  }*/
  .passport {
    width: 250px;
  }

  .special {
    display: flex;
    justify-content: center;
  }

  .ticket .place-block {
    display: inline-block;
    margin: 10px 30px;
  }
  .ticket .place-block .place-label {
    color: #29a8eb;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .ticket .place-block .place-value {
    color: #000;
    font-size: 16px;
    font-weight: 500;
  }

  @media screen and (max-width: 769px) {
    .qr-container {
      width: 100%;
    }
    .passport {
      width: 100px;
    }
  }
  /*.qr {
    width: 220px;
    height: 220px;
    margin: 20px auto;
    border-radius: 10px;
    overflow: hidden;
  }
  .ticket .qr img {
    width: 100%;
    height: 100%;
  }*/
</style>
