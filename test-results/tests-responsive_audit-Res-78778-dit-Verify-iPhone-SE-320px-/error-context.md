# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/responsive_audit.test.ts >> Responsive Audit >> Verify iPhone SE (320px)
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
      - link "WSCSS — Home" [ref=e6] [cursor=pointer]:
        - /url: /
        - img [ref=e8]
        - generic [ref=e10]:
          - generic [ref=e11]: WSCSS
          - generic [ref=e12]: Washington State
      - button "Open menu" [ref=e14] [cursor=pointer]:
        - img [ref=e15]
  - navigation "Mobile navigation" [ref=e16]:
    - generic [ref=e17]:
      - generic [ref=e18]: Menu
      - button "Close menu" [ref=e19]:
        - img [ref=e20]
    - generic [ref=e23]:
      - generic [ref=e26]:
        - generic:
          - img
        - textbox "Search WA county..." [ref=e27]
      - generic [ref=e28]:
        - generic [ref=e29]:
          - paragraph [ref=e30]: Calculators
          - generic [ref=e31]:
            - link "Income Estimator" [ref=e32] [cursor=pointer]:
              - /url: /
              - text: Income Estimator
              - img [ref=e33]
            - link "Joint Custody" [ref=e35] [cursor=pointer]:
              - /url: /joint-custody-calculator
              - text: Joint Custody
              - img [ref=e36]
            - link "Deviation Tool" [ref=e38] [cursor=pointer]:
              - /url: /deviation-calculator
              - text: Deviation Tool
              - img [ref=e39]
            - link "Modification Check" [ref=e41] [cursor=pointer]:
              - /url: /modification-calculator
              - text: Modification Check
              - img [ref=e42]
            - link "Expense Splitter" [ref=e44] [cursor=pointer]:
              - /url: /extra-expenses
              - text: Expense Splitter
              - img [ref=e45]
            - link "Compare Scenarios" [ref=e47] [cursor=pointer]:
              - /url: /compare
              - text: Compare Scenarios
              - img [ref=e48]
        - link "Worksheet Wizard" [ref=e51] [cursor=pointer]:
          - /url: /worksheet
          - text: Worksheet Wizard
          - img [ref=e52]
        - link "Courts" [ref=e54] [cursor=pointer]:
          - /url: /washington-courts
          - text: Courts
          - img [ref=e55]
        - link "Glossary" [ref=e57] [cursor=pointer]:
          - /url: /glossary
          - text: Glossary
          - img [ref=e58]
        - link "2026 Updates" [ref=e60] [cursor=pointer]:
          - /url: /compare-2024-2026
          - text: 2026 Updates
          - img [ref=e61]
      - link "Launch Wizard" [ref=e65] [cursor=pointer]:
        - /url: /worksheet
        - text: Launch Wizard
        - img [ref=e66]
    - link "Legal Disclaimer" [ref=e69] [cursor=pointer]:
      - /url: /disclaimer
  - main [ref=e70]:
    - generic [ref=e71]:
      - generic [ref=e73]:
        - link "Back to Home" [ref=e74] [cursor=pointer]:
          - /url: /
          - img [ref=e75]
          - text: Back to Home
        - generic [ref=e77]:
          - paragraph [ref=e78]: RCW 26.19.075 · 2025 IRS Tax Brackets
          - heading "Washington State Child Support Deviation Calculator" [level=1] [ref=e79]
          - paragraph [ref=e80]: Washington State child support begins with the standard schedule amount but courts can order more or less based on specific circumstances. This deviation calculator helps you estimate how qualifying factors under RCW 26.19.075 may adjust your support obligation above or below the 2026 Washington State Child Support Schedule amount.
      - generic [ref=e83]:
        - generic [ref=e85]:
          - generic [ref=e86]:
            - img [ref=e88]
            - heading "Standard Obligation" [level=2] [ref=e92]
          - generic [ref=e93]:
            - paragraph [ref=e95]:
              - strong [ref=e96]: Federal tax estimate based on 2025 IRS tax brackets.
              - text: Standard deduction of $15,000 applied.
            - button "Not sure of monthly net income? Estimate it here ▼" [ref=e98]
            - generic [ref=e99]:
              - generic [ref=e100]:
                - generic [ref=e101]: Obligor Annual Gross
                - generic [ref=e102]:
                  - generic [ref=e103]: $
                  - spinbutton "Obligor Annual Gross" [ref=e104]
              - generic [ref=e105]:
                - generic [ref=e106]: Obligee Annual Gross
                - generic [ref=e107]:
                  - generic [ref=e108]: $
                  - spinbutton "Obligee Annual Gross" [ref=e109]
            - generic [ref=e110]:
              - generic [ref=e111]: Number of Children
              - combobox "Number of Children" [ref=e112]:
                - option "1" [selected]
                - option "2"
                - option "3"
                - option "4"
                - option "5"
            - separator [ref=e113]
            - generic [ref=e114]:
              - heading "Deviation Factors" [level=3] [ref=e115]
              - generic [ref=e116]:
                - generic [ref=e117]:
                  - button "Extraordinary medical expenses RCW 26.19.075(1)(c)(iv) Significant medical expenses not covered by insurance." [ref=e118]:
                    - generic [ref=e121]:
                      - generic [ref=e122]: Extraordinary medical expenses
                      - generic [ref=e123]: RCW 26.19.075(1)(c)(iv)
                    - img "Significant medical expenses not covered by insurance." [ref=e124]
                  - button "Learn more" [ref=e127]:
                    - img [ref=e128]
                    - text: Learn more
                - generic [ref=e130]:
                  - button "Educational expenses RCW 26.19.075(1)(c)(i) Tuition and related costs for private schools or special needs." [ref=e131]:
                    - generic [ref=e134]:
                      - generic [ref=e135]: Educational expenses
                      - generic [ref=e136]: RCW 26.19.075(1)(c)(i)
                    - img "Tuition and related costs for private schools or special needs." [ref=e137]
                  - button "Learn more" [ref=e140]:
                    - img [ref=e141]
                    - text: Learn more
                - generic [ref=e143]:
                  - button "Long distance transportation costs RCW 26.19.075(1)(c)(i) Travel costs for residential time when parents live far apart." [ref=e144]:
                    - generic [ref=e147]:
                      - generic [ref=e148]: Long distance transportation costs
                      - generic [ref=e149]: RCW 26.19.075(1)(c)(i)
                    - img "Travel costs for residential time when parents live far apart." [ref=e150]
                  - button "Learn more" [ref=e153]:
                    - img [ref=e154]
                    - text: Learn more
                - generic [ref=e156]:
                  - button "Debt obligations prior to separation RCW 26.19.075(1)(c)(i) Debts incurred during the relationship that are still being paid." [ref=e157]:
                    - generic [ref=e160]:
                      - generic [ref=e161]: Debt obligations prior to separation
                      - generic [ref=e162]: RCW 26.19.075(1)(c)(i)
                    - img "Debts incurred during the relationship that are still being paid." [ref=e163]
                  - button "Learn more" [ref=e166]:
                    - img [ref=e167]
                    - text: Learn more
                - generic [ref=e169]:
                  - button "Children from other relationships RCW 26.19.075(1)(e) Legal duty to support biological children from other relationships." [ref=e170]:
                    - generic [ref=e173]:
                      - generic [ref=e174]: Children from other relationships
                      - generic [ref=e175]: RCW 26.19.075(1)(e)
                    - img "Legal duty to support biological children from other relationships." [ref=e176]
                  - button "Learn more" [ref=e179]:
                    - img [ref=e180]
                    - text: Learn more
                - generic [ref=e182]:
                  - button "Significant assets of the child RCW 26.19.075(1)(a)(vii) Child has substantial independent wealth or assets." [ref=e183]:
                    - generic [ref=e186]:
                      - generic [ref=e187]: Significant assets of the child
                      - generic [ref=e188]: RCW 26.19.075(1)(a)(vii)
                    - img "Child has substantial independent wealth or assets." [ref=e189]
                  - button "Learn more" [ref=e192]:
                    - img [ref=e193]
                    - text: Learn more
                - generic [ref=e195]:
                  - button "Income of new spouse or domestic partner RCW 26.19.075(1)(a)(i) May be considered only if the parent is also requesting deviation for another reason. Not sufficient alone." [ref=e196]:
                    - generic [ref=e199]:
                      - generic [ref=e200]: Income of new spouse or domestic partner
                      - generic [ref=e201]: RCW 26.19.075(1)(a)(i)
                    - img "May be considered only if the parent is also requesting deviation for another reason. Not sufficient alone." [ref=e202]
                  - button "Learn more" [ref=e205]:
                    - img [ref=e206]
                    - text: Learn more
                - generic [ref=e208]:
                  - button "Nonrecurring income RCW 26.19.075(1)(b) Overtime, bonuses, or second job income that will not recur. Based on prior 2 calendar years." [ref=e209]:
                    - generic [ref=e212]:
                      - generic [ref=e213]: Nonrecurring income
                      - generic [ref=e214]: RCW 26.19.075(1)(b)
                    - img "Overtime, bonuses, or second job income that will not recur. Based on prior 2 calendar years." [ref=e215]
                  - button "Learn more" [ref=e218]:
                    - img [ref=e219]
                    - text: Learn more
                - generic [ref=e221]:
                  - button "Possession of substantial wealth RCW 26.19.075(1)(a)(vi) Savings, investments, real estate, vehicles, boats, pensions, bank accounts, insurance, or other assets." [ref=e222]:
                    - generic [ref=e225]:
                      - generic [ref=e226]: Possession of substantial wealth
                      - generic [ref=e227]: RCW 26.19.075(1)(a)(vi)
                    - img "Savings, investments, real estate, vehicles, boats, pensions, bank accounts, insurance, or other assets." [ref=e228]
                  - button "Learn more" [ref=e231]:
                    - img [ref=e232]
                    - text: Learn more
                - generic [ref=e234]:
                  - button "Extraordinary income of a child RCW 26.19.075(1)(a)(vii) Child has significant income of their own." [ref=e235]:
                    - generic [ref=e238]:
                      - generic [ref=e239]: Extraordinary income of a child
                      - generic [ref=e240]: RCW 26.19.075(1)(a)(vii)
                    - img "Child has significant income of their own." [ref=e241]
                  - button "Learn more" [ref=e244]:
                    - img [ref=e245]
                    - text: Learn more
                - generic [ref=e247]:
                  - button "Tax planning considerations RCW 26.19.075(1)(a)(viii) Deviation may be granted only if children receive no lesser economic benefit as a result." [ref=e248]:
                    - generic [ref=e251]:
                      - generic [ref=e252]: Tax planning considerations
                      - generic [ref=e253]: RCW 26.19.075(1)(a)(viii)
                    - img "Deviation may be granted only if children receive no lesser economic benefit as a result." [ref=e254]
                  - button "Learn more" [ref=e257]:
                    - img [ref=e258]
                    - text: Learn more
                - generic [ref=e260]:
                  - button "Special needs of disabled child RCW 26.19.075(1)(c)(iii) Physical, mental, or emotional disabilities requiring special care or expenses." [ref=e261]:
                    - generic [ref=e264]:
                      - generic [ref=e265]: Special needs of disabled child
                      - generic [ref=e266]: RCW 26.19.075(1)(c)(iii)
                    - img "Physical, mental, or emotional disabilities requiring special care or expenses." [ref=e267]
                  - button "Learn more" [ref=e270]:
                    - img [ref=e271]
                    - text: Learn more
                - generic [ref=e273]:
                  - button "Psychological needs of child RCW 26.19.075(1)(c)(iv) Special psychological or mental health needs beyond normal healthcare expenses." [ref=e274]:
                    - generic [ref=e277]:
                      - generic [ref=e278]: Psychological needs of child
                      - generic [ref=e279]: RCW 26.19.075(1)(c)(iv)
                    - img "Special psychological or mental health needs beyond normal healthcare expenses." [ref=e280]
                  - button "Learn more" [ref=e283]:
                    - img [ref=e284]
                    - text: Learn more
                - generic [ref=e286]:
                  - button "Court ordered reunification costs RCW 26.19.075(1)(c)(v) Costs to comply with court ordered reunification efforts under chapter 13.34 RCW." [ref=e287]:
                    - generic [ref=e290]:
                      - generic [ref=e291]: Court ordered reunification costs
                      - generic [ref=e292]: RCW 26.19.075(1)(c)(v)
                    - img "Costs to comply with court ordered reunification efforts under chapter 13.34 RCW." [ref=e293]
                  - button "Learn more" [ref=e296]:
                    - img [ref=e297]
                    - text: Learn more
                - generic [ref=e299]:
                  - button "Significant income disparity RCW 26.19.075(1)(c)(ii) Significant difference in living costs between households due to conditions beyond parents control." [ref=e300]:
                    - generic [ref=e303]:
                      - generic [ref=e304]: Significant income disparity
                      - generic [ref=e305]: RCW 26.19.075(1)(c)(ii)
                    - img "Significant difference in living costs between households due to conditions beyond parents control." [ref=e306]
                  - button "Learn more" [ref=e309]:
                    - img [ref=e310]
                    - text: Learn more
        - generic [ref=e313]:
          - heading "Deviation Analysis" [level=3] [ref=e314]:
            - img [ref=e315]
            - text: Deviation Analysis
          - generic [ref=e317]:
            - generic [ref=e318]:
              - button "Monthly View" [ref=e319]
              - button "Yearly View" [ref=e320]
            - generic [ref=e321]:
              - generic [ref=e323]:
                - generic [ref=e324]: Standard 2026 Obligation
                - generic [ref=e325]: $50
              - generic [ref=e327]:
                - generic [ref=e328]: Adjusted Support Amount
                - generic [ref=e329]:
                  - generic [ref=e330]: $50
                  - paragraph [ref=e331]: 0.0% from 2026 standard
            - generic [ref=e332]: Deviation amounts are determined by the court after considering all circumstances. This calculator provides an estimate only. Courts require written findings of fact for any deviation from the standard calculation per RCW 26.19.075(2). Consult a Washington family law attorney for accurate advice.
            - button "How was this calculated? ▼" [ref=e334]
            - generic [ref=e335]:
              - button "Save This Calculation" [ref=e336] [cursor=pointer]:
                - img [ref=e337]
                - text: Save This Calculation
              - button "Your Saved Calculations ▼" [ref=e341]:
                - img [ref=e342]
                - text: Your Saved Calculations ▼
            - button "Print Results" [ref=e347] [cursor=pointer]:
              - img [ref=e348]
              - text: Print Results
            - generic [ref=e353]:
              - generic [ref=e354]:
                - heading "Want to review these results with a Washington family law attorney?" [level=4] [ref=e355]
                - paragraph [ref=e356]: The Washington State Bar Association can help you find a licensed family law attorney near you.
              - link "Find a WA Family Law Attorney" [ref=e357] [cursor=pointer]:
                - /url: https://www.wsba.org/find-a-lawyer
                - text: Find a WA Family Law Attorney
                - img [ref=e358]
            - generic [ref=e362]:
              - heading "You may also need" [level=4] [ref=e363]
              - generic [ref=e364]:
                - link "Joint Custody Calculator Combine deviation with custody adjustment Open Tool" [ref=e365] [cursor=pointer]:
                  - /url: /joint-custody-calculator
                  - img [ref=e367]
                  - heading "Joint Custody Calculator" [level=5] [ref=e371]
                  - paragraph [ref=e372]: Combine deviation with custody adjustment
                  - generic [ref=e373]:
                    - text: Open Tool
                    - img [ref=e374]
                - link "Modification Calculator See if your order needs updating Open Tool" [ref=e376] [cursor=pointer]:
                  - /url: /modification-calculator
                  - img [ref=e378]
                  - heading "Modification Calculator" [level=5] [ref=e381]
                  - paragraph [ref=e382]: See if your order needs updating
                  - generic [ref=e383]:
                    - text: Open Tool
                    - img [ref=e384]
                - link "Basic Calculator See standard amount without deviation Open Tool" [ref=e386] [cursor=pointer]:
                  - /url: /
                  - img [ref=e388]
                  - heading "Basic Calculator" [level=5] [ref=e390]
                  - paragraph [ref=e391]: See standard amount without deviation
                  - generic [ref=e392]:
                    - text: Open Tool
                    - img [ref=e393]
      - generic [ref=e397]:
        - generic [ref=e398]:
          - generic [ref=e399]:
            - heading "What Is a Child Support Deviation in Washington State" [level=2] [ref=e400]
            - paragraph [ref=e401]: A deviation is a court approved adjustment to the standard child support amount. Washington law under RCW 26.19.075 allows either parent to request a deviation when specific financial circumstances make the standard amount unjust or inappropriate. Deviations can go upward — increasing support — or downward — reducing it.
          - generic [ref=e402]:
            - heading "Common Reasons for Upward Deviation" [level=2] [ref=e403]
            - paragraph [ref=e404]: Courts may order above standard support when a child has extraordinary medical needs, significant educational expenses such as private school or tutoring, or when long distance parenting arrangements create substantial transportation costs that one parent bears alone.
          - generic [ref=e405]:
            - heading "Common Reasons for Downward Deviation" [level=2] [ref=e406]
            - paragraph [ref=e407]: Courts may reduce support below the standard amount when the paying parent has substantial prior debts from before the separation, supports children from other relationships, or when the child has significant independent assets or income of their own.
          - generic [ref=e408]:
            - heading "How Courts Decide on Deviations" [level=2] [ref=e409]
            - paragraph [ref=e410]: A judge does not automatically grant a deviation request. The requesting parent must show that applying the standard amount would be unjust given the specific circumstances. This calculator helps you estimate the adjusted amount but a family law attorney should be consulted before requesting a formal deviation.
        - generic [ref=e411]:
          - generic [ref=e412]:
            - heading "Legal Grounds for a Child Support Deviation in Washington State" [level=2] [ref=e413]
            - paragraph [ref=e414]: When using a deviation calculator, it is vital to know which statutory factors the court legally recognizes. Under Washington law (RCW 26.19.075), judges will not grant a deviation for lifestyle preferences. You must qualify under specific legal categories.
            - generic [ref=e415]:
              - generic [ref=e416]:
                - heading "1. Nonrecurring Income or One-Time Financial Windfalls" [level=3] [ref=e417]
                - paragraph [ref=e418]: If a parent’s income is temporarily inflated by a one-time bonus, inheritance, lottery winnings, or a short-term real estate sale, the court may deviate downward from using that specific year's tax returns. Courts can isolate baseline income from these nonrecurring windfalls when determining a just transfer payment.
              - generic [ref=e419]:
                - heading "2. Income of Other Adults in the Household" [level=3] [ref=e420]
                - paragraph [ref=e421]: While a step-parent or new live-in partner has no legal duty to support your child, their financial contributions to rent, groceries, and utilities change your financial position. A judge may use this household income to deny a downward deviation or justify an upward adjustment.
              - generic [ref=e422]:
                - heading "3. Extraordinary Expenses and Debt Obligations" [level=3] [ref=e423]
                - generic [ref=e424]:
                  - paragraph [ref=e425]: "Standard child support schedules assume basic cost-of-living metrics. You can request a deviation if you pay for:"
                  - list [ref=e426]:
                    - listitem [ref=e427]:
                      - strong [ref=e428]: "Special Needs:"
                      - text: Extraordinary medical, dental, or mental health costs.
                    - listitem [ref=e429]:
                      - strong [ref=e430]: "Educational Needs:"
                      - text: Specialized private schooling or tutoring for a disabled child.
                    - listitem [ref=e431]:
                      - strong [ref=e432]: "Prior Debt:"
                      - text: Court-ordered debt from a previous marriage that severely limits current income.
                    - listitem [ref=e433]:
                      - strong [ref=e434]: "Long-Distance Travel:"
                      - text: High costs associated with transporting the child between parents for residential time.
              - generic [ref=e435]:
                - heading "4. Children from Other Relationships" [level=3] [ref=e436]
                - paragraph [ref=e437]: If the paying parent has a legal duty to support biological children from a different relationship, Washington law allows for a downward deviation. This ensures that children from a first or subsequent family are not financially starved by the current child support transfer payment.
          - generic [ref=e438]:
            - heading "Why Was My Child Support Deviation Denied?" [level=2] [ref=e439]
            - paragraph [ref=e440]: "Even if our deviation tool shows you qualify for an adjustment, a family law judge can still deny your request. The two most common reasons for denial in Washington courts are:"
            - generic [ref=e441]:
              - generic [ref=e442]:
                - img [ref=e444]
                - generic [ref=e448]:
                  - heading "The Substantial Hardship Rule" [level=3] [ref=e449]
                  - paragraph [ref=e450]: The court will reject any downward deviation if reducing the support payment pushes the receiving parent's household below the federal poverty line or leaves them unable to provide basic shelter and food for the child.
              - generic [ref=e451]:
                - img [ref=e453]
                - generic [ref=e457]:
                  - heading "Lack of Strict Documentation" [level=3] [ref=e458]
                  - paragraph [ref=e459]: You cannot use estimates. If you request a deviation for extraordinary medical bills or travel, you must provide the court with receipts, clear invoices, and a history of payment records.
        - generic [ref=e460]:
          - heading "Frequently Asked Questions" [level=2] [ref=e461]
          - generic [ref=e463]:
            - generic [ref=e464]:
              - heading "What is a child support deviation in Washington State?" [level=3] [ref=e465]:
                - button "What is a child support deviation in Washington State?" [expanded] [ref=e466] [cursor=pointer]:
                  - generic [ref=e467]: What is a child support deviation in Washington State?
                  - img [ref=e468]
              - region "What is a child support deviation in Washington State?" [ref=e470]:
                - paragraph [ref=e473]: A child support deviation in Washington State is a court approved adjustment that sets support above or below the standard schedule amount. It is governed by RCW 26.19.075 and requires the requesting parent to show that the standard amount would be unjust given their specific circumstances.
            - generic [ref=e474]:
              - heading "What qualifies for a downward deviation in Washington child support?" [level=3] [ref=e475]:
                - button "What qualifies for a downward deviation in Washington child support?" [expanded] [ref=e476] [cursor=pointer]:
                  - generic [ref=e477]: What qualifies for a downward deviation in Washington child support?
                  - img [ref=e478]
              - region "What qualifies for a downward deviation in Washington child support?" [ref=e480]:
                - paragraph [ref=e483]: Qualifying reasons for a downward deviation in Washington include significant debt obligations incurred before the separation, support obligations for children from other relationships, a child's significant independent assets or income, and other financial hardships that make the standard amount unjust.
            - generic [ref=e484]:
              - heading "Can I get more child support than the standard amount in Washington?" [level=3] [ref=e485]:
                - button "Can I get more child support than the standard amount in Washington?" [ref=e486] [cursor=pointer]:
                  - generic [ref=e487]: Can I get more child support than the standard amount in Washington?
                  - img [ref=e488]
              - region "Can I get more child support than the standard amount in Washington?"
            - generic [ref=e490]:
              - heading "How much can child support deviate from the standard in Washington?" [level=3] [ref=e491]:
                - button "How much can child support deviate from the standard in Washington?" [ref=e492] [cursor=pointer]:
                  - generic [ref=e493]: How much can child support deviate from the standard in Washington?
                  - img [ref=e494]
              - region "How much can child support deviate from the standard in Washington?"
            - generic [ref=e496]:
              - heading "Do both parents have to agree to a deviation?" [level=3] [ref=e497]:
                - button "Do both parents have to agree to a deviation?" [ref=e498] [cursor=pointer]:
                  - generic [ref=e499]: Do both parents have to agree to a deviation?
                  - img [ref=e500]
              - region "Do both parents have to agree to a deviation?"
            - generic [ref=e502]:
              - heading "How does nonrecurring income affect child support in Washington?" [level=3] [ref=e503]:
                - button "How does nonrecurring income affect child support in Washington?" [ref=e504] [cursor=pointer]:
                  - generic [ref=e505]: How does nonrecurring income affect child support in Washington?
                  - img [ref=e506]
              - region "How does nonrecurring income affect child support in Washington?"
            - generic [ref=e508]:
              - heading "Does my partner's income count towards child support in Washington?" [level=3] [ref=e509]:
                - button "Does my partner's income count towards child support in Washington?" [ref=e510] [cursor=pointer]:
                  - generic [ref=e511]: Does my partner's income count towards child support in Washington?
                  - img [ref=e512]
              - region "Does my partner's income count towards child support in Washington?"
            - generic [ref=e514]:
              - heading "What extraordinary expenses qualify for a deviation?" [level=3] [ref=e515]:
                - button "What extraordinary expenses qualify for a deviation?" [ref=e516] [cursor=pointer]:
                  - generic [ref=e517]: What extraordinary expenses qualify for a deviation?
                  - img [ref=e518]
              - region "What extraordinary expenses qualify for a deviation?"
            - generic [ref=e520]:
              - heading "Can I get a deviation if I have children from another relationship?" [level=3] [ref=e521]:
                - button "Can I get a deviation if I have children from another relationship?" [ref=e522] [cursor=pointer]:
                  - generic [ref=e523]: Can I get a deviation if I have children from another relationship?
                  - img [ref=e524]
              - region "Can I get a deviation if I have children from another relationship?"
            - generic [ref=e526]:
              - heading "Why might a judge deny my child support deviation request?" [level=3] [ref=e527]:
                - button "Why might a judge deny my child support deviation request?" [ref=e528] [cursor=pointer]:
                  - generic [ref=e529]: Why might a judge deny my child support deviation request?
                  - img [ref=e530]
              - region "Why might a judge deny my child support deviation request?"
        - generic [ref=e532]:
          - heading "Legal Disclaimer" [level=3] [ref=e533]:
            - img [ref=e534]
            - text: Legal Disclaimer
          - paragraph [ref=e536]: Deviations from the Washington State child support schedule are determined by a judge based on the standards in RCW 26.19.075. This calculator provides an estimate based on the values you enter, but the final determination requires written findings of fact from a court.
  - contentinfo [ref=e537]:
    - generic [ref=e538]:
      - generic [ref=e539]:
        - generic [ref=e540]:
          - link "WSCSS" [ref=e541] [cursor=pointer]:
            - /url: /
            - img [ref=e543]
            - generic [ref=e545]: WSCSS
          - paragraph [ref=e546]: Precision child support calculations for Washington State families. Official AOC-aligned data source.
          - link "Email support" [ref=e547] [cursor=pointer]:
            - /url: mailto:support@wscss.site
            - img [ref=e549]
        - generic [ref=e552]:
          - heading "Calculators" [level=4] [ref=e553]
          - list [ref=e554]:
            - listitem [ref=e555]:
              - link "Calculator" [ref=e556] [cursor=pointer]:
                - /url: /
            - listitem [ref=e557]:
              - link "Worksheet Pro Wizard" [ref=e558] [cursor=pointer]:
                - /url: /worksheet
            - listitem [ref=e559]:
              - link "King County Guide" [ref=e560] [cursor=pointer]:
                - /url: /washington-courts/king-county
            - listitem [ref=e561]:
              - link "Pierce County Guide" [ref=e562] [cursor=pointer]:
                - /url: /washington-courts/pierce-county
            - listitem [ref=e563]:
              - link "Snohomish County Guide" [ref=e564] [cursor=pointer]:
                - /url: /washington-courts/snohomish-county
            - listitem [ref=e565]:
              - link "Spokane County Guide" [ref=e566] [cursor=pointer]:
                - /url: /washington-courts/spokane-county
        - generic [ref=e567]:
          - heading "Resources" [level=4] [ref=e568]
          - list [ref=e569]:
            - listitem [ref=e570]:
              - link "AOC Mandatory Forms" [ref=e571] [cursor=pointer]:
                - /url: https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16
            - listitem [ref=e572]:
              - link "WA DSHS Support Center" [ref=e573] [cursor=pointer]:
                - /url: https://www.dshs.wa.gov/esa/division-child-support
            - listitem [ref=e574]:
              - link "Legal Guides & Blog" [ref=e575] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e576]:
              - link "About WSCSS" [ref=e577] [cursor=pointer]:
                - /url: /about
        - generic [ref=e578]:
          - heading "Legal" [level=4] [ref=e579]
          - list [ref=e580]:
            - listitem [ref=e581]:
              - link "Privacy Policy" [ref=e582] [cursor=pointer]:
                - /url: /privacy
                - img [ref=e583]
                - text: Privacy Policy
            - listitem [ref=e585]:
              - link "Terms of Service" [ref=e586] [cursor=pointer]:
                - /url: /terms
                - img [ref=e587]
                - text: Terms of Service
            - listitem [ref=e591]:
              - link "Methodology" [ref=e592] [cursor=pointer]:
                - /url: /editorial-methodology
                - img [ref=e593]
                - text: Methodology
            - listitem [ref=e597]:
              - link "Legal Disclaimer" [ref=e598] [cursor=pointer]:
                - /url: /disclaimer
                - img [ref=e599]
                - text: Legal Disclaimer
      - generic [ref=e603]:
        - generic [ref=e604]:
          - paragraph [ref=e605]: © 2026 Washington State Child Support Schedule
          - paragraph [ref=e606]: WSCSS is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines. All calculations are estimates only.
        - generic [ref=e608]: RCW 26.19 Compliant
  - button "Open Next.js Dev Tools" [ref=e615] [cursor=pointer]:
    - img [ref=e616]
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