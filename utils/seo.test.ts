import { getCountyPageMeta, getIncomePageMeta } from "./seo";
import { WashingtonCounty } from "@/data/washingtonCounties";

const mockCounty: WashingtonCounty = {
  slug: "king-county",
  name: "King County",
  seat: "Seattle",
  court: "King County Superior Court",
  courtAddress: "516 3rd Ave, Room E-609, Seattle, WA 98104",
  filingFee: "314",
  filingFeeMax: 314,
  filingFeeIsRange: false,
  clerkPhone: "(206) 296-9300",
  website: "https://kingcounty.gov",
  courthouseUrl: "https://kingcounty.gov",
  localTip: "Tip here",
  localNote: "Note",
  faqs: [],
};

const mockPierceCounty: WashingtonCounty = {
  slug: "pierce-county",
  name: "Pierce County",
  seat: "Tacoma",
  court: "Pierce County Superior Court",
  courtAddress: "930 Tacoma Ave S, Rm 110, Tacoma, WA 98402",
  filingFee: "290",
  filingFeeMax: 290,
  filingFeeIsRange: false,
  clerkPhone: "(253) 798-7455",
  website: "https://www.piercecountywa.gov",
  courthouseUrl: "https://www.piercecountywa.gov",
  localTip: "Local tip",
  localNote: "Note",
  faqs: [],
};

describe("SEO Utility", () => {
  it("generates correct meta for King County page", () => {
    const meta = getCountyPageMeta({ county: mockCounty });
    expect(meta.openGraph?.title).toBe("King County Child Support 2026 | WSCSS");
    expect(meta.openGraph?.description).not.toContain("All 39 counties");
    const images = meta.openGraph?.images;
    const image = Array.isArray(images) ? images[0] : images;
    expect((image as any).url).toBe("https://wscss.site/wscss-og.webp");
    expect((image as any).alt).toBe("King County Child Support Calculator & Court Guide 2026 | WSCSS");
  });

  it("generates correct meta for Pierce County income page, $5,000, 2 children", () => {
    const meta = getIncomePageMeta({
      county: mockPierceCounty,
      income: 5000,
      children: 2,
      amount: 1446,
      slug: "pierce-county-income-5000-2-children",
    });
    const title = (meta.title as any).absolute as string;
    expect(title).toBe("Pierce County Child Support: $5,000 Income, 2 Children (2026) | $1,446/mo");

    const desc = meta.description as string;
    expect(desc).toBe("What is child support for 2 children at $5,000/mo in Pierce County, WA? The 2026 presumptive amount is $1,446/mo. See how SSR, deviations, and Pierce County court rules affect your final order.");

    const ogTitle = meta.openGraph?.title as string;
    expect(ogTitle).toBe(title);

    const images = meta.openGraph?.images;
    const image = Array.isArray(images) ? images[0] : images;
    expect((image as any).alt).toBe("Child Support for $5,000 Income in Pierce County 2026 | WSCSS");
  });

  it("generates correct meta for generic Washington State income page, $7,000, 3 children", () => {
    const meta = getIncomePageMeta({
      county: null,
      income: 7000,
      children: 3,
      amount: 1891,
      slug: "income-7000-3-children",
    });
    const title = (meta.title as any).absolute as string;
    expect(title).toBe("Washington State Child Support: $7,000 Income, 3 Children (2026) | $1,891/mo");

    const desc = meta.description as string;
    expect(desc).toBe("What is child support for 3 children at $7,000/mo in Washington State? The 2026 presumptive amount is $1,891/mo. See how SSR, deviations, and Washington State court rules affect your final order.");
  });

  it("generates correct meta for high income (Court Discretion) case", () => {
    const meta = getIncomePageMeta({
      county: mockCounty,
      income: 55000,
      children: 2,
      amount: 0,
      slug: "king-county-income-55000-2-children",
    });
    const title = (meta.title as any).absolute as string;
    expect(title).toBe("King County Child Support: $55,000 Income, 2 Children (2026) | Court Discretion");

    const desc = meta.description as string;
    expect(desc).toBe("What is child support for 2 children at $55,000/mo in King County, WA? See how SSR, deviations, and King County court rules determine your final order.");
  });

  it("uses singular '1 Child' label in title and '1 child' in description", () => {
    const meta = getIncomePageMeta({
      county: mockCounty,
      income: 3000,
      children: 1,
      amount: 589,
      slug: "king-county-income-3000-1-child",
    });
    const title = (meta.title as any).absolute as string;
    expect(title).toContain("1 Child");
    expect(title).not.toContain("1 Children");

    const desc = meta.description as string;
    expect(desc).toContain("1 child");
    expect(desc).not.toContain("1 Child");
  });

  it("ensures og:image ends in .webp for any income page", () => {
    const meta = getIncomePageMeta({
      county: mockCounty,
      income: 4000,
      children: 1,
      amount: 843,
      slug: "king-county-income-4000-1-child",
    });
    const images = meta.openGraph?.images;
    const imageUrl = Array.isArray(images) ? (images[0] as any).url : (images as any)?.url;
    expect(imageUrl).toMatch(/\.webp$/);
    expect(imageUrl).not.toMatch(/\.jpg$/);
  });
});
