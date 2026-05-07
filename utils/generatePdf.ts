import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates a PDF from a DOM element and triggers a download.
 * Designed specifically for income calculation pages.
 *
 * @param elementId The ID of the wrapper element to capture
 * @param filename The desired filename for the generated PDF
 */
export async function generateIncomePagePdf(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id ${elementId} not found`);
  }

  // Apply capture mode to body to trigger print-specific CSS
  document.body.classList.add('pdf-capture-mode');

  try {
    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 2,           // retina quality
      useCORS: true,      // allow external assets
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
      // Workaround for html2canvas color issues with modern CSS (Tailwind 4 / oklch)
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          // Force some basic colors for elements that might use modern CSS functions
          // html2canvas fails on oklch/lab/etc.
          const elementsWithColors = clonedElement.querySelectorAll('*');
          elementsWithColors.forEach((el) => {
            const style = window.getComputedStyle(el);
            // If it's a blue themed element, ensure it has a fallback color
            if (el.classList.contains('text-blue-600')) {
               (el as HTMLElement).style.color = '#2563eb';
            }
            if (el.classList.contains('bg-blue-600')) {
               (el as HTMLElement).style.backgroundColor = '#2563eb';
            }
          });
        }
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Standard A4 width in mm
    const pdfWidth = 210;

    // Calculate PDF height based on content aspect ratio
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Add Branding Footer
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);

    const footerLine1 = "WSCSS.site — Washington State Child Support Schedule 2026";
    const footerLine2 = "This calculation is an estimate only. Not legal advice. RCW 26.19 Compliant.";
    const footerLine3 = `Generated: ${date}`;

    const footerX = 10;
    pdf.text(footerLine1, footerX, pdfHeight - 12);
    pdf.text(footerLine2, footerX, pdfHeight - 8);
    pdf.text(footerLine3, footerX, pdfHeight - 4);

    pdf.save(filename);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  } finally {
    document.body.classList.remove('pdf-capture-mode');
  }
}
