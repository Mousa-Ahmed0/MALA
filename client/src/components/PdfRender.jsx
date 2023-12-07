// PDFRenderer.jsx
import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pdfjs } from "react-pdf";

const PDFRenderer = ({ content }) => {
  return (
    <div>
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={content} />
      </Worker>
    </div>
  );
};

export default PDFRenderer;
