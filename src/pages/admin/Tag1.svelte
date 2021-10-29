<script>
  // import { onMount } from 'svelte'
  // import pdfMake from 'pdfmake/build/pdfmake'
  // import Qrcode from 'svelte-qrcode'

  // import QrCode from '../../components/qrcode'
  // const QRcode = new QrCode()

  // const fonts = {
  //   Roboto: {
  //     normal: '../../fonts/Roboto-Regular.ttf',
  //     bold: '../../fonts/Roboto-Medium.ttf',
  //     italics: '../../fonts/Roboto-Italic.ttf',
  //     bolditalics: '../../fonts/Roboto-MediumItalic.ttf',
  //   },
  // }
  // // import * as pdfFonts from 'pdfmake/build/vfs_fonts'
  // // pdfMake.vfs = pdfFonts.pdfMake.vfs

  // import pdfFonts from '../../ui/pdfFonts/vfs_fonts.js'

  // pdfMake.vfs = pdfFonts

  // const RATE = 2.83464566929

  // // A3 297mm x 419mm
  // const PAGE_WIDTH = 297 * RATE
  // const PAGE_HEIGHT = 419 * RATE
  // const CONTENT_WIDTH = 297 * RATE
  // const CONTENT_HEIGHT = 419 * RATE
  // // const PAGE_MARGINS: [number, number] = [0 * RATE, 0 * RATE];

  // /**
  //  * HTMLからPDFを生成
  //  * @param {HTMLElement} element
  //  */
  // export async function createPdfFromHtml(element) {
  //   const pdfProps = await createPdfProps(element)
  //   createPdf(pdfProps)
  // }

  // /**
  //  * PDF出力用のPdfPropsを作成
  //  * @param {HTMLElement} element
  //  * @returns {Promise<PdfProps>}
  //  */
  // async function createPdfProps(element) {
  //   // html2canvas実行
  //   const options = {
  //     // HACK: ブラウザ依存でcanvasサイズが変わらないように、scaleは固定値。IEでのぼやけ対策で十分大きめの2にした
  //     scale: 2,
  //   }
  //   // const canvas = await html2canvas(element, options)

  //   // const dataUrl = canvas.toDataURL()

  //   const pdfProps = {
  //     dataUrl,
  //     pageSize: {
  //       width: PAGE_WIDTH,
  //       height: PAGE_HEIGHT,
  //     },
  //     pageOrientation: 'PORTRAIT',
  //     contentSize: {
  //       width: CONTENT_WIDTH,
  //       height: CONTENT_HEIGHT,
  //     },
  //     pageMargins: PAGE_MARGINS,
  //   }

  //   return pdfProps
  // }

  // /**
  //  * エンコードされた画像URLを貼り付けたPDFを出力する
  //  * @param {PdfProps} pdfProps
  //  */
  // function createPdf(pdfProps) {
  //   const { dataUrl, contentSize, pageMargins } = pdfProps
  //   const pageSize = pdfProps.pageSize
  //   const pageOrientation = pdfProps.pageOrientation

  //   const documentDefinitions = {
  //     pageSize,
  //     pageOrientation,
  //     content: {
  //       image: dataUrl,
  //       ...contentSize,
  //     },
  //     pageMargins,
  //   }

  //   pdfMake.createPdf(documentDefinitions).download()
  // }

  // export let currentRoute

  // const tagNo = currentRoute.namedParams.tagNo

  // let image = ''
  // let errorCorrection = 'L'
  // let background = '#fff'
  // let color = '#000'
  // let size = '200'
  // let value = `/tag/${tagNo}`
  // let padding = 0
  // let className = 'qrcode'
  // function generateQrCode() {
  //   QRcode.set({
  //     background,
  //     foreground: color,
  //     level: errorCorrection,
  //     padding,
  //     size,
  //     value,
  //   })

  //   image = QRcode.toDataURL('image/jpeg')
  // }

  // let testDataUrl = ''
  // onMount(async () => {
  //   await generateQrCode()
  // })

  // // let testDataUrl = image.toString()

  // // console.log(testDataUrl)
  // const docDefinition = {
  //   content: [
  //     {
  //       image: testDataUrl,
  //       width: 150,
  //     },
  //     tagNo,
  //     'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
  //   ],
  // }

  // const downloadPage = () => {
  //   generateQrCode()
  //   pdfMake.createPdf(docDefinition).download(`${tagNo} Print Out`)
  // }

  // console.log(tagNo)
</script>

<svelte:head>
  <title>Print Tag</title>
</svelte:head>

<div class="section pt-4 pb-0">
  <!-- <Qrcode value={`/tag/${tagNo}`} size="150" />
  <img src={image} alt={tagNo} class={className} />
  <button class="button is-success is-small" on:click={downloadPage}>
    Download PDF
  </button> -->
</div>
