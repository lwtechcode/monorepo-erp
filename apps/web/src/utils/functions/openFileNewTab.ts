export function openFileInaNewTab(base64: string, fileName: string) {
  const pdfWindow = window.open(
    `'Documento PDF - ${fileName}.pdf','Documento PDF'`,
  );

  if (pdfWindow) {
    pdfWindow.document.write(
      "<iframe style='margin: 0' width='100%' height='100%' alt=" +
        fileName +
        " src='data:application/pdf;base64, " +
        encodeURI(base64) +
        "'></iframe>",
    );
    setTimeout(function () {
      pdfWindow.document.title = fileName;
    }, 500);
  }
}
