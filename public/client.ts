const socket = io();
let pdfDoc = null;
let pageNum = 1;
const canvas = document.getElementById("pdf-canvas");
const ctx = canvas.getContext("2d");

// Set the PDF.js worker source URL
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

const url = "./sample.pdf";


// Load PDF Document
pdfjsLib.getDocument(url).promise.then((pdf) => {
    pdfDoc = pdf;
    renderPage(pageNum);
  });

// Render Page
function renderPage(num) {
  pdfDoc.getPage(num).then((page) => {
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
    };
    page.render(renderContext);

    document.getElementById("page-info").textContent = `Page ${num} of ${pdfDoc.numPages}`;
  });
}

// Page Navigation
document.getElementById("prev").addEventListener("click", () => {
  if (pageNum <= 1) return;
  pageNum--;
  renderPage(pageNum);
  socket.emit("pageChanged", pageNum);  // Notify server of page change
});

document.getElementById("next").addEventListener("click", () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  renderPage(pageNum);
  socket.emit("pageChanged", pageNum);  // Notify server of page change
});

// Sync Page Change from Server
socket.on("pageChanged", (newPageNum) => {
  if (pageNum !== newPageNum) {
    pageNum = newPageNum;
    renderPage(pageNum);
  }
});
