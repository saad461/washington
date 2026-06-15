# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/responsive_audit.test.ts >> Responsive Audit >> Verify Desktop (1280px)
- Location: tests/responsive_audit.test.ts:12:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1')
Expected: visible
Error: strict mode violation: locator('h1') resolved to 2 elements:
    1) <h1 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">…</h1> aka getByRole('heading', { name: 'Washington State Child' })
    2) <h1 class="text-3xl font-bold text-gray-900">WSCSS.site — Child Support Estimate</h1> aka getByText('WSCSS.site — Child Support')

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h1')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - button "Calculators" [ref=e19]:
          - text: Calculators
          - img [ref=e20]
        - link "Worksheet Wizard" [ref=e22] [cursor=pointer]:
          - /url: /worksheet
        - link "Courts" [ref=e23] [cursor=pointer]:
          - /url: /washington-courts
        - link "Glossary" [ref=e24] [cursor=pointer]:
          - /url: /glossary
        - link "2026 Updates" [ref=e25] [cursor=pointer]:
          - /url: /compare-2024-2026
      - link "Launch Wizard" [ref=e27] [cursor=pointer]:
        - /url: /worksheet
        - generic [ref=e28]: Launch
        - text: Wizard
        - img [ref=e29]
  - main [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e34]:
        - link "Back to Home" [ref=e35] [cursor=pointer]:
          - /url: /
          - img [ref=e36]
          - text: Back to Home
        - generic [ref=e38]:
          - paragraph [ref=e39]: RCW 26.19.075 · 2025 IRS Tax Brackets
          - heading "Washington State Child Support Deviation Calculator" [level=1] [ref=e40]
          - paragraph [ref=e41]: Washington State child support begins with the standard schedule amount but courts can order more or less based on specific circumstances. This deviation calculator helps you estimate how qualifying factors under RCW 26.19.075 may adjust your support obligation above or below the 2026 Washington State Child Support Schedule amount.
      - generic [ref=e44]:
        - generic [ref=e46]:
          - generic [ref=e47]:
            - img [ref=e49]
            - heading "Standard Obligation" [level=2] [ref=e53]
          - generic [ref=e54]:
            - paragraph [ref=e56]:
              - strong [ref=e57]: Federal tax estimate based on 2025 IRS tax brackets.
              - text: Standard deduction of $15,000 applied.
            - button "Not sure of monthly net income? Estimate it here ▼" [ref=e59]
            - generic [ref=e60]:
              - generic [ref=e61]:
                - generic [ref=e62]: Obligor Annual Gross
                - generic [ref=e63]:
                  - generic [ref=e64]: $
                  - spinbutton "Obligor Annual Gross" [ref=e65]
              - generic [ref=e66]:
                - generic [ref=e67]: Obligee Annual Gross
                - generic [ref=e68]:
                  - generic [ref=e69]: $
                  - spinbutton "Obligee Annual Gross" [ref=e70]
            - generic [ref=e71]:
              - generic [ref=e72]: Number of Children
              - combobox "Number of Children" [ref=e73]:
                - option "1" [selected]
                - option "2"
                - option "3"
                - option "4"
                - option "5"
            - separator [ref=e74]
            - generic [ref=e75]:
              - heading "Deviation Factors" [level=3] [ref=e76]
              - generic [ref=e77]:
                - generic [ref=e78]:
                  - button "Extraordinary medical expenses RCW 26.19.075(1)(c)(iv) Significant medical expenses not covered by insurance." [ref=e79]:
                    - generic [ref=e82]:
                      - generic [ref=e83]: Extraordinary medical expenses
                      - generic [ref=e84]: RCW 26.19.075(1)(c)(iv)
                    - img "Significant medical expenses not covered by insurance." [ref=e85]
                  - button "Learn more" [ref=e88]:
                    - img [ref=e89]
                    - text: Learn more
                - generic [ref=e91]:
                  - button "Educational expenses RCW 26.19.075(1)(c)(i) Tuition and related costs for private schools or special needs." [ref=e92]:
                    - generic [ref=e95]:
                      - generic [ref=e96]: Educational expenses
                      - generic [ref=e97]: RCW 26.19.075(1)(c)(i)
                    - img "Tuition and related costs for private schools or special needs." [ref=e98]
                  - button "Learn more" [ref=e101]:
                    - img [ref=e102]
                    - text: Learn more
                - generic [ref=e104]:
                  - button "Long distance transportation costs RCW 26.19.075(1)(c)(i) Travel costs for residential time when parents live far apart." [ref=e105]:
                    - generic [ref=e108]:
                      - generic [ref=e109]: Long distance transportation costs
                      - generic [ref=e110]: RCW 26.19.075(1)(c)(i)
                    - img "Travel costs for residential time when parents live far apart." [ref=e111]
                  - button "Learn more" [ref=e114]:
                    - img [ref=e115]
                    - text: Learn more
                - generic [ref=e117]:
                  - button "Debt obligations prior to separation RCW 26.19.075(1)(c)(i) Debts incurred during the relationship that are still being paid." [ref=e118]:
                    - generic [ref=e121]:
                      - generic [ref=e122]: Debt obligations prior to separation
                      - generic [ref=e123]: RCW 26.19.075(1)(c)(i)
                    - img "Debts incurred during the relationship that are still being paid." [ref=e124]
                  - button "Learn more" [ref=e127]:
                    - img [ref=e128]
                    - text: Learn more
                - generic [ref=e130]:
                  - button "Children from other relationships RCW 26.19.075(1)(e) Legal duty to support biological children from other relationships." [ref=e131]:
                    - generic [ref=e134]:
                      - generic [ref=e135]: Children from other relationships
                      - generic [ref=e136]: RCW 26.19.075(1)(e)
                    - img "Legal duty to support biological children from other relationships." [ref=e137]
                  - button "Learn more" [ref=e140]:
                    - img [ref=e141]
                    - text: Learn more
                - generic [ref=e143]:
                  - button "Significant assets of the child RCW 26.19.075(1)(a)(vii) Child has substantial independent wealth or assets." [ref=e144]:
                    - generic [ref=e147]:
                      - generic [ref=e148]: Significant assets of the child
                      - generic [ref=e149]: RCW 26.19.075(1)(a)(vii)
                    - img "Child has substantial independent wealth or assets." [ref=e150]
                  - button "Learn more" [ref=e153]:
                    - img [ref=e154]
                    - text: Learn more
                - generic [ref=e156]:
                  - button "Income of new spouse or domestic partner RCW 26.19.075(1)(a)(i) May be considered only if the parent is also requesting deviation for another reason. Not sufficient alone." [ref=e157]:
                    - generic [ref=e160]:
                      - generic [ref=e161]: Income of new spouse or domestic partner
                      - generic [ref=e162]: RCW 26.19.075(1)(a)(i)
                    - img "May be considered only if the parent is also requesting deviation for another reason. Not sufficient alone." [ref=e163]
                  - button "Learn more" [ref=e166]:
                    - img [ref=e167]
                    - text: Learn more
                - generic [ref=e169]:
                  - button "Nonrecurring income RCW 26.19.075(1)(b) Overtime, bonuses, or second job income that will not recur. Based on prior 2 calendar years." [ref=e170]:
                    - generic [ref=e173]:
                      - generic [ref=e174]: Nonrecurring income
                      - generic [ref=e175]: RCW 26.19.075(1)(b)
                    - img "Overtime, bonuses, or second job income that will not recur. Based on prior 2 calendar years." [ref=e176]
                  - button "Learn more" [ref=e179]:
                    - img [ref=e180]
                    - text: Learn more
                - generic [ref=e182]:
                  - button "Possession of substantial wealth RCW 26.19.075(1)(a)(vi) Savings, investments, real estate, vehicles, boats, pensions, bank accounts, insurance, or other assets." [ref=e183]:
                    - generic [ref=e186]:
                      - generic [ref=e187]: Possession of substantial wealth
                      - generic [ref=e188]: RCW 26.19.075(1)(a)(vi)
                    - img "Savings, investments, real estate, vehicles, boats, pensions, bank accounts, insurance, or other assets." [ref=e189]
                  - button "Learn more" [ref=e192]:
                    - img [ref=e193]
                    - text: Learn more
                - generic [ref=e195]:
                  - button "Extraordinary income of a child RCW 26.19.075(1)(a)(vii) Child has significant income of their own." [ref=e196]:
                    - generic [ref=e199]:
                      - generic [ref=e200]: Extraordinary income of a child
                      - generic [ref=e201]: RCW 26.19.075(1)(a)(vii)
                    - img "Child has significant income of their own." [ref=e202]
                  - button "Learn more" [ref=e205]:
                    - img [ref=e206]
                    - text: Learn more
                - generic [ref=e208]:
                  - button "Tax planning considerations RCW 26.19.075(1)(a)(viii) Deviation may be granted only if children receive no lesser economic benefit as a result." [ref=e209]:
                    - generic [ref=e212]:
                      - generic [ref=e213]: Tax planning considerations
                      - generic [ref=e214]: RCW 26.19.075(1)(a)(viii)
                    - img "Deviation may be granted only if children receive no lesser economic benefit as a result." [ref=e215]
                  - button "Learn more" [ref=e218]:
                    - img [ref=e219]
                    - text: Learn more
                - generic [ref=e221]:
                  - button "Special needs of disabled child RCW 26.19.075(1)(c)(iii) Physical, mental, or emotional disabilities requiring special care or expenses." [ref=e222]:
                    - generic [ref=e225]:
                      - generic [ref=e226]: Special needs of disabled child
                      - generic [ref=e227]: RCW 26.19.075(1)(c)(iii)
                    - img "Physical, mental, or emotional disabilities requiring special care or expenses." [ref=e228]
                  - button "Learn more" [ref=e231]:
                    - img [ref=e232]
                    - text: Learn more
                - generic [ref=e234]:
                  - button "Psychological needs of child RCW 26.19.075(1)(c)(iv) Special psychological or mental health needs beyond normal healthcare expenses." [ref=e235]:
                    - generic [ref=e238]:
                      - generic [ref=e239]: Psychological needs of child
                      - generic [ref=e240]: RCW 26.19.075(1)(c)(iv)
                    - img "Special psychological or mental health needs beyond normal healthcare expenses." [ref=e241]
                  - button "Learn more" [ref=e244]:
                    - img [ref=e245]
                    - text: Learn more
                - generic [ref=e247]:
                  - button "Court ordered reunification costs RCW 26.19.075(1)(c)(v) Costs to comply with court ordered reunification efforts under chapter 13.34 RCW." [ref=e248]:
                    - generic [ref=e251]:
                      - generic [ref=e252]: Court ordered reunification costs
                      - generic [ref=e253]: RCW 26.19.075(1)(c)(v)
                    - img "Costs to comply with court ordered reunification efforts under chapter 13.34 RCW." [ref=e254]
                  - button "Learn more" [ref=e257]:
                    - img [ref=e258]
                    - text: Learn more
                - generic [ref=e260]:
                  - button "Significant income disparity RCW 26.19.075(1)(c)(ii) Significant difference in living costs between households due to conditions beyond parents control." [ref=e261]:
                    - generic [ref=e264]:
                      - generic [ref=e265]: Significant income disparity
                      - generic [ref=e266]: RCW 26.19.075(1)(c)(ii)
                    - img "Significant difference in living costs between households due to conditions beyond parents control." [ref=e267]
                  - button "Learn more" [ref=e270]:
                    - img [ref=e271]
                    - text: Learn more
        - generic [ref=e274]:
          - heading "Deviation Analysis" [level=3] [ref=e275]:
            - img [ref=e276]
            - text: Deviation Analysis
          - generic [ref=e278]:
            - generic [ref=e279]:
              - button "Monthly View" [ref=e280]
              - button "Yearly View" [ref=e281]
            - generic [ref=e282]:
              - generic [ref=e284]:
                - generic [ref=e285]: Standard 2026 Obligation
                - generic [ref=e286]: $50
              - generic [ref=e288]:
                - generic [ref=e289]: Adjusted Support Amount
                - generic [ref=e290]:
                  - generic [ref=e291]: $50
                  - paragraph [ref=e292]: 0.0% from 2026 standard
            - generic [ref=e293]: Deviation amounts are determined by the court after considering all circumstances. This calculator provides an estimate only. Courts require written findings of fact for any deviation from the standard calculation per RCW 26.19.075(2). Consult a Washington family law attorney for accurate advice.
            - button "How was this calculated? ▼" [ref=e295]
            - generic [ref=e296]:
              - button "Save This Calculation" [ref=e297] [cursor=pointer]:
                - img [ref=e298]
                - text: Save This Calculation
              - button "Your Saved Calculations ▼" [ref=e302]:
                - img [ref=e303]
                - text: Your Saved Calculations ▼
            - button "Print Results" [ref=e308] [cursor=pointer]:
              - img [ref=e309]
              - text: Print Results
            - generic [ref=e314]:
              - generic [ref=e315]:
                - heading "Want to review these results with a Washington family law attorney?" [level=4] [ref=e316]
                - paragraph [ref=e317]: The Washington State Bar Association can help you find a licensed family law attorney near you.
              - link "Find a WA Family Law Attorney" [ref=e318] [cursor=pointer]:
                - /url: https://www.wsba.org/find-a-lawyer
                - text: Find a WA Family Law Attorney
                - img [ref=e319]
            - generic [ref=e323]:
              - heading "You may also need" [level=4] [ref=e324]
              - generic [ref=e325]:
                - link "Joint Custody Calculator Combine deviation with custody adjustment Open Tool" [ref=e326] [cursor=pointer]:
                  - /url: /joint-custody-calculator
                  - img [ref=e328]
                  - heading "Joint Custody Calculator" [level=5] [ref=e332]
                  - paragraph [ref=e333]: Combine deviation with custody adjustment
                  - generic [ref=e334]:
                    - text: Open Tool
                    - img [ref=e335]
                - link "Modification Calculator See if your order needs updating Open Tool" [ref=e337] [cursor=pointer]:
                  - /url: /modification-calculator
                  - img [ref=e339]
                  - heading "Modification Calculator" [level=5] [ref=e342]
                  - paragraph [ref=e343]: See if your order needs updating
                  - generic [ref=e344]:
                    - text: Open Tool
                    - img [ref=e345]
                - link "Basic Calculator See standard amount without deviation Open Tool" [ref=e347] [cursor=pointer]:
                  - /url: /
                  - img [ref=e349]
                  - heading "Basic Calculator" [level=5] [ref=e351]
                  - paragraph [ref=e352]: See standard amount without deviation
                  - generic [ref=e353]:
                    - text: Open Tool
                    - img [ref=e354]
      - generic [ref=e358]:
        - generic [ref=e359]:
          - generic [ref=e360]:
            - heading "What Is a Child Support Deviation in Washington State" [level=2] [ref=e361]
            - paragraph [ref=e362]: A deviation is a court approved adjustment to the standard child support amount. Washington law under RCW 26.19.075 allows either parent to request a deviation when specific financial circumstances make the standard amount unjust or inappropriate. Deviations can go upward — increasing support — or downward — reducing it.
          - generic [ref=e363]:
            - heading "Common Reasons for Upward Deviation" [level=2] [ref=e364]
            - paragraph [ref=e365]: Courts may order above standard support when a child has extraordinary medical needs, significant educational expenses such as private school or tutoring, or when long distance parenting arrangements create substantial transportation costs that one parent bears alone.
          - generic [ref=e366]:
            - heading "Common Reasons for Downward Deviation" [level=2] [ref=e367]
            - paragraph [ref=e368]: Courts may reduce support below the standard amount when the paying parent has substantial prior debts from before the separation, supports children from other relationships, or when the child has significant independent assets or income of their own.
          - generic [ref=e369]:
            - heading "How Courts Decide on Deviations" [level=2] [ref=e370]
            - paragraph [ref=e371]: A judge does not automatically grant a deviation request. The requesting parent must show that applying the standard amount would be unjust given the specific circumstances. This calculator helps you estimate the adjusted amount but a family law attorney should be consulted before requesting a formal deviation.
        - generic [ref=e372]:
          - generic [ref=e373]:
            - heading "Legal Grounds for a Child Support Deviation in Washington State" [level=2] [ref=e374]
            - paragraph [ref=e375]: When using a deviation calculator, it is vital to know which statutory factors the court legally recognizes. Under Washington law (RCW 26.19.075), judges will not grant a deviation for lifestyle preferences. You must qualify under specific legal categories.
            - generic [ref=e376]:
              - generic [ref=e377]:
                - heading "1. Nonrecurring Income or One-Time Financial Windfalls" [level=3] [ref=e378]
                - paragraph [ref=e379]: If a parent’s income is temporarily inflated by a one-time bonus, inheritance, lottery winnings, or a short-term real estate sale, the court may deviate downward from using that specific year's tax returns. Courts can isolate baseline income from these nonrecurring windfalls when determining a just transfer payment.
              - generic [ref=e380]:
                - heading "2. Income of Other Adults in the Household" [level=3] [ref=e381]
                - paragraph [ref=e382]: While a step-parent or new live-in partner has no legal duty to support your child, their financial contributions to rent, groceries, and utilities change your financial position. A judge may use this household income to deny a downward deviation or justify an upward adjustment.
              - generic [ref=e383]:
                - heading "3. Extraordinary Expenses and Debt Obligations" [level=3] [ref=e384]
                - generic [ref=e385]:
                  - paragraph [ref=e386]: "Standard child support schedules assume basic cost-of-living metrics. You can request a deviation if you pay for:"
                  - list [ref=e387]:
                    - listitem [ref=e388]:
                      - strong [ref=e389]: "Special Needs:"
                      - text: Extraordinary medical, dental, or mental health costs.
                    - listitem [ref=e390]:
                      - strong [ref=e391]: "Educational Needs:"
                      - text: Specialized private schooling or tutoring for a disabled child.
                    - listitem [ref=e392]:
                      - strong [ref=e393]: "Prior Debt:"
                      - text: Court-ordered debt from a previous marriage that severely limits current income.
                    - listitem [ref=e394]:
                      - strong [ref=e395]: "Long-Distance Travel:"
                      - text: High costs associated with transporting the child between parents for residential time.
              - generic [ref=e396]:
                - heading "4. Children from Other Relationships" [level=3] [ref=e397]
                - paragraph [ref=e398]: If the paying parent has a legal duty to support biological children from a different relationship, Washington law allows for a downward deviation. This ensures that children from a first or subsequent family are not financially starved by the current child support transfer payment.
          - generic [ref=e399]:
            - heading "Why Was My Child Support Deviation Denied?" [level=2] [ref=e400]
            - paragraph [ref=e401]: "Even if our deviation tool shows you qualify for an adjustment, a family law judge can still deny your request. The two most common reasons for denial in Washington courts are:"
            - generic [ref=e402]:
              - generic [ref=e403]:
                - img [ref=e405]
                - generic [ref=e409]:
                  - heading "The Substantial Hardship Rule" [level=3] [ref=e410]
                  - paragraph [ref=e411]: The court will reject any downward deviation if reducing the support payment pushes the receiving parent's household below the federal poverty line or leaves them unable to provide basic shelter and food for the child.
              - generic [ref=e412]:
                - img [ref=e414]
                - generic [ref=e418]:
                  - heading "Lack of Strict Documentation" [level=3] [ref=e419]
                  - paragraph [ref=e420]: You cannot use estimates. If you request a deviation for extraordinary medical bills or travel, you must provide the court with receipts, clear invoices, and a history of payment records.
        - generic [ref=e421]:
          - heading "Frequently Asked Questions" [level=2] [ref=e422]
          - generic [ref=e424]:
            - generic [ref=e425]:
              - heading "What is a child support deviation in Washington State?" [level=3] [ref=e426]:
                - button "What is a child support deviation in Washington State?" [expanded] [ref=e427] [cursor=pointer]:
                  - generic [ref=e428]: What is a child support deviation in Washington State?
                  - img [ref=e429]
              - region "What is a child support deviation in Washington State?" [ref=e431]:
                - paragraph [ref=e434]: A child support deviation in Washington State is a court approved adjustment that sets support above or below the standard schedule amount. It is governed by RCW 26.19.075 and requires the requesting parent to show that the standard amount would be unjust given their specific circumstances.
            - generic [ref=e435]:
              - heading "What qualifies for a downward deviation in Washington child support?" [level=3] [ref=e436]:
                - button "What qualifies for a downward deviation in Washington child support?" [expanded] [ref=e437] [cursor=pointer]:
                  - generic [ref=e438]: What qualifies for a downward deviation in Washington child support?
                  - img [ref=e439]
              - region "What qualifies for a downward deviation in Washington child support?" [ref=e441]:
                - paragraph [ref=e444]: Qualifying reasons for a downward deviation in Washington include significant debt obligations incurred before the separation, support obligations for children from other relationships, a child's significant independent assets or income, and other financial hardships that make the standard amount unjust.
            - generic [ref=e445]:
              - heading "Can I get more child support than the standard amount in Washington?" [level=3] [ref=e446]:
                - button "Can I get more child support than the standard amount in Washington?" [ref=e447] [cursor=pointer]:
                  - generic [ref=e448]: Can I get more child support than the standard amount in Washington?
                  - img [ref=e449]
              - region "Can I get more child support than the standard amount in Washington?"
            - generic [ref=e451]:
              - heading "How much can child support deviate from the standard in Washington?" [level=3] [ref=e452]:
                - button "How much can child support deviate from the standard in Washington?" [ref=e453] [cursor=pointer]:
                  - generic [ref=e454]: How much can child support deviate from the standard in Washington?
                  - img [ref=e455]
              - region "How much can child support deviate from the standard in Washington?"
            - generic [ref=e457]:
              - heading "Do both parents have to agree to a deviation?" [level=3] [ref=e458]:
                - button "Do both parents have to agree to a deviation?" [ref=e459] [cursor=pointer]:
                  - generic [ref=e460]: Do both parents have to agree to a deviation?
                  - img [ref=e461]
              - region "Do both parents have to agree to a deviation?"
            - generic [ref=e463]:
              - heading "How does nonrecurring income affect child support in Washington?" [level=3] [ref=e464]:
                - button "How does nonrecurring income affect child support in Washington?" [ref=e465] [cursor=pointer]:
                  - generic [ref=e466]: How does nonrecurring income affect child support in Washington?
                  - img [ref=e467]
              - region "How does nonrecurring income affect child support in Washington?"
            - generic [ref=e469]:
              - heading "Does my partner's income count towards child support in Washington?" [level=3] [ref=e470]:
                - button "Does my partner's income count towards child support in Washington?" [ref=e471] [cursor=pointer]:
                  - generic [ref=e472]: Does my partner's income count towards child support in Washington?
                  - img [ref=e473]
              - region "Does my partner's income count towards child support in Washington?"
            - generic [ref=e475]:
              - heading "What extraordinary expenses qualify for a deviation?" [level=3] [ref=e476]:
                - button "What extraordinary expenses qualify for a deviation?" [ref=e477] [cursor=pointer]:
                  - generic [ref=e478]: What extraordinary expenses qualify for a deviation?
                  - img [ref=e479]
              - region "What extraordinary expenses qualify for a deviation?"
            - generic [ref=e481]:
              - heading "Can I get a deviation if I have children from another relationship?" [level=3] [ref=e482]:
                - button "Can I get a deviation if I have children from another relationship?" [ref=e483] [cursor=pointer]:
                  - generic [ref=e484]: Can I get a deviation if I have children from another relationship?
                  - img [ref=e485]
              - region "Can I get a deviation if I have children from another relationship?"
            - generic [ref=e487]:
              - heading "Why might a judge deny my child support deviation request?" [level=3] [ref=e488]:
                - button "Why might a judge deny my child support deviation request?" [ref=e489] [cursor=pointer]:
                  - generic [ref=e490]: Why might a judge deny my child support deviation request?
                  - img [ref=e491]
              - region "Why might a judge deny my child support deviation request?"
        - generic [ref=e493]:
          - heading "Legal Disclaimer" [level=3] [ref=e494]:
            - img [ref=e495]
            - text: Legal Disclaimer
          - paragraph [ref=e497]: Deviations from the Washington State child support schedule are determined by a judge based on the standards in RCW 26.19.075. This calculator provides an estimate based on the values you enter, but the final determination requires written findings of fact from a court.
  - contentinfo [ref=e498]:
    - generic [ref=e499]:
      - generic [ref=e500]:
        - generic [ref=e501]:
          - link "WSCSS" [ref=e502] [cursor=pointer]:
            - /url: /
            - img [ref=e504]
            - generic [ref=e506]: WSCSS
          - paragraph [ref=e507]: Precision child support calculations for Washington State families. Official AOC-aligned data source.
          - link "Email support" [ref=e508] [cursor=pointer]:
            - /url: mailto:support@wscss.site
            - img [ref=e510]
            - generic [ref=e513]: support@wscss.site
        - generic [ref=e514]:
          - heading "Calculators" [level=4] [ref=e515]
          - list [ref=e516]:
            - listitem [ref=e517]:
              - link "Calculator" [ref=e518] [cursor=pointer]:
                - /url: /
            - listitem [ref=e519]:
              - link "Worksheet Pro Wizard" [ref=e520] [cursor=pointer]:
                - /url: /worksheet
            - listitem [ref=e521]:
              - link "King County Guide" [ref=e522] [cursor=pointer]:
                - /url: /washington-courts/king-county
            - listitem [ref=e523]:
              - link "Pierce County Guide" [ref=e524] [cursor=pointer]:
                - /url: /washington-courts/pierce-county
            - listitem [ref=e525]:
              - link "Snohomish County Guide" [ref=e526] [cursor=pointer]:
                - /url: /washington-courts/snohomish-county
            - listitem [ref=e527]:
              - link "Spokane County Guide" [ref=e528] [cursor=pointer]:
                - /url: /washington-courts/spokane-county
        - generic [ref=e529]:
          - heading "Resources" [level=4] [ref=e530]
          - list [ref=e531]:
            - listitem [ref=e532]:
              - link "AOC Mandatory Forms" [ref=e533] [cursor=pointer]:
                - /url: https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16
            - listitem [ref=e534]:
              - link "WA DSHS Support Center" [ref=e535] [cursor=pointer]:
                - /url: https://www.dshs.wa.gov/esa/division-child-support
            - listitem [ref=e536]:
              - link "Legal Guides & Blog" [ref=e537] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e538]:
              - link "About WSCSS" [ref=e539] [cursor=pointer]:
                - /url: /about
        - generic [ref=e540]:
          - heading "Legal" [level=4] [ref=e541]
          - list [ref=e542]:
            - listitem [ref=e543]:
              - link "Privacy Policy" [ref=e544] [cursor=pointer]:
                - /url: /privacy
                - img [ref=e545]
                - text: Privacy Policy
            - listitem [ref=e547]:
              - link "Terms of Service" [ref=e548] [cursor=pointer]:
                - /url: /terms
                - img [ref=e549]
                - text: Terms of Service
            - listitem [ref=e553]:
              - link "Methodology" [ref=e554] [cursor=pointer]:
                - /url: /editorial-methodology
                - img [ref=e555]
                - text: Methodology
            - listitem [ref=e559]:
              - link "Legal Disclaimer" [ref=e560] [cursor=pointer]:
                - /url: /disclaimer
                - img [ref=e561]
                - text: Legal Disclaimer
      - generic [ref=e565]:
        - generic [ref=e566]:
          - paragraph [ref=e567]: © 2026 Washington State Child Support Schedule
          - paragraph [ref=e568]: WSCSS is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines. All calculations are estimates only.
        - generic [ref=e570]: RCW 26.19 Compliant
  - button "Open Next.js Dev Tools" [ref=e577] [cursor=pointer]:
    - img [ref=e578]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | const viewports = [
  4  |   { name: 'iPhone SE', width: 320, height: 568 },
  5  |   { name: 'Standard Mobile', width: 375, height: 812 },
  6  |   { name: 'Tablet', width: 768, height: 1024 },
  7  |   { name: 'Desktop', width: 1280, height: 800 }
  8  | ];
  9  |
  10 | test.describe('Responsive Audit', () => {
  11 |   for (const vp of viewports) {
  12 |     test(`Verify ${vp.name} (${vp.width}px)`, async ({ page }) => {
  13 |       await page.setViewportSize({ width: vp.width, height: vp.height });
  14 |       await page.goto('http://localhost:3000/deviation-calculator');
  15 |
  16 |       // Check for horizontal overflow
  17 |       const overflow = await page.evaluate(() => {
  18 |         return document.documentElement.scrollWidth > window.innerWidth;
  19 |       });
  20 |       console.log(`${vp.name} Overflow: ${overflow}`);
  21 |       expect(overflow).toBe(false);
  22 |
  23 |       // Check if critical elements are visible/interactable
> 24 |       await expect(page.locator('h1')).toBeVisible();
     |                                        ^ Error: expect(locator).toBeVisible() failed
  25 |
  26 |       // Test factor selection to show detail cards
  27 |       await page.click('button:has-text("Significant assets of the child")');
  28 |       const details = page.locator('div:has(> h3:has-text("Deviation Details"))');
  29 |       await details.scrollIntoViewIfNeeded();
  30 |       await expect(details).toBeInViewport();
  31 |
  32 |       // Take screenshot for visual confirmation
  33 |       await page.screenshot({ path: `verification/screenshots/responsive_${vp.width}.png`, fullPage: false });
  34 |     });
  35 |   }
  36 | });
  37 |
```