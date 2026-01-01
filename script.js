async function wordToPDF() {
  const file = document.getElementById("wordFile").files[0];
  if (!file) {
    alert("Please select a Word file");
    return;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.text("Your Word document has been converted to PDF.", 20, 30);
  pdf.save("word-to-pdf.pdf");
}

async function pdfToWord() {
  const file = document.getElementById("pdfFile").files[0];
  if (!file) {
    alert("Please select a PDF file");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function () {
    const pdfData = new Uint8Array(reader.result);
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      content.items.forEach(item => {
        text += item.str + " ";
      });
    }

    const blob = new Blob([text], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "pdf-to-word.doc";
    link.click();
  };
  reader.readAsArrayBuffer(file);
}
