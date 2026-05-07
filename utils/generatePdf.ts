import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Robustly resolves any CSS color string to an absolute RGBA format.
 * This is essential for bypassing html2canvas's lack of support for modern
 * color functions like lab() and oklch().
 */
function resolveColorToRgb(color: string, ctx: CanvasRenderingContext2D): string {
  if (!color || ['transparent', 'initial', 'inherit', 'none'].includes(color)) {
    return color;
  }

  try {
    // 1. Let the browser try to resolve the color by setting fillStyle
    ctx.fillStyle = '#000000'; // Default
    ctx.fillStyle = color;
    const resolved = ctx.fillStyle; // Usually returns hex or rgb

    // 2. If the browser returned a modern color function (it supports it but html2canvas doesn't),
    // we use the canvas pixels to get the raw RGBA values.
    if (resolved.includes('lab') || resolved.includes('oklch') || resolved.includes('color-mix')) {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
    }

    return resolved;
  } catch {
    return '#000000';
  }
}

/**
 * Generates a high-quality, HTML-faithful PDF from a DOM element.
 *
 * Works around modern CSS issues (Tailwind 4 lab/oklch colors) by
 * freezing computed styles as resolved RGB/Pixel values and
 * completely neutralizing global CSS during capture.
 */
export async function generateIncomePagePdf(
  elementId: string,
  filename: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element ${elementId} not found`);

  const dummyCanvas = document.createElement('canvas');
  dummyCanvas.width = 1;
  dummyCanvas.height = 1;
  const ctx = dummyCanvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error("Could not create canvas context");

  // 1. FREEZE STYLES SITE-WIDE
  // We resolve colors to RGB and lock layout properties.
  const allDocElements = Array.from(document.querySelectorAll('*')) as HTMLElement[];
  const originalStyles = new Map<HTMLElement, string>();

  allDocElements.forEach(el => {
    const computed = window.getComputedStyle(el);
    originalStyles.set(el, el.getAttribute('style') || '');

    // Resolve all potential color properties to safe RGB strings
    el.style.color = resolveColorToRgb(computed.color, ctx);
    el.style.backgroundColor = resolveColorToRgb(computed.backgroundColor, ctx);
    el.style.borderColor = resolveColorToRgb(computed.borderColor, ctx);

    // Layout freezing for the capture area and its ancestors/descendants
    if (element.contains(el) || el === element || el.contains(element)) {
      el.style.fontSize = computed.fontSize;
      el.style.fontWeight = computed.fontWeight;
      el.style.fontFamily = computed.fontFamily;
      el.style.lineHeight = computed.lineHeight;
      el.style.display = computed.display;
      el.style.padding = computed.padding;
      el.style.margin = computed.margin;
      el.style.width = computed.width;
      el.style.height = computed.height;
      el.style.borderRadius = computed.borderRadius;
      el.style.position = computed.position;
      el.style.flexDirection = computed.flexDirection;
      el.style.alignItems = computed.alignItems;
      el.style.justifyContent = computed.justifyContent;
      el.style.gap = computed.gap;

      // Kill problematic features that often contain modern color functions
      if (computed.backgroundImage.includes('gradient')) {
        el.style.setProperty('background-image', 'none', 'important');
      }
      if (computed.boxShadow !== 'none') {
        el.style.setProperty('box-shadow', 'none', 'important');
      }
    }
  });

  // 2. DISCONNECT GLOBAL STYLES
  // We remove all style tags so html2canvas's parser is effectively blind to modern CSS.
  const styleElements = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
  const styleBackups = styleElements.map(el => ({
    el,
    parent: el.parentNode!,
    next: el.nextSibling
  }));
  styleElements.forEach(el => el.remove());

  // Add a "shield" style to suppress pseudo-elements during capture
  const shield = document.createElement('style');
  shield.innerHTML = `
    *::before, *::after { content: none !important; display: none !important; }
    .no-print { display: none !important; }
  `;
  document.head.appendChild(shield);

  document.body.classList.add('pdf-capture-mode');

  try {
    // 3. CAPTURE
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
      onclone: (clonedDoc) => {
        // Double check no stylesheets survived in clone
        clonedDoc.querySelectorAll('style, link').forEach(s => s.remove());
        const clonedRoot = clonedDoc.getElementById(elementId);
        if (clonedRoot) {
            clonedRoot.querySelectorAll('.no-print').forEach(el => el.remove());
        }
      }
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    const footerX = 10;
    pdf.text("WSCSS.site — Washington State Child Support Schedule 2026", footerX, pdfHeight - 12);
    pdf.text("This calculation is an estimate only. Not legal advice. RCW 26.19 Compliant.", footerX, pdfHeight - 8);
    pdf.text(`Generated: ${date}`, footerX, pdfHeight - 4);

    pdf.save(filename);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  } finally {
    // 4. RESTORE SITE STATE
    shield.remove();
    document.body.classList.remove('pdf-capture-mode');

    // Restore stylesheets
    styleBackups.forEach(({ el, parent, next }) => {
      parent.insertBefore(el, next);
    });

    // Restore inline styles
    allDocElements.forEach(el => {
       const htmlEl = el as HTMLElement;
       const saved = originalStyles.get(htmlEl);
       if (saved === '') {
         htmlEl.removeAttribute('style');
       } else if (saved !== undefined) {
         htmlEl.setAttribute('style', saved);
       }
    });
  }
}
