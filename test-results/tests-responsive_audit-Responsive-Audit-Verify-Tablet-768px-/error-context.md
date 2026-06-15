# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/responsive_audit.test.ts >> Responsive Audit >> Verify Tablet (768px)
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
      - generic [ref=e13]:
        - link "Launch Wizard" [ref=e14] [cursor=pointer]:
          - /url: /worksheet
          - generic [ref=e15]: Launch
          - text: Wizard
          - img [ref=e16]
        - button "Open menu" [ref=e18] [cursor=pointer]:
          - img [ref=e19]
  - navigation "Mobile navigation" [ref=e20]:
    - generic [ref=e21]:
      - generic [ref=e22]: Menu
      - button "Close menu" [ref=e23]:
        - img [ref=e24]
    - generic [ref=e27]:
      - generic [ref=e30]:
        - generic:
          - img
        - textbox "Search WA county..." [ref=e31]
      - generic [ref=e32]:
        - generic [ref=e33]:
          - paragraph [ref=e34]: Calculators
          - generic [ref=e35]:
            - link "Income Estimator" [ref=e36] [cursor=pointer]:
              - /url: /
              - text: Income Estimator
              - img [ref=e37]
            - link "Joint Custody" [ref=e39] [cursor=pointer]:
              - /url: /joint-custody-calculator
              - text: Joint Custody
              - img [ref=e40]
            - link "Deviation Tool" [ref=e42] [cursor=pointer]:
              - /url: /deviation-calculator
              - text: Deviation Tool
              - img [ref=e43]
            - link "Modification Check" [ref=e45] [cursor=pointer]:
              - /url: /modification-calculator
              - text: Modification Check
              - img [ref=e46]
            - link "Expense Splitter" [ref=e48] [cursor=pointer]:
              - /url: /extra-expenses
              - text: Expense Splitter
              - img [ref=e49]
            - link "Compare Scenarios" [ref=e51] [cursor=pointer]:
              - /url: /compare
              - text: Compare Scenarios
              - img [ref=e52]
        - link "Worksheet Wizard" [ref=e55] [cursor=pointer]:
          - /url: /worksheet
          - text: Worksheet Wizard
          - img [ref=e56]
        - link "Courts" [ref=e58] [cursor=pointer]:
          - /url: /washington-courts
          - text: Courts
          - img [ref=e59]
        - link "Glossary" [ref=e61] [cursor=pointer]:
          - /url: /glossary
          - text: Glossary
          - img [ref=e62]
        - link "2026 Updates" [ref=e64] [cursor=pointer]:
          - /url: /compare-2024-2026
          - text: 2026 Updates
          - img [ref=e65]
      - link "Launch Wizard" [ref=e69] [cursor=pointer]:
        - /url: /worksheet
        - text: Launch Wizard
        - img [ref=e70]
    - link "Legal Disclaimer" [ref=e73] [cursor=pointer]:
      - /url: /disclaimer
  - main [ref=e74]:
    - generic [ref=e75]:
      - generic [ref=e77]:
        - link "Back to Home" [ref=e78] [cursor=pointer]:
          - /url: /
          - img [ref=e79]
          - text: Back to Home
        - generic [ref=e81]:
          - paragraph [ref=e82]: RCW 26.19.075 · 2025 IRS Tax Brackets
          - heading "Washington State Child Support Deviation Calculator" [level=1] [ref=e83]
          - paragraph [ref=e84]: Washington State child support begins with the standard schedule amount but courts can order more or less based on specific circumstances. This deviation calculator helps you estimate how qualifying factors under RCW 26.19.075 may adjust your support obligation above or below the 2026 Washington State Child Support Schedule amount.
      - generic [ref=e87]:
        - generic [ref=e89]:
          - generic [ref=e90]:
            - img [ref=e92]
            - heading "Standard Obligation" [level=2] [ref=e96]
          - generic [ref=e97]:
            - paragraph [ref=e99]:
              - strong [ref=e100]: Federal tax estimate based on 2025 IRS tax brackets.
              - text: Standard deduction of $15,000 applied.
            - button "Not sure of monthly net income? Estimate it here ▼" [ref=e102]
            - generic [ref=e103]:
              - generic [ref=e104]:
                - generic [ref=e105]: Obligor Annual Gross
                - generic [ref=e106]:
                  - generic [ref=e107]: $
                  - spinbutton "Obligor Annual Gross" [ref=e108]
              - generic [ref=e109]:
                - generic [ref=e110]: Obligee Annual Gross
                - generic [ref=e111]:
                  - generic [ref=e112]: $
                  - spinbutton "Obligee Annual Gross" [ref=e113]
            - generic [ref=e114]:
              - generic [ref=e115]: Number of Children
              - combobox "Number of Children" [ref=e116]:
                - option "1" [selected]
                - option "2"
                - option "3"
                - option "4"
                - option "5"
            - separator [ref=e117]
            - generic [ref=e118]:
              - heading "Deviation Factors" [level=3] [ref=e119]
              - generic [ref=e120]:
                - generic [ref=e121]:
                  - button "Extraordinary medical expenses RCW 26.19.075(1)(c)(iv) Significant medical expenses not covered by insurance." [ref=e122]:
                    - generic [ref=e125]:
                      - generic [ref=e126]: Extraordinary medical expenses
                      - generic [ref=e127]: RCW 26.19.075(1)(c)(iv)
                    - img "Significant medical expenses not covered by insurance." [ref=e128]
                  - button "Learn more" [ref=e131]:
                    - img [ref=e132]
                    - text: Learn more
                - generic [ref=e134]:
                  - button "Educational expenses RCW 26.19.075(1)(c)(i) Tuition and related costs for private schools or special needs." [ref=e135]:
                    - generic [ref=e138]:
                      - generic [ref=e139]: Educational expenses
                      - generic [ref=e140]: RCW 26.19.075(1)(c)(i)
                    - img "Tuition and related costs for private schools or special needs." [ref=e141]
                  - button "Learn more" [ref=e144]:
                    - img [ref=e145]
                    - text: Learn more
                - generic [ref=e147]:
                  - button "Long distance transportation costs RCW 26.19.075(1)(c)(i) Travel costs for residential time when parents live far apart." [ref=e148]:
                    - generic [ref=e151]:
                      - generic [ref=e152]: Long distance transportation costs
                      - generic [ref=e153]: RCW 26.19.075(1)(c)(i)
                    - img "Travel costs for residential time when parents live far apart." [ref=e154]
                  - button "Learn more" [ref=e157]:
                    - img [ref=e158]
                    - text: Learn more
                - generic [ref=e160]:
                  - button "Debt obligations prior to separation RCW 26.19.075(1)(c)(i) Debts incurred during the relationship that are still being paid." [ref=e161]:
                    - generic [ref=e164]:
                      - generic [ref=e165]: Debt obligations prior to separation
                      - generic [ref=e166]: RCW 26.19.075(1)(c)(i)
                    - img "Debts incurred during the relationship that are still being paid." [ref=e167]
                  - button "Learn more" [ref=e170]:
                    - img [ref=e171]
                    - text: Learn more
                - generic [ref=e173]:
                  - button "Children from other relationships RCW 26.19.075(1)(e) Legal duty to support biological children from other relationships." [ref=e174]:
                    - generic [ref=e177]:
                      - generic [ref=e178]: Children from other relationships
                      - generic [ref=e179]: RCW 26.19.075(1)(e)
                    - img "Legal duty to support biological children from other relationships." [ref=e180]
                  - button "Learn more" [ref=e183]:
                    - img [ref=e184]
                    - text: Learn more
                - generic [ref=e186]:
                  - button "Significant assets of the child RCW 26.19.075(1)(a)(vii) Child has substantial independent wealth or assets." [ref=e187]:
                    - generic [ref=e190]:
                      - generic [ref=e191]: Significant assets of the child
                      - generic [ref=e192]: RCW 26.19.075(1)(a)(vii)
                    - img "Child has substantial independent wealth or assets." [ref=e193]
                  - button "Learn more" [ref=e196]:
                    - img [ref=e197]
                    - text: Learn more
                - generic [ref=e199]:
                  - button "Income of new spouse or domestic partner RCW 26.19.075(1)(a)(i) May be considered only if the parent is also requesting deviation for another reason. Not sufficient alone." [ref=e200]:
                    - generic [ref=e203]:
                      - generic [ref=e204]: Income of new spouse or domestic partner
                      - generic [ref=e205]: RCW 26.19.075(1)(a)(i)
                    - img "May be considered only if the parent is also requesting deviation for another reason. Not sufficient alone." [ref=e206]
                  - button "Learn more" [ref=e209]:
                    - img [ref=e210]
                    - text: Learn more
                - generic [ref=e212]:
                  - button "Nonrecurring income RCW 26.19.075(1)(b) Overtime, bonuses, or second job income that will not recur. Based on prior 2 calendar years." [ref=e213]:
                    - generic [ref=e216]:
                      - generic [ref=e217]: Nonrecurring income
                      - generic [ref=e218]: RCW 26.19.075(1)(b)
                    - img "Overtime, bonuses, or second job income that will not recur. Based on prior 2 calendar years." [ref=e219]
                  - button "Learn more" [ref=e222]:
                    - img [ref=e223]
                    - text: Learn more
                - generic [ref=e225]:
                  - button "Possession of substantial wealth RCW 26.19.075(1)(a)(vi) Savings, investments, real estate, vehicles, boats, pensions, bank accounts, insurance, or other assets." [ref=e226]:
                    - generic [ref=e229]:
                      - generic [ref=e230]: Possession of substantial wealth
                      - generic [ref=e231]: RCW 26.19.075(1)(a)(vi)
                    - img "Savings, investments, real estate, vehicles, boats, pensions, bank accounts, insurance, or other assets." [ref=e232]
                  - button "Learn more" [ref=e235]:
                    - img [ref=e236]
                    - text: Learn more
                - generic [ref=e238]:
                  - button "Extraordinary income of a child RCW 26.19.075(1)(a)(vii) Child has significant income of their own." [ref=e239]:
                    - generic [ref=e242]:
                      - generic [ref=e243]: Extraordinary income of a child
                      - generic [ref=e244]: RCW 26.19.075(1)(a)(vii)
                    - img "Child has significant income of their own." [ref=e245]
                  - button "Learn more" [ref=e248]:
                    - img [ref=e249]
                    - text: Learn more
                - generic [ref=e251]:
                  - button "Tax planning considerations RCW 26.19.075(1)(a)(viii) Deviation may be granted only if children receive no lesser economic benefit as a result." [ref=e252]:
                    - generic [ref=e255]:
                      - generic [ref=e256]: Tax planning considerations
                      - generic [ref=e257]: RCW 26.19.075(1)(a)(viii)
                    - img "Deviation may be granted only if children receive no lesser economic benefit as a result." [ref=e258]
                  - button "Learn more" [ref=e261]:
                    - img [ref=e262]
                    - text: Learn more
                - generic [ref=e264]:
                  - button "Special needs of disabled child RCW 26.19.075(1)(c)(iii) Physical, mental, or emotional disabilities requiring special care or expenses." [ref=e265]:
                    - generic [ref=e268]:
                      - generic [ref=e269]: Special needs of disabled child
                      - generic [ref=e270]: RCW 26.19.075(1)(c)(iii)
                    - img "Physical, mental, or emotional disabilities requiring special care or expenses." [ref=e271]
                  - button "Learn more" [ref=e274]:
                    - img [ref=e275]
                    - text: Learn more
                - generic [ref=e277]:
                  - button "Psychological needs of child RCW 26.19.075(1)(c)(iv) Special psychological or mental health needs beyond normal healthcare expenses." [ref=e278]:
                    - generic [ref=e281]:
                      - generic [ref=e282]: Psychological needs of child
                      - generic [ref=e283]: RCW 26.19.075(1)(c)(iv)
                    - img "Special psychological or mental health needs beyond normal healthcare expenses." [ref=e284]
                  - button "Learn more" [ref=e287]:
                    - img [ref=e288]
                    - text: Learn more
                - generic [ref=e290]:
                  - button "Court ordered reunification costs RCW 26.19.075(1)(c)(v) Costs to comply with court ordered reunification efforts under chapter 13.34 RCW." [ref=e291]:
                    - generic [ref=e294]:
                      - generic [ref=e295]: Court ordered reunification costs
                      - generic [ref=e296]: RCW 26.19.075(1)(c)(v)
                    - img "Costs to comply with court ordered reunification efforts under chapter 13.34 RCW." [ref=e297]
                  - button "Learn more" [ref=e300]:
                    - img [ref=e301]
                    - text: Learn more
                - generic [ref=e303]:
                  - button "Significant income disparity RCW 26.19.075(1)(c)(ii) Significant difference in living costs between households due to conditions beyond parents control." [ref=e304]:
                    - generic [ref=e307]:
                      - generic [ref=e308]: Significant income disparity
                      - generic [ref=e309]: RCW 26.19.075(1)(c)(ii)
                    - img "Significant difference in living costs between households due to conditions beyond parents control." [ref=e310]
                  - button "Learn more" [ref=e313]:
                    - img [ref=e314]
                    - text: Learn more
        - generic [ref=e317]:
          - heading "Deviation Analysis" [level=3] [ref=e318]:
            - img [ref=e319]
            - text: Deviation Analysis
          - generic [ref=e321]:
            - generic [ref=e322]:
              - button "Monthly View" [ref=e323]
              - button "Yearly View" [ref=e324]
            - generic [ref=e325]:
              - generic [ref=e327]:
                - generic [ref=e328]: Standard 2026 Obligation
                - generic [ref=e329]: $50
              - generic [ref=e331]:
                - generic [ref=e332]: Adjusted Support Amount
                - generic [ref=e333]:
                  - generic [ref=e334]: $50
                  - paragraph [ref=e335]: 0.0% from 2026 standard
            - generic [ref=e336]: Deviation amounts are determined by the court after considering all circumstances. This calculator provides an estimate only. Courts require written findings of fact for any deviation from the standard calculation per RCW 26.19.075(2). Consult a Washington family law attorney for accurate advice.
            - button "How was this calculated? ▼" [ref=e338]
            - generic [ref=e339]:
              - button "Save This Calculation" [ref=e340] [cursor=pointer]:
                - img [ref=e341]
                - text: Save This Calculation
              - button "Your Saved Calculations ▼" [ref=e345]:
                - img [ref=e346]
                - text: Your Saved Calculations ▼
            - button "Print Results" [ref=e351] [cursor=pointer]:
              - img [ref=e352]
              - text: Print Results
            - generic [ref=e357]:
              - generic [ref=e358]:
                - heading "Want to review these results with a Washington family law attorney?" [level=4] [ref=e359]
                - paragraph [ref=e360]: The Washington State Bar Association can help you find a licensed family law attorney near you.
              - link "Find a WA Family Law Attorney" [ref=e361] [cursor=pointer]:
                - /url: https://www.wsba.org/find-a-lawyer
                - text: Find a WA Family Law Attorney
                - img [ref=e362]
            - generic [ref=e366]:
              - heading "You may also need" [level=4] [ref=e367]
              - generic [ref=e368]:
                - link "Joint Custody Calculator Combine deviation with custody adjustment Open Tool" [ref=e369] [cursor=pointer]:
                  - /url: /joint-custody-calculator
                  - img [ref=e371]
                  - heading "Joint Custody Calculator" [level=5] [ref=e375]
                  - paragraph [ref=e376]: Combine deviation with custody adjustment
                  - generic [ref=e377]:
                    - text: Open Tool
                    - img [ref=e378]
                - link "Modification Calculator See if your order needs updating Open Tool" [ref=e380] [cursor=pointer]:
                  - /url: /modification-calculator
                  - img [ref=e382]
                  - heading "Modification Calculator" [level=5] [ref=e385]
                  - paragraph [ref=e386]: See if your order needs updating
                  - generic [ref=e387]:
                    - text: Open Tool
                    - img [ref=e388]
                - link "Basic Calculator See standard amount without deviation Open Tool" [ref=e390] [cursor=pointer]:
                  - /url: /
                  - img [ref=e392]
                  - heading "Basic Calculator" [level=5] [ref=e394]
                  - paragraph [ref=e395]: See standard amount without deviation
                  - generic [ref=e396]:
                    - text: Open Tool
                    - img [ref=e397]
      - generic [ref=e401]:
        - generic [ref=e402]:
          - generic [ref=e403]:
            - heading "What Is a Child Support Deviation in Washington State" [level=2] [ref=e404]
            - paragraph [ref=e405]: A deviation is a court approved adjustment to the standard child support amount. Washington law under RCW 26.19.075 allows either parent to request a deviation when specific financial circumstances make the standard amount unjust or inappropriate. Deviations can go upward — increasing support — or downward — reducing it.
          - generic [ref=e406]:
            - heading "Common Reasons for Upward Deviation" [level=2] [ref=e407]
            - paragraph [ref=e408]: Courts may order above standard support when a child has extraordinary medical needs, significant educational expenses such as private school or tutoring, or when long distance parenting arrangements create substantial transportation costs that one parent bears alone.
          - generic [ref=e409]:
            - heading "Common Reasons for Downward Deviation" [level=2] [ref=e410]
            - paragraph [ref=e411]: Courts may reduce support below the standard amount when the paying parent has substantial prior debts from before the separation, supports children from other relationships, or when the child has significant independent assets or income of their own.
          - generic [ref=e412]:
            - heading "How Courts Decide on Deviations" [level=2] [ref=e413]
            - paragraph [ref=e414]: A judge does not automatically grant a deviation request. The requesting parent must show that applying the standard amount would be unjust given the specific circumstances. This calculator helps you estimate the adjusted amount but a family law attorney should be consulted before requesting a formal deviation.
        - generic [ref=e415]:
          - generic [ref=e416]:
            - heading "Legal Grounds for a Child Support Deviation in Washington State" [level=2] [ref=e417]
            - paragraph [ref=e418]: When using a deviation calculator, it is vital to know which statutory factors the court legally recognizes. Under Washington law (RCW 26.19.075), judges will not grant a deviation for lifestyle preferences. You must qualify under specific legal categories.
            - generic [ref=e419]:
              - generic [ref=e420]:
                - heading "1. Nonrecurring Income or One-Time Financial Windfalls" [level=3] [ref=e421]
                - paragraph [ref=e422]: If a parent’s income is temporarily inflated by a one-time bonus, inheritance, lottery winnings, or a short-term real estate sale, the court may deviate downward from using that specific year's tax returns. Courts can isolate baseline income from these nonrecurring windfalls when determining a just transfer payment.
              - generic [ref=e423]:
                - heading "2. Income of Other Adults in the Household" [level=3] [ref=e424]
                - paragraph [ref=e425]: While a step-parent or new live-in partner has no legal duty to support your child, their financial contributions to rent, groceries, and utilities change your financial position. A judge may use this household income to deny a downward deviation or justify an upward adjustment.
              - generic [ref=e426]:
                - heading "3. Extraordinary Expenses and Debt Obligations" [level=3] [ref=e427]
                - generic [ref=e428]:
                  - paragraph [ref=e429]: "Standard child support schedules assume basic cost-of-living metrics. You can request a deviation if you pay for:"
                  - list [ref=e430]:
                    - listitem [ref=e431]:
                      - strong [ref=e432]: "Special Needs:"
                      - text: Extraordinary medical, dental, or mental health costs.
                    - listitem [ref=e433]:
                      - strong [ref=e434]: "Educational Needs:"
                      - text: Specialized private schooling or tutoring for a disabled child.
                    - listitem [ref=e435]:
                      - strong [ref=e436]: "Prior Debt:"
                      - text: Court-ordered debt from a previous marriage that severely limits current income.
                    - listitem [ref=e437]:
                      - strong [ref=e438]: "Long-Distance Travel:"
                      - text: High costs associated with transporting the child between parents for residential time.
              - generic [ref=e439]:
                - heading "4. Children from Other Relationships" [level=3] [ref=e440]
                - paragraph [ref=e441]: If the paying parent has a legal duty to support biological children from a different relationship, Washington law allows for a downward deviation. This ensures that children from a first or subsequent family are not financially starved by the current child support transfer payment.
          - generic [ref=e442]:
            - heading "Why Was My Child Support Deviation Denied?" [level=2] [ref=e443]
            - paragraph [ref=e444]: "Even if our deviation tool shows you qualify for an adjustment, a family law judge can still deny your request. The two most common reasons for denial in Washington courts are:"
            - generic [ref=e445]:
              - generic [ref=e446]:
                - img [ref=e448]
                - generic [ref=e452]:
                  - heading "The Substantial Hardship Rule" [level=3] [ref=e453]
                  - paragraph [ref=e454]: The court will reject any downward deviation if reducing the support payment pushes the receiving parent's household below the federal poverty line or leaves them unable to provide basic shelter and food for the child.
              - generic [ref=e455]:
                - img [ref=e457]
                - generic [ref=e461]:
                  - heading "Lack of Strict Documentation" [level=3] [ref=e462]
                  - paragraph [ref=e463]: You cannot use estimates. If you request a deviation for extraordinary medical bills or travel, you must provide the court with receipts, clear invoices, and a history of payment records.
        - generic [ref=e464]:
          - heading "Frequently Asked Questions" [level=2] [ref=e465]
          - generic [ref=e467]:
            - generic [ref=e468]:
              - heading "What is a child support deviation in Washington State?" [level=3] [ref=e469]:
                - button "What is a child support deviation in Washington State?" [expanded] [ref=e470] [cursor=pointer]:
                  - generic [ref=e471]: What is a child support deviation in Washington State?
                  - img [ref=e472]
              - region "What is a child support deviation in Washington State?" [ref=e474]:
                - paragraph [ref=e477]: A child support deviation in Washington State is a court approved adjustment that sets support above or below the standard schedule amount. It is governed by RCW 26.19.075 and requires the requesting parent to show that the standard amount would be unjust given their specific circumstances.
            - generic [ref=e478]:
              - heading "What qualifies for a downward deviation in Washington child support?" [level=3] [ref=e479]:
                - button "What qualifies for a downward deviation in Washington child support?" [expanded] [ref=e480] [cursor=pointer]:
                  - generic [ref=e481]: What qualifies for a downward deviation in Washington child support?
                  - img [ref=e482]
              - region "What qualifies for a downward deviation in Washington child support?" [ref=e484]:
                - paragraph [ref=e487]: Qualifying reasons for a downward deviation in Washington include significant debt obligations incurred before the separation, support obligations for children from other relationships, a child's significant independent assets or income, and other financial hardships that make the standard amount unjust.
            - generic [ref=e488]:
              - heading "Can I get more child support than the standard amount in Washington?" [level=3] [ref=e489]:
                - button "Can I get more child support than the standard amount in Washington?" [ref=e490] [cursor=pointer]:
                  - generic [ref=e491]: Can I get more child support than the standard amount in Washington?
                  - img [ref=e492]
              - region "Can I get more child support than the standard amount in Washington?"
            - generic [ref=e494]:
              - heading "How much can child support deviate from the standard in Washington?" [level=3] [ref=e495]:
                - button "How much can child support deviate from the standard in Washington?" [ref=e496] [cursor=pointer]:
                  - generic [ref=e497]: How much can child support deviate from the standard in Washington?
                  - img [ref=e498]
              - region "How much can child support deviate from the standard in Washington?"
            - generic [ref=e500]:
              - heading "Do both parents have to agree to a deviation?" [level=3] [ref=e501]:
                - button "Do both parents have to agree to a deviation?" [ref=e502] [cursor=pointer]:
                  - generic [ref=e503]: Do both parents have to agree to a deviation?
                  - img [ref=e504]
              - region "Do both parents have to agree to a deviation?"
            - generic [ref=e506]:
              - heading "How does nonrecurring income affect child support in Washington?" [level=3] [ref=e507]:
                - button "How does nonrecurring income affect child support in Washington?" [ref=e508] [cursor=pointer]:
                  - generic [ref=e509]: How does nonrecurring income affect child support in Washington?
                  - img [ref=e510]
              - region "How does nonrecurring income affect child support in Washington?"
            - generic [ref=e512]:
              - heading "Does my partner's income count towards child support in Washington?" [level=3] [ref=e513]:
                - button "Does my partner's income count towards child support in Washington?" [ref=e514] [cursor=pointer]:
                  - generic [ref=e515]: Does my partner's income count towards child support in Washington?
                  - img [ref=e516]
              - region "Does my partner's income count towards child support in Washington?"
            - generic [ref=e518]:
              - heading "What extraordinary expenses qualify for a deviation?" [level=3] [ref=e519]:
                - button "What extraordinary expenses qualify for a deviation?" [ref=e520] [cursor=pointer]:
                  - generic [ref=e521]: What extraordinary expenses qualify for a deviation?
                  - img [ref=e522]
              - region "What extraordinary expenses qualify for a deviation?"
            - generic [ref=e524]:
              - heading "Can I get a deviation if I have children from another relationship?" [level=3] [ref=e525]:
                - button "Can I get a deviation if I have children from another relationship?" [ref=e526] [cursor=pointer]:
                  - generic [ref=e527]: Can I get a deviation if I have children from another relationship?
                  - img [ref=e528]
              - region "Can I get a deviation if I have children from another relationship?"
            - generic [ref=e530]:
              - heading "Why might a judge deny my child support deviation request?" [level=3] [ref=e531]:
                - button "Why might a judge deny my child support deviation request?" [ref=e532] [cursor=pointer]:
                  - generic [ref=e533]: Why might a judge deny my child support deviation request?
                  - img [ref=e534]
              - region "Why might a judge deny my child support deviation request?"
        - generic [ref=e536]:
          - heading "Legal Disclaimer" [level=3] [ref=e537]:
            - img [ref=e538]
            - text: Legal Disclaimer
          - paragraph [ref=e540]: Deviations from the Washington State child support schedule are determined by a judge based on the standards in RCW 26.19.075. This calculator provides an estimate based on the values you enter, but the final determination requires written findings of fact from a court.
  - contentinfo [ref=e541]:
    - generic [ref=e542]:
      - generic [ref=e543]:
        - generic [ref=e544]:
          - link "WSCSS" [ref=e545] [cursor=pointer]:
            - /url: /
            - img [ref=e547]
            - generic [ref=e549]: WSCSS
          - paragraph [ref=e550]: Precision child support calculations for Washington State families. Official AOC-aligned data source.
          - link "Email support" [ref=e551] [cursor=pointer]:
            - /url: mailto:support@wscss.site
            - img [ref=e553]
            - generic [ref=e556]: support@wscss.site
        - generic [ref=e557]:
          - heading "Calculators" [level=4] [ref=e558]
          - list [ref=e559]:
            - listitem [ref=e560]:
              - link "Calculator" [ref=e561] [cursor=pointer]:
                - /url: /
            - listitem [ref=e562]:
              - link "Worksheet Pro Wizard" [ref=e563] [cursor=pointer]:
                - /url: /worksheet
            - listitem [ref=e564]:
              - link "King County Guide" [ref=e565] [cursor=pointer]:
                - /url: /washington-courts/king-county
            - listitem [ref=e566]:
              - link "Pierce County Guide" [ref=e567] [cursor=pointer]:
                - /url: /washington-courts/pierce-county
            - listitem [ref=e568]:
              - link "Snohomish County Guide" [ref=e569] [cursor=pointer]:
                - /url: /washington-courts/snohomish-county
            - listitem [ref=e570]:
              - link "Spokane County Guide" [ref=e571] [cursor=pointer]:
                - /url: /washington-courts/spokane-county
        - generic [ref=e572]:
          - heading "Resources" [level=4] [ref=e573]
          - list [ref=e574]:
            - listitem [ref=e575]:
              - link "AOC Mandatory Forms" [ref=e576] [cursor=pointer]:
                - /url: https://www.courts.wa.gov/forms/?fa=forms.contribute&formID=16
            - listitem [ref=e577]:
              - link "WA DSHS Support Center" [ref=e578] [cursor=pointer]:
                - /url: https://www.dshs.wa.gov/esa/division-child-support
            - listitem [ref=e579]:
              - link "Legal Guides & Blog" [ref=e580] [cursor=pointer]:
                - /url: /blog
            - listitem [ref=e581]:
              - link "About WSCSS" [ref=e582] [cursor=pointer]:
                - /url: /about
        - generic [ref=e583]:
          - heading "Legal" [level=4] [ref=e584]
          - list [ref=e585]:
            - listitem [ref=e586]:
              - link "Privacy Policy" [ref=e587] [cursor=pointer]:
                - /url: /privacy
                - img [ref=e588]
                - text: Privacy Policy
            - listitem [ref=e590]:
              - link "Terms of Service" [ref=e591] [cursor=pointer]:
                - /url: /terms
                - img [ref=e592]
                - text: Terms of Service
            - listitem [ref=e596]:
              - link "Methodology" [ref=e597] [cursor=pointer]:
                - /url: /editorial-methodology
                - img [ref=e598]
                - text: Methodology
            - listitem [ref=e602]:
              - link "Legal Disclaimer" [ref=e603] [cursor=pointer]:
                - /url: /disclaimer
                - img [ref=e604]
                - text: Legal Disclaimer
      - generic [ref=e608]:
        - generic [ref=e609]:
          - paragraph [ref=e610]: © 2026 Washington State Child Support Schedule
          - paragraph [ref=e611]: WSCSS is not a law firm and does not provide legal advice. We are an independent resource for 2026 WA State Child Support guidelines. All calculations are estimates only.
        - generic [ref=e613]: RCW 26.19 Compliant
  - button "Open Next.js Dev Tools" [ref=e620] [cursor=pointer]:
    - img [ref=e621]
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