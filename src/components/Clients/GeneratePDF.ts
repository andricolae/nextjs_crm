import { jsPDF } from "jspdf";

function GeneratePDF() {
	// Create a new instance of jsPDF
	const doc = new jsPDF();

	// Add text to the PDF
	doc.text("Hello, this is a sample PDF created with TypeScript!", 10, 10);

	// Save the PDF
	doc.save("sample.pdf");
}

export default GeneratePDF;
