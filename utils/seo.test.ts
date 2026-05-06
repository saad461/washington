import { getCountyPageMeta, getIncomePageMeta } from "./seo";
import { WashingtonCounty } from "@/data/washingtonCounties";

const mockCounty: WashingtonCounty = {
  slug: "king-county",
  name: "King County",
  seat: "Seattle",
  court: "King County Superior Court",
  courtAddress: "516 3rd Ave, Room E-609, Seattle, WA 98104",
  filingFee: "314",
  clerkPhone: "(206) 296-9300",
  website: "https://kingcounty.gov",
  localTip: "Tip here",
};

const mockPierceCounty: WashingtonCounty = {
  slug: "pierce-county",
  name: "Pierce County",
  seat: "Tacoma",
  court: "Pierce County Superior Court",
  courtAddress: "930 Tacoma Ave S, Rm 110, Tacoma, WA 98402",
  filingFee: "290",
  clerkPhone: "(253) 798-7455",
  website: "https://www.piercecountywa.gov",
  localTip: "Local tip",
};

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runTests() {
  console.log("Running SEO Utility Tests...");

  // Test 1: King County page
  const kingMeta = getCountyPageMeta({ county: mockCounty });
  assert(
    kingMeta.openGraph?.title === "King County Child Support 2026 | Calculator, Court Info & Filing Guide",
    "King County og:title mismatch"
  );
  assert(
    !kingMeta.openGraph?.description?.includes("All 39 counties"),
    "King County description should not contain 'All 39 counties'"
  );
  assert(
    kingMeta.openGraph?.images?.[0]?.url === "https://wscss.site/wscss-og.webp",
    "King County og:image should be webp"
  );
  console.log("✓ Test 1: King County page passed");

  // Test 2: Pierce County income page, $5,000, 2 children
  const pierceIncomeMeta = getIncomePageMeta({
    county: mockPierceCounty,
    income: 5000,
    children: 2,
    amount: 723,
    slug: "pierce-county-income-5000-2-children",
  });
  const pierceOgTitle = pierceIncomeMeta.openGraph?.title as string;
  assert(pierceOgTitle.includes("$5,000"), "Pierce Income og:title should contain '$5,000'");
  assert(pierceOgTitle.includes("Pierce County"), "Pierce Income og:title should contain 'Pierce County'");
  assert(pierceOgTitle.includes("2 Children"), "Pierce Income og:title should contain '2 Children'");
  console.log("✓ Test 2: Pierce County income page passed");

  // Test 3: Any income page with 1 child -> "1 Child"
  const oneChildMeta = getIncomePageMeta({
    county: mockCounty,
    income: 3000,
    children: 1,
    amount: 652,
    slug: "king-county-income-3000-1-child",
  });
  assert(
    (oneChildMeta.title as string).includes("1 Child"),
    "1 Child label mismatch in title"
  );
  assert(
    !(oneChildMeta.title as string).includes("1 Children"),
    "1 Child should not be plural"
  );
  console.log("✓ Test 3: 1 Child label passed");

  // Test 4: Any income page -> verify og:image ends in .webp
  const incomeMeta = getIncomePageMeta({
    county: mockCounty,
    income: 4000,
    children: 1,
    amount: 843,
    slug: "king-county-income-4000-1-child",
  });
  const imageUrl = incomeMeta.openGraph?.images?.[0]?.url;
  assert(imageUrl?.endsWith(".webp"), "Income og:image should end in .webp");
  assert(!imageUrl?.endsWith(".jpg"), "Income og:image should not end in .jpg");
  console.log("✓ Test 4: Image format passed");

  console.log("All tests passed!");
}

runTests().catch((err) => {
  console.error("Tests failed!");
  console.error(err);
  process.exit(1);
});
