# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/calculation_verification.spec.ts >> verify child support calculations
- Location: tests/calculation_verification.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.textContent: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.text-blue-600.font-extrabold').first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "WSCSS — Home" [ref=e6] [cursor=pointer]:
          - /url: /
          - img [ref=e8]
          - generic [ref=e10]:
            - generic [ref=e11]: WSCSS
            - generic [ref=e12]: Washington State
        - generic [ref=e15]:
          - generic:
            - img
          - textbox "Search WA county..." [ref=e16]
      - navigation "Main navigation" [ref=e17]:
        - link "Calculator" [ref=e18] [cursor=pointer]:
          - /url: /
        - link "Worksheet Wizard" [ref=e19] [cursor=pointer]:
          - /url: /worksheet
        - link "Courts" [ref=e20] [cursor=pointer]:
          - /url: /washington-courts
        - link "Glossary" [ref=e21] [cursor=pointer]:
          - /url: /glossary
        - link "2026 Updates" [ref=e22] [cursor=pointer]:
          - /url: /compare-2024-2026
      - link "Launch Wizard" [ref=e24] [cursor=pointer]:
        - /url: /worksheet
        - generic [ref=e25]: Launch
        - text: Wizard
        - img [ref=e26]
  - main [ref=e28]:
    - generic [ref=e29]:
      - region "Washington Child Support Calculator Hero" [ref=e30]:
        - generic [ref=e32]:
          - generic [ref=e33]:
            - paragraph [ref=e34]: Free · No Sign-up · 2026 Guidelines
            - heading "Washington Child Support Calculator 2026" [level=1] [ref=e35]
            - paragraph [ref=e36]: Calculate your exact monthly obligation using the official 2026 RCW 26.19 economic tables. Trusted by Washington parents and family law attorneys across all 39 counties.
            - generic [ref=e37]:
              - link "Start Free Calculation →" [ref=e38] [cursor=pointer]:
                - /url: /#calculator
              - link "View 2026 Guidelines" [ref=e39] [cursor=pointer]:
                - /url: /blog/washington-child-support-guidelines-2026
            - list [ref=e40]:
              - listitem [ref=e41]:
                - generic [ref=e42]: ✓
                - text: No sign-up required
              - listitem [ref=e43]:
                - generic [ref=e44]: ✓
                - text: Instant results
              - listitem [ref=e45]:
                - generic [ref=e46]: ✓
                - text: Court-accurate 2026 tables
          - article "Washington child support calculation example showing $1,446 per month for 2 children" [ref=e49]:
            - paragraph [ref=e50]: Live Calculation Example
            - generic [ref=e51]:
              - generic [ref=e52]: 2 Children
              - generic [ref=e53]: King County, WA
            - paragraph [ref=e55]: $1,446/mo
            - generic [ref=e56]:
              - generic [ref=e57]:
                - term [ref=e58]: Net Income
                - definition [ref=e59]: $5,000/mo
              - generic [ref=e60]:
                - term [ref=e61]: Calculation Type
                - definition [ref=e62]: Standard
              - generic [ref=e63]:
                - term [ref=e64]: Jurisdiction
                - definition [ref=e65]: King County, WA
            - generic [ref=e66]:
              - generic [ref=e67]: ●
              - generic [ref=e68]: Live 2026 Data · RCW 26.19 Compliant
      - generic [ref=e71]:
        - heading "Calculate Your Child Support Obligation Instantly" [level=2] [ref=e72]
        - generic [ref=e75]:
          - generic [ref=e77]:
            - generic [ref=e78]:
              - img [ref=e80]
              - generic [ref=e82]:
                - heading "Income Estimator" [level=2] [ref=e83]
                - paragraph [ref=e84]: Enter net monthly figures for both parents
            - generic [ref=e85]:
              - generic [ref=e86]:
                - generic [ref=e87]: Your county (optional)
                - combobox "Your county (optional)" [ref=e88]:
                  - option "Select a county..." [selected]
                  - option "King County"
                  - option "Pierce County"
                  - option "Snohomish County"
                  - option "Spokane County"
              - generic [ref=e89]:
                - generic [ref=e90]:
                  - generic [ref=e91]: Income Cycle
                  - generic [ref=e92]:
                    - button "Monthly Net" [ref=e93]
                    - button "Yearly Net" [ref=e94]
                - generic [ref=e95]:
                  - generic [ref=e96]: Number of Children
                  - combobox "Number of Children" [ref=e97]:
                    - option "1 Child"
                    - option "2 Children" [selected]
                    - option "3 Children"
                    - option "4 Children"
                    - option "5 Children"
              - paragraph [ref=e98]: Start with your monthly take-home pay after taxes
              - generic [ref=e99]:
                - generic [ref=e100]:
                  - generic [ref=e101]: Parent 1 Net Income
                  - generic [ref=e102]:
                    - generic: $
                    - spinbutton "Parent 1 Net Income" [ref=e103]
                  - paragraph [ref=e104]: After taxes & mandatory deductions
                - generic [ref=e105]:
                  - generic [ref=e106]: Parent 2 Net Income
                  - generic [ref=e107]:
                    - generic: $
                    - spinbutton "Parent 2 Net Income" [ref=e108]
                  - paragraph [ref=e109]: After taxes & mandatory deductions
              - button "What counts as net income?" [ref=e111]:
                - text: What counts as net income?
                - img [ref=e112]
              - generic [ref=e114]:
                - generic [ref=e115]:
                  - generic [ref=e116]: Who pays support?
                  - paragraph [ref=e117]: Usually the parent with less custody time
                  - group "Who pays support?" [ref=e118]:
                    - button "Parent 1" [active] [ref=e119]:
                      - img [ref=e120]
                      - text: Parent 1
                    - button "Parent 2" [ref=e123]
                - button "I share custody (optional parenting credit) Estimated Off — using standard table amount Off" [ref=e125] [cursor=pointer]:
                  - generic [ref=e126]:
                    - img [ref=e127]
                    - generic [ref=e130]:
                      - paragraph [ref=e131]:
                        - text: I share custody (optional parenting credit)
                        - generic [ref=e132]: Estimated
                      - paragraph [ref=e133]: Off — using standard table amount
                  - generic [ref=e134]: "Off"
              - generic [ref=e136]:
                - img [ref=e137]
                - paragraph [ref=e139]: Please enter income for at least one parent.
          - generic [ref=e143]:
            - generic [ref=e144]:
              - img [ref=e146]
              - generic [ref=e148]: Live Calculation Example
            - article "Washington child support calculation example showing $1,446 per month for 2 children" [ref=e150]:
              - paragraph [ref=e151]: Live Calculation Example
              - generic [ref=e152]:
                - generic [ref=e153]: 2 Children
                - generic [ref=e154]: King County, WA
              - paragraph [ref=e156]: $1,446/mo
              - generic [ref=e157]:
                - generic [ref=e158]:
                  - term [ref=e159]: Net Income
                  - definition [ref=e160]: $5,000/mo
                - generic [ref=e161]:
                  - term [ref=e162]: Calculation Type
                  - definition [ref=e163]: Standard
                - generic [ref=e164]:
                  - term [ref=e165]: Jurisdiction
                  - definition [ref=e166]: King County, WA
              - generic [ref=e167]:
                - generic [ref=e168]: ●
                - generic [ref=e169]: Live 2026 Data · RCW 26.19 Compliant
            - paragraph [ref=e171]: Enter income to update this result
      - generic [ref=e174]:
        - generic [ref=e175]:
          - generic [ref=e176]: 2026 SSR
          - generic [ref=e177]: ~$2,394 / mo
        - generic [ref=e178]:
          - generic [ref=e179]: Min Support
          - generic [ref=e180]: $50 / child
        - generic [ref=e181]:
          - generic [ref=e182]: Table Limit
          - generic [ref=e183]: $50,000
        - generic [ref=e184]:
          - generic [ref=e185]: Covers All 39 WA Counties
          - generic [ref=e186]: Washington State
      - generic [ref=e190]:
        - generic [ref=e191]:
          - paragraph [ref=e192]: RCW 26.19 Compliant
          - heading "Why Washington Families and Attorneys Trust WSCSS" [level=2] [ref=e193]
          - paragraph [ref=e194]: Unlike generic calculators, WSCSS is engineered to the exact 2026 Washington statutory logic.
        - generic [ref=e195]:
          - generic [ref=e196]:
            - generic [ref=e197]:
              - img [ref=e198]
              - generic [ref=e201]: Compliant with RCW 26.19 standards
            - generic [ref=e202]:
              - img [ref=e203]
              - generic [ref=e206]: Includes Self-Support Reserve (SSR) logic
            - generic [ref=e207]:
              - img [ref=e208]
              - generic [ref=e211]: Applies the 45% net income safety cap
            - generic [ref=e212]:
              - img [ref=e213]
              - generic [ref=e216]: Live updates as you adjust inputs
          - table [ref=e218]:
            - rowgroup [ref=e219]:
              - row "Engine Logic WSCSS Other Calculators" [ref=e220]:
                - columnheader "Engine Logic" [ref=e221]
                - columnheader "WSCSS" [ref=e222]
                - columnheader "Other Calculators" [ref=e223]
            - rowgroup [ref=e224]:
              - row "2026 SSR Protection ✓ ✗" [ref=e225]:
                - cell "2026 SSR Protection" [ref=e226]
                - cell "✓" [ref=e227]:
                  - generic [ref=e228]:
                    - img [ref=e229]
                    - generic [ref=e232]: ✓
                - cell "✗" [ref=e233]:
                  - generic [ref=e236]: ✗
              - row "45% Net Income Cap ✓ ✗" [ref=e237]:
                - cell "45% Net Income Cap" [ref=e238]
                - cell "✓" [ref=e239]:
                  - generic [ref=e240]:
                    - img [ref=e241]
                    - generic [ref=e244]: ✓
                - cell "✗" [ref=e245]:
                  - generic [ref=e248]: ✗
              - row "Parenting Credit ✓ ✗" [ref=e249]:
                - cell "Parenting Credit" [ref=e250]
                - cell "✓" [ref=e251]:
                  - generic [ref=e252]:
                    - img [ref=e253]
                    - generic [ref=e256]: ✓
                - cell "✗" [ref=e257]:
                  - generic [ref=e260]: ✗
              - row "RCW 26.19 Compliant ✓ ✗" [ref=e261]:
                - cell "RCW 26.19 Compliant" [ref=e262]
                - cell "✓" [ref=e263]:
                  - generic [ref=e264]:
                    - img [ref=e265]
                    - generic [ref=e268]: ✓
                - cell "✗" [ref=e269]:
                  - generic [ref=e272]: ✗
        - generic [ref=e273]:
          - generic [ref=e274]:
            - img [ref=e276]
            - heading "Legal Precision" [level=3] [ref=e280]
            - paragraph [ref=e281]: Mapped exactly to the 2026 Washington State Economic Tables and statutory updates.
            - link "View methodology" [ref=e282] [cursor=pointer]:
              - /url: /editorial-methodology
              - text: View methodology
              - img [ref=e283]
          - generic [ref=e285]:
            - img [ref=e287]
            - heading "Privacy First" [level=3] [ref=e289]
            - paragraph [ref=e290]: No data is stored. All processing stays local in your browser session for 100% privacy.
            - link "Learn more" [ref=e291] [cursor=pointer]:
              - /url: /privacy
              - text: Learn more
              - img [ref=e292]
          - generic [ref=e294]:
            - img [ref=e296]
            - heading "Worksheet Wizard" [level=3] [ref=e298]
            - paragraph [ref=e299]: Generate the mandatory 8-part official PDF worksheet using our advanced automated wizard.
            - link "Launch Wizard" [ref=e300] [cursor=pointer]:
              - /url: /worksheet
              - text: Launch Wizard
              - img [ref=e301]
      - generic [ref=e305]:
        - generic [ref=e306]:
          - paragraph [ref=e307]: Updated January 2026
          - heading "2026 Washington Child Support Amounts by Income" [level=2] [ref=e308]
          - paragraph [ref=e309]: Standard monthly totals based on the 2026 economic table.
        - table "Benchmark Child Support Estimates for Washington State 2026" [ref=e311]:
          - caption [ref=e312]: Benchmark Child Support Estimates for Washington State 2026
          - rowgroup [ref=e313]:
            - row "Combined Monthly Net Income 1 Child 2 Children" [ref=e314]:
              - columnheader "Combined Monthly Net Income" [ref=e315]
              - columnheader "1 Child" [ref=e316]
              - columnheader "2 Children" [ref=e317]
          - rowgroup [ref=e318]:
            - row "$1,500 — —" [ref=e319] [cursor=pointer]:
              - cell "$1,500" [ref=e320]
              - cell "—" [ref=e321]
              - cell "—" [ref=e322]
            - row "$3,000 $652 $500" [ref=e323] [cursor=pointer]:
              - cell "$3,000" [ref=e324]
              - cell "$652" [ref=e325]
              - cell "$500" [ref=e326]
            - row "$5,000 $951 $723" [ref=e327] [cursor=pointer]:
              - cell "$5,000" [ref=e328]
              - cell "$951" [ref=e329]
              - cell "$723" [ref=e330]
            - row "$8,000 $1,270 $960" [ref=e331] [cursor=pointer]:
              - cell "$8,000" [ref=e332]
              - cell "$1,270" [ref=e333]
              - cell "$960" [ref=e334]
            - row "$10,000 $1,451 $1,099" [ref=e335] [cursor=pointer]:
              - cell "$10,000" [ref=e336]
              - cell "$1,451" [ref=e337]
              - cell "$1,099" [ref=e338]
            - row "$15,000 $1,876 $1,443" [ref=e339] [cursor=pointer]:
              - cell "$15,000" [ref=e340]
              - cell "$1,876" [ref=e341]
              - cell "$1,443" [ref=e342]
        - paragraph [ref=e343]: These figures are the presumptive basic support obligation from the 2026 Washington State economic table. Actual court orders may differ based on custody arrangements, healthcare costs, and judicial decisions.
        - link "Calculate Exact Support" [ref=e345] [cursor=pointer]:
          - /url: /worksheet
          - text: Calculate Exact Support
          - img [ref=e346]
      - generic [ref=e350]:
        - generic [ref=e351]:
          - paragraph [ref=e352]: Real Calculation Example
          - 'heading "Real Example: $5,000 Income, 2 Children in Washington State" [level=2] [ref=e353]'
        - generic [ref=e354]:
          - 'heading "Income Case: $5,000 Net Monthly" [level=3] [ref=e355]'
          - generic [ref=e356]:
            - generic [ref=e357]:
              - generic [ref=e358]: Net Monthly Income
              - generic [ref=e359]: $5,000
            - generic [ref=e360]:
              - generic [ref=e361]: Number of Children
              - generic [ref=e362]: "2"
            - generic [ref=e363]:
              - generic [ref=e364]: Location
              - generic [ref=e365]: King County
          - generic [ref=e367]:
            - generic [ref=e368]: Presumptive Base Support
            - generic [ref=e369]: $723/ mo
          - paragraph [ref=e370]:
            - text: In King County, courts apply the standard Washington economic schedule. For a combined net income of $5,000 with 2 children, the presumptive base support is
            - strong [ref=e371]: $723
            - text: per month. This amount is typically shared between parents based on their proportional income share.
      - generic [ref=e374]:
        - generic [ref=e375]:
          - paragraph [ref=e376]: 2026 EHB 1014 Guidelines
          - heading "How Washington State Calculates Child Support in 2026" [level=2] [ref=e377]
        - generic [ref=e378]:
          - generic [ref=e379]:
            - paragraph [ref=e380]:
              - text: Washington State uses the
              - strong [ref=e381]: Income Shares Model
              - text: ", where both parents' monthly net incomes are combined. A proportional share is dedicated to the children, reflecting what would have been spent if the household remained together."
            - generic [ref=e382]:
              - heading "The 2026 Schedule" [level=3] [ref=e383]
              - paragraph [ref=e384]: The 2026 economic tables cover combined monthly net incomes from $0 to $50,000.
              - list [ref=e385]:
                - listitem [ref=e386]:
                  - img [ref=e387]
                  - text: "Statutory minimum: $50 per child per month."
                - listitem [ref=e390]:
                  - img [ref=e391]
                  - text: Calculations cover all 39 Washington counties.
                - listitem [ref=e394]:
                  - img [ref=e395]
                  - text: Updated for 2026 economic standards.
          - generic [ref=e398]:
            - generic [ref=e399]:
              - heading "The Self-Support Reserve (SSR)" [level=3] [ref=e400]
              - paragraph [ref=e401]:
                - text: Washington's primary low-income protection is the
                - strong [ref=e402]: SSR
                - text: ", set at"
                - strong [ref=e403]: approximately $2,394 per month for 2026
                - text: . If a payment would leave the payer with less than this, the court may deviate the payment downward.
            - generic [ref=e404]:
              - heading "The 45% Net Income Cap" [level=3] [ref=e405]
              - paragraph [ref=e406]: Total support obligations typically cannot legally exceed 45% of a parent's monthly net income without explicit judicial approval for good cause.
      - generic [ref=e409]:
        - generic [ref=e410]:
          - paragraph [ref=e411]: Common Parent Questions
          - heading "Frequently Asked Questions About Washington Child Support" [level=2] [ref=e412]
        - generic [ref=e414]:
          - generic [ref=e415]:
            - heading "What is the minimum child support in Washington state?" [level=3] [ref=e416]:
              - button "What is the minimum child support in Washington state?" [expanded] [ref=e417] [cursor=pointer]:
                - generic [ref=e418]: What is the minimum child support in Washington state?
                - img [ref=e419]
            - region "What is the minimum child support in Washington state?" [ref=e421]:
              - paragraph [ref=e424]: The statutory minimum child support in Washington is $50 per child per month. Judges may deviate below this amount in extraordinary circumstances only, to ensure the paying parent's self-support reserve is protected.
          - generic [ref=e425]:
            - heading "How is Washington child support calculated in 2026?" [level=3] [ref=e426]:
              - button "How is Washington child support calculated in 2026?" [expanded] [ref=e427] [cursor=pointer]:
                - generic [ref=e428]: How is Washington child support calculated in 2026?
                - img [ref=e429]
            - region "How is Washington child support calculated in 2026?" [ref=e431]:
              - paragraph [ref=e434]: Washington uses an Income Shares Model. Both parents' net incomes are calculated and combined. The total presumptive support obligation is derived from the state's 2026 economic table and then split proportionally between the parents based on their percentage of the combined income.
          - generic [ref=e435]:
            - heading "What is the Self-Support Reserve (SSR) for 2026?" [level=3] [ref=e436]:
              - button "What is the Self-Support Reserve (SSR) for 2026?" [ref=e437] [cursor=pointer]:
                - generic [ref=e438]: What is the Self-Support Reserve (SSR) for 2026?
                - img [ref=e439]
            - region "What is the Self-Support Reserve (SSR) for 2026?":
              - paragraph [ref=e442]: The 2026 Self-Support Reserve (SSR) is approximately $2,394 per month. This low-income protection ensures that a paying parent is not left with less than approximately $2,394 to live on after making a basic child support payment.
          - generic [ref=e443]:
            - heading "Does child support cover extraordinary expenses like daycare?" [level=3] [ref=e444]:
              - button "Does child support cover extraordinary expenses like daycare?" [ref=e445] [cursor=pointer]:
                - generic [ref=e446]: Does child support cover extraordinary expenses like daycare?
                - img [ref=e447]
            - region "Does child support cover extraordinary expenses like daycare?":
              - paragraph [ref=e450]: No, the basic child support obligation covers only food, shelter, and basic clothing. Extraordinary expenses, such as work-related daycare, health insurance premiums, and approved educational costs, are apportioned separately based on the parents' proportional share of income.
      - generic [ref=e452]:
        - generic [ref=e453]:
          - paragraph [ref=e454]: Major Washington Counties
          - heading "Child Support Calculators by Washington County" [level=2] [ref=e455]
          - paragraph [ref=e456]: Local rules and benchmarks for Washington's major counties.
        - generic [ref=e457]:
          - link "King County Seattle metro · Highest volume of cases Benchmark $1,446/mo $5,000 income · 2 children" [ref=e458] [cursor=pointer]:
            - /url: /king-county-income-5000-2-children
            - generic [ref=e459]:
              - img [ref=e461]
              - generic [ref=e464]: King County
            - paragraph [ref=e465]: Seattle metro · Highest volume of cases
            - generic [ref=e466]:
              - generic [ref=e467]:
                - generic [ref=e468]: Benchmark
                - generic [ref=e469]: $1,446/mo
              - generic [ref=e470]: $5,000 income · 2 children
          - link "Pierce County Tacoma area · Second largest county Benchmark $1,446/mo $5,000 income · 2 children" [ref=e471] [cursor=pointer]:
            - /url: /pierce-county-income-5000-2-children
            - generic [ref=e472]:
              - img [ref=e474]
              - generic [ref=e477]: Pierce County
            - paragraph [ref=e478]: Tacoma area · Second largest county
            - generic [ref=e479]:
              - generic [ref=e480]:
                - generic [ref=e481]: Benchmark
                - generic [ref=e482]: $1,446/mo
              - generic [ref=e483]: $5,000 income · 2 children
          - link "Snohomish County Everett area · Growing caseload Benchmark $1,446/mo $5,000 income · 2 children" [ref=e484] [cursor=pointer]:
            - /url: /snohomish-county-income-5000-2-children
            - generic [ref=e485]:
              - img [ref=e487]
              - generic [ref=e490]: Snohomish County
            - paragraph [ref=e491]: Everett area · Growing caseload
            - generic [ref=e492]:
              - generic [ref=e493]:
                - generic [ref=e494]: Benchmark
                - generic [ref=e495]: $1,446/mo
              - generic [ref=e496]: $5,000 income · 2 children
          - link "Spokane County Eastern WA · Different local benchmarks Benchmark $1,446/mo $5,000 income · 2 children" [ref=e497] [cursor=pointer]:
            - /url: /spokane-county-income-5000-2-children
            - generic [ref=e498]:
              - img [ref=e500]
              - generic [ref=e503]: Spokane County
            - paragraph [ref=e504]: Eastern WA · Different local benchmarks
            - generic [ref=e505]:
              - generic [ref=e506]:
                - generic [ref=e507]: Benchmark
                - generic [ref=e508]: $1,446/mo
              - generic [ref=e509]: $5,000 income · 2 children
        - link "View all 39 counties" [ref=e511] [cursor=pointer]:
          - /url: /washington-courts
          - text: View all 39 counties
          - img [ref=e512]
      - generic [ref=e515]:
        - generic [ref=e516]:
          - generic [ref=e517]:
            - paragraph [ref=e518]: Legal Guides & Updates
            - heading "2026 Washington Child Support Guides and Legal Resources" [level=2] [ref=e519]
            - paragraph [ref=e520]: Legal guides and economic analysis for Washington State.
          - link "View all articles" [ref=e521] [cursor=pointer]:
            - /url: /blog
            - text: View all articles
            - img [ref=e522]
        - generic [ref=e524]:
          - 'link "Washington child support guidelines 2026 legal handbook Legal Updated: April 2026 2026 WA Guidelines: Complete Handbook Read Article" [ref=e525] [cursor=pointer]':
            - /url: /blog/washington-child-support-guidelines-2026
            - img "Washington child support guidelines 2026 legal handbook" [ref=e527]
            - generic [ref=e529]:
              - generic [ref=e530]:
                - generic [ref=e531]: Legal
                - generic [ref=e532]:
                  - img [ref=e533]
                  - text: "Updated: April 2026"
              - 'heading "2026 WA Guidelines: Complete Handbook" [level=3] [ref=e536]'
              - generic [ref=e537]:
                - generic [ref=e538]: Read Article
                - img [ref=e540]
          - 'link "Washington self-support reserve 2026 explanation Analysis Updated: April 2026 Self-Support Reserve (SSR) Explained Read Article" [ref=e542] [cursor=pointer]':
            - /url: /blog/washington-ssr-self-support-reserve-explained
            - img "Washington self-support reserve 2026 explanation" [ref=e544]
            - generic [ref=e546]:
              - generic [ref=e547]:
                - generic [ref=e548]: Analysis
                - generic [ref=e549]:
                  - img [ref=e550]
                  - text: "Updated: April 2026"
              - heading "Self-Support Reserve (SSR) Explained" [level=3] [ref=e553]
              - generic [ref=e554]:
                - generic [ref=e555]: Read Article
                - img [ref=e557]
          - 'link "King County child support rules and calculator guide Local Rules Updated: April 2026 King County Child Support Rules Read Article" [ref=e559] [cursor=pointer]':
            - /url: /blog/king-county-child-support-rules
            - img "King County child support rules and calculator guide" [ref=e561]
            - generic [ref=e563]:
              - generic [ref=e564]:
                - generic [ref=e565]: Local Rules
                - generic [ref=e566]:
                  - img [ref=e567]
                  - text: "Updated: April 2026"
              - heading "King County Child Support Rules" [level=3] [ref=e570]
              - generic [ref=e571]:
                - generic [ref=e572]: Read Article
                - img [ref=e574]
  - contentinfo [ref=e576]:
    - generic [ref=e577]:
      - generic [ref=e578]:
        - generic [ref=e579]:
          - link "WSCSS" [ref=e580] [cursor=pointer]:
            - /url: /
            - img [ref=e582]
            - generic [ref=e584]: WSCSS
          - paragraph [ref=e585]: Precision child support calculations for Washington State families. Official AOC-aligned data source.
          - link "Email support" [ref=e586] [cursor=pointer]:
            - /url: mailto:support@wscss.site
            - img [ref=e588]
            - generic [ref=e591]: support@wscss.site
        - generic [ref=e592]:
          - heading "Calculators" [level=4] [ref=e593]
          - list [ref=e594]:
            - listitem [ref=e595]:
              - link "Calculator" [ref=e596] [cursor=pointer]:
                - /url: /
            - listitem [ref=e597]:
              - link "Worksheet Pro Wizard" [ref=e598] [cursor=pointer]:
                - /url: /worksheet
            - listitem [ref=e599]:
              - link "King County Guide" [ref=e600] [cursor=pointer]:
                - /url: /king-county-income-5000-2-children
            - listitem [ref=e601]:
              - link "Pierce County Guide" [ref=e602] [cursor=pointer]:
                - /url: /pierce-county-income-5000-2-children
            - listitem [ref=e603]:
              - link "Snohomish County Guide" [ref=e604] [cursor=pointer]:
                - /url: /snohomish-county-income-5000-2-children
            - listitem [ref=e605]:
              - link "Spokane County Guide" [ref=e606] [cursor=pointer]:
                - /url: /spokane-county-income-5000-2-children
        - generic [ref=e607]:
          - heading "Resources" [level=4] [ref=e608]
          - list [ref=e609]:
            - listitem [ref=e610]:
              - link "AOC Mandatory Forms" [ref=e611] [cursor=pointer]:
                - /url: https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16
            - listitem [ref=e612]:
              - link "WA DSHS Support Center" [ref=e613] [cursor=pointer]:
                - /url: https://www.dshs.wa.gov/esa/division-child-support
            - listitem [ref=e614]:
              - link "Legal Guides & Blog" [ref=e615] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e616]:
              - link "About WSCSS" [ref=e617] [cursor=pointer]:
                - /url: /about
        - generic [ref=e618]:
          - heading "Legal" [level=4] [ref=e619]
          - list [ref=e620]:
            - listitem [ref=e621]:
              - link "Privacy Policy" [ref=e622] [cursor=pointer]:
                - /url: /privacy
                - img [ref=e623]
                - text: Privacy Policy
            - listitem [ref=e625]:
              - link "Terms of Service" [ref=e626] [cursor=pointer]:
                - /url: /terms
                - img [ref=e627]
                - text: Terms of Service
            - listitem [ref=e631]:
              - link "Methodology" [ref=e632] [cursor=pointer]:
                - /url: /editorial-methodology
                - img [ref=e633]
                - text: Methodology
            - listitem [ref=e637]:
              - link "Legal Disclaimer" [ref=e638] [cursor=pointer]:
                - /url: /disclaimer
                - img [ref=e639]
                - text: Legal Disclaimer
      - generic [ref=e643]:
        - generic [ref=e644]:
          - paragraph [ref=e645]: © 2026 Washington State Child Support Schedule
          - paragraph [ref=e646]: WSCSS is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines. All calculations are estimates only.
        - generic [ref=e648]: RCW 26.19 Compliant
  - generic [ref=e654] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e655]:
      - img [ref=e656]
    - generic [ref=e659]:
      - button "Open issues overlay" [ref=e660]:
        - generic [ref=e661]:
          - generic [ref=e662]: "0"
          - generic [ref=e663]: "1"
        - generic [ref=e664]: Issue
      - button "Collapse issues badge" [ref=e665]:
        - img [ref=e666]
  - alert [ref=e668]
  - dialog "Cookie consent" [ref=e669]:
    - generic [ref=e670]:
      - generic [ref=e671]:
        - img [ref=e673]
        - generic [ref=e675]:
          - heading "Privacy Notice" [level=3] [ref=e676]
          - paragraph [ref=e677]:
            - text: We use cookies for analytics. No personal calculation data is ever stored.
            - link "Details" [ref=e678] [cursor=pointer]:
              - /url: /privacy
        - button [ref=e679] [cursor=pointer]:
          - img [ref=e680]
      - generic [ref=e683]:
        - button "Decline" [ref=e684] [cursor=pointer]
        - button "Accept" [ref=e685] [cursor=pointer]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('verify child support calculations', async ({ page }) => {
  4  |   await page.goto('http://localhost:3000');
  5  |
  6  |   // Helper to run a test case
  7  |   async function runTestCase(p1: string, p2: string, children: string, expected: string, payer: string = 'P1', useDeviation: boolean = false) {
  8  |     await page.fill('#parent1-income', p1);
  9  |     await page.fill('#parent2-income', p2);
  10 |     await page.selectOption('#children-count', { value: children });
  11 |
  12 |     // Select payer
  13 |     if (payer === 'P1') {
  14 |       await page.click('button:has-text("Parent 1")');
  15 |     } else {
  16 |       await page.click('button:has-text("Parent 2")');
  17 |     }
  18 |
  19 |     if (useDeviation) {
  20 |         const deviationToggle = page.locator('button:has-text("No")').first();
  21 |         if (await deviationToggle.isVisible()) {
  22 |             await deviationToggle.click();
  23 |         }
  24 |         await page.selectOption('select:below(div:has-text("Overnights"))', '183');
  25 |     } else {
  26 |         const deviationToggle = page.locator('button:has-text("Yes")').first();
  27 |         if (await deviationToggle.isVisible()) {
  28 |             await deviationToggle.click();
  29 |         }
  30 |     }
  31 |
  32 |     await page.waitForTimeout(2000);
  33 |
  34 |     // Look for the large blue text
  35 |     const resultLocator = page.locator('.text-blue-600.font-extrabold').first();
> 36 |     const result = await resultLocator.textContent();
     |                                        ^ Error: locator.textContent: Test timeout of 30000ms exceeded.
  37 |
  38 |     console.log(`Input: P1=${p1}, P2=${p2}, Children=${children}, Payer=${payer}, Deviation=${useDeviation}`);
  39 |     console.log(`Expected: ${expected}, Actual: ${result}`);
  40 |
  41 |     const numericResult = result?.replace(/[^0-9]/g, '');
  42 |     const numericExpected = expected.replace(/[^0-9]/g, '');
  43 |     expect(numericResult).toBe(numericExpected);
  44 |   }
  45 |
  46 |   console.log('Running Test 1...');
  47 |   await runTestCase('5000', '0', '2', '$723');
  48 |
  49 |   console.log('Running Test 2...');
  50 |   await runTestCase('5800', '1000', '2', '$728');
  51 |
  52 |   console.log('Running Test 3...');
  53 |   await runTestCase('2500', '2500', '2', '$106');
  54 |
  55 |   console.log('Running Test 4...');
  56 |   await runTestCase('3000', '0', '1', '$652');
  57 |
  58 |   console.log('Running Test 5...');
  59 |   await runTestCase('3000', '0', '1', '$455', 'P1', true);
  60 | });
  61 |
```