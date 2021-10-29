<script>
  // import { onMount } from 'svelte'

  // import Html5Qrcode from 'html5-qrcode'
  // import { onMount } from 'svelte'

  // function onScanSuccess(decodedText, decodedResult) {
  //   // handle the scanned code as you like, for example:
  //   html5QrcodeScanner.clear()
  //   console.log(`Code matched = ${decodedText}`, decodedResult)
  // }

  // function onScanFailure(error) {
  //   // handle scan failure, usually better to ignore and keep scanning.
  //   // for example:
  //   console.warn(`Code scan error = ${error}`)
  // }

  // onMount(async () => {
  //   // This method will trigger user permissions
  //   Html5Qrcode.getCameras()
  //     .then((devices) => {
  //       /**
  //        * devices would be an array of objects of type:
  //        * { id: "id", label: "label" }
  //        */
  //       if (devices && devices.length) {
  //         var cameraId = devices[0].id
  //         // .. use this to start scanning.
  //       }
  //     })
  //     .catch((err) => {
  //       // handle err
  //     })

  // let html5QrcodeScanner = new Html5QrcodeScanner(
  //   'reader',
  //   { fps: 10, qrbox: 250 },
  //   /* verbose= */ false
  // )

  //   html5QrcodeScanner.render(onScanSuccess, onScanFailure)
  // })

  // import QrScanner from 'qr-scanner'
  // QrScanner.WORKER_PATH =
  //   '../../../node_modules/qr-scanner/qr-scanner-worker.min.js'

  // let videoElem
  // let video = document.getElementById('qr-video')
  // const qrScanner = new QrScanner(video, (result) =>
  //   console.log('decoded qr code:', result)
  // )
  // const scanner = new QrScanner(
  //   video,
  //   (result) => console.log('decoded qr code:', result),
  //   (error) => {
  //     console.log(error)
  //   }
  // )
  // $: console.log(video)

  // const scan = () => {
  //   qrScanner.start()
  // }

  // function onScanSuccess(decodedText, decodedResult) {
  //   // handle the scanned code as you like, for example:
  //   console.log(`Code matched = ${decodedText}`, decodedResult)
  // }

  // function onScanFailure(error) {
  //   // handle scan failure, usually better to ignore and keep scanning.
  //   // for example:
  //   console.warn(`Code scan error = ${error}`)
  // }

  // let html5QrcodeScanner = new Html5QrcodeScanner(
  //   'reader',
  //   { fps: 10, qrbox: { width: 250, height: 250 } },
  //   /* verbose= */ false
  // )
  // html5QrcodeScanner.render(onScanSuccess, onScanFailure)

  // import jsQR from 'jsqr'

  // const code = jsQR(imageData, width, height)

  // if (code) {
  //   console.log('Found QR code', code)
  // }

  // if (navigator.mediaDevices.getUserMedia) {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then(function (stream) {
  //       video.srcObject = stream
  //     })
  //     .catch(function (err0r) {
  //       console.log('Something went wrong!')
  //     })
  // }
  // import JsQRScanner from 'jsqrscanner'
  // const onQRCodeScanned = (scannedText) => {
  //   console.log(scannedText)
  // }

  // const provideVideo = () => {
  //   let n = navigator
  //   if (n.mediaDevices && n.mediaDevices.getUserMedia) {
  //     return n.mediaDevices.getUserMedia({
  //       video: { facingMode: 'environment' },
  //       audio: false,
  //     })
  //   }
  //   return Promise.reject('Your browser does not support getUserMedia')
  // }
  // onMount(() => {
  //   JsQRScannerReady()
  //   // provideVideo()
  // })
  // const scan = () => {
  //   let jbScanner = new JsQRScanner(onQRCodeScanned)
  //   jbScanner.setSnapImageMaxSize(300)
  //   var scannerParentElement = document.getElementById('scanner')
  //   if (scannerParentElement) {
  //     //append the jbScanner to an existing DOM element
  //     jbScanner.appendTo(scannerParentElement)
  //   }
  // }
  // function JsQRScannerReady() {
  //   var jbScanner = new JsQRScanner(onQRCodeScanned, provideVideo)
  //   jbScanner.setSnapImageMaxSize(300)
  //   var scannerParentElement = document.getElementById('scanner')
  //   if (scannerParentElement) {
  //     //append the jbScanner to an existing DOM element
  //     jbScanner.appendTo(scannerParentElement)
  //   }
  // }
  console.log(window.location.origin)
</script>

<svelte:head>
  <!--<script type="text/javascript" src="/js/jsqrscanner.nocache.js"></script>
  <script src="/html5-qrcode/html5-qrcode.min.js"></script>-->
  <title>Scan Vehicle Tags</title>
</svelte:head>

<div>
  <h1>Coming Soon</h1>
  <div id="reader" width="600px" />
  <!--<video id="preview" />-->
  <video id="qr-video" autoplay="true">
    <track label="Scan Tag" kind="captions" />
  </video>
  <div id="scanner" class="qrscanner" />
  <!--<button on:click={scan()}>Scan</button>-->
</div>
