export function pdfViewer(pdf: string, fileName: string) {
  const pdfWindow = window.open(
    `'Recibo Fiscal - ${fileName}.pdf','Recibo Fiscal'`,
  );

  if (pdfWindow) {
    pdfWindow.document.write(
      "<iframe style='margin: 0' width='100%' height='100%' alt=" +
        fileName +
        " src='data:application/pdf;base64, " +
        encodeURI(pdf) +
        "'></iframe>",
    );
    setTimeout(function () {
      pdfWindow.document.title = fileName;
    }, 500);
  }
}
