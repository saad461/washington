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
};

describe("SEO Utility", () => {
  it("generates correct meta for King County page", () => {
    const meta = getCountyPageMeta({ county: mockCounty });
    expect(meta.openGraph?.title).toBe("King County Child Support 2026 | Calculator, Court Info & Filing Guide");
    expect(meta.openGraph?.description).not.toContain("All 39 counties");
    expect(meta.openGraph?.images?.[0]?.url).toBe("https://wscss.site/wscss-og.webp");
  });

  it("generates correct meta for Pierce County income page, $5,000, 2 children", () => {
    const meta = getIncomePageMeta({
      county: mockPierceCounty,
      income: 5000,
      children: 2,
      amount: 723,
      slug: "pierce-county-income-5000-2-children",
    });
    const ogTitle = meta.openGraph?.title as string;
    expect(ogTitle).toContain("$5,000");
    expect(ogTitle).toContain("Pierce County");
    expect(ogTitle).toContain("2 Children");
  });

  it("uses singular '1 Child' label for any income page with 1 child", () => {
    const meta = getIncomePageMeta({
      county: mockCounty,
      income: 3000,
      children: 1,
      amount: 652,
      slug: "king-county-income-3000-1-child",
    });
    const title = meta.title as string;
    expect(title).toContain("1 Child");
    expect(title).not.toContain("1 Children");
  });

  it("ensures og:image ends in .webp for any income page", () => {
    const meta = getIncomePageMeta({
      county: mockCounty,
      income: 4000,
      children: 1,
      amount: 843,
      slug: "king-county-income-4000-1-child",
    });
    const imageUrl = meta.openGraph?.images?.[0]?.url;
    expect(imageUrl).toMatch(/\.webp$/);
    expect(imageUrl).not.toMatch(/\.jpg$/);
  });
});
