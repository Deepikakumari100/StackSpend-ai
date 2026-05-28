import html2pdf from "html2pdf.js";

export async function generateAuditPDF() {
  const element =
    document.getElementById("audit-report");

  if (!element) {
    throw new Error(
      "Audit report component not found"
    );
  }

  const options = {
    margin: 0,

    filename: `StackSpend-Audit-${
      new Date().getTime()
    }.pdf`,

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 4,
      useCORS: true,
      backgroundColor: "#020617",

      scrollX: 0,
      scrollY: 0,

      windowWidth: 1400,
    },

    jsPDF: {
      unit: "px",
      format: [1200, 2000],
      orientation: "portrait",
    },

    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
    },
  };

  await html2pdf()
    .set(options)
    .from(element)
    .save();
}