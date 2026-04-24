/**
 * OFFICIAL WASHINGTON STATE CHILD SUPPORT ECONOMIC TABLE (2026)
 *
 * IMPORTANT LEGAL NOTE:
 * These values represent the FINAL BASIC SUPPORT OBLIGATION for the case.
 * They are NOT "per-child" multipliers.
 *
 * Example: Income 2200, 2 Children = 367.
 * This 367 is the TOTAL amount for the whole case.
 * DO NOT multiply by the number of children.
 */

export type SupportTableEntry = {
  income: number;
  totalObligation: {
    children: 1 | 2 | 3 | 4 | 5;
    amount: number;
  }[];
};

export type WashingtonSupportTable2026 = SupportTableEntry[];

/**
 * Normalized Washington State Child Support Schedule 2026
 * Income is strictly ascending. Every bracket includes all 1-5 children entries.
 * All amounts represent the TOTAL CASE OBLIGATION.
 */
export const washingtonSupportTable2026: WashingtonSupportTable2026 = [
  { income: 2200, totalObligation: [{ children: 1, amount: 477 }, { children: 2, amount: 367 }, { children: 3, amount: 298 }, { children: 4, amount: 250 }, { children: 5, amount: 220 }] },
  { income: 2300, totalObligation: [{ children: 1, amount: 499 }, { children: 2, amount: 384 }, { children: 3, amount: 311 }, { children: 4, amount: 261 }, { children: 5, amount: 230 }] },
  { income: 2400, totalObligation: [{ children: 1, amount: 521 }, { children: 2, amount: 400 }, { children: 3, amount: 325 }, { children: 4, amount: 272 }, { children: 5, amount: 239 }] },
  { income: 2500, totalObligation: [{ children: 1, amount: 543 }, { children: 2, amount: 417 }, { children: 3, amount: 338 }, { children: 4, amount: 283 }, { children: 5, amount: 249 }] },
  { income: 2600, totalObligation: [{ children: 1, amount: 565 }, { children: 2, amount: 433 }, { children: 3, amount: 351 }, { children: 4, amount: 294 }, { children: 5, amount: 259 }] },
  { income: 2700, totalObligation: [{ children: 1, amount: 587 }, { children: 2, amount: 450 }, { children: 3, amount: 365 }, { children: 4, amount: 305 }, { children: 5, amount: 269 }] },
  { income: 2800, totalObligation: [{ children: 1, amount: 609 }, { children: 2, amount: 467 }, { children: 3, amount: 378 }, { children: 4, amount: 317 }, { children: 5, amount: 279 }] },
  { income: 2900, totalObligation: [{ children: 1, amount: 630 }, { children: 2, amount: 483 }, { children: 3, amount: 391 }, { children: 4, amount: 328 }, { children: 5, amount: 288 }] },
  { income: 3000, totalObligation: [{ children: 1, amount: 652 }, { children: 2, amount: 500 }, { children: 3, amount: 405 }, { children: 4, amount: 339 }, { children: 5, amount: 298 }] },
  { income: 3100, totalObligation: [{ children: 1, amount: 674 }, { children: 2, amount: 516 }, { children: 3, amount: 418 }, { children: 4, amount: 350 }, { children: 5, amount: 308 }] },
  { income: 3200, totalObligation: [{ children: 1, amount: 696 }, { children: 2, amount: 533 }, { children: 3, amount: 431 }, { children: 4, amount: 361 }, { children: 5, amount: 318 }] },
  { income: 3300, totalObligation: [{ children: 1, amount: 718 }, { children: 2, amount: 550 }, { children: 3, amount: 444 }, { children: 4, amount: 372 }, { children: 5, amount: 328 }] },
  { income: 3400, totalObligation: [{ children: 1, amount: 740 }, { children: 2, amount: 566 }, { children: 3, amount: 458 }, { children: 4, amount: 384 }, { children: 5, amount: 337 }] },
  { income: 3500, totalObligation: [{ children: 1, amount: 762 }, { children: 2, amount: 583 }, { children: 3, amount: 471 }, { children: 4, amount: 395 }, { children: 5, amount: 347 }] },
  { income: 3600, totalObligation: [{ children: 1, amount: 784 }, { children: 2, amount: 599 }, { children: 3, amount: 484 }, { children: 4, amount: 406 }, { children: 5, amount: 357 }] },
  { income: 3700, totalObligation: [{ children: 1, amount: 803 }, { children: 2, amount: 614 }, { children: 3, amount: 496 }, { children: 4, amount: 416 }, { children: 5, amount: 366 }] },
  { income: 3800, totalObligation: [{ children: 1, amount: 816 }, { children: 2, amount: 624 }, { children: 3, amount: 503 }, { children: 4, amount: 422 }, { children: 5, amount: 371 }] },
  { income: 3900, totalObligation: [{ children: 1, amount: 830 }, { children: 2, amount: 634 }, { children: 3, amount: 511 }, { children: 4, amount: 428 }, { children: 5, amount: 377 }] },
  { income: 4000, totalObligation: [{ children: 1, amount: 843 }, { children: 2, amount: 643 }, { children: 3, amount: 518 }, { children: 4, amount: 434 }, { children: 5, amount: 382 }] },
  { income: 4100, totalObligation: [{ children: 1, amount: 857 }, { children: 2, amount: 653 }, { children: 3, amount: 526 }, { children: 4, amount: 440 }, { children: 5, amount: 388 }] },
  { income: 4200, totalObligation: [{ children: 1, amount: 867 }, { children: 2, amount: 660 }, { children: 3, amount: 531 }, { children: 4, amount: 445 }, { children: 5, amount: 392 }] },
  { income: 4300, totalObligation: [{ children: 1, amount: 877 }, { children: 2, amount: 668 }, { children: 3, amount: 537 }, { children: 4, amount: 450 }, { children: 5, amount: 396 }] },
  { income: 4400, totalObligation: [{ children: 1, amount: 887 }, { children: 2, amount: 675 }, { children: 3, amount: 543 }, { children: 4, amount: 455 }, { children: 5, amount: 400 }] },
  { income: 4500, totalObligation: [{ children: 1, amount: 896 }, { children: 2, amount: 682 }, { children: 3, amount: 548 }, { children: 4, amount: 459 }, { children: 5, amount: 404 }] },
  { income: 4600, totalObligation: [{ children: 1, amount: 906 }, { children: 2, amount: 689 }, { children: 3, amount: 554 }, { children: 4, amount: 464 }, { children: 5, amount: 408 }] },
  { income: 4700, totalObligation: [{ children: 1, amount: 916 }, { children: 2, amount: 697 }, { children: 3, amount: 559 }, { children: 4, amount: 469 }, { children: 5, amount: 412 }] },
  { income: 4800, totalObligation: [{ children: 1, amount: 927 }, { children: 2, amount: 705 }, { children: 3, amount: 566 }, { children: 4, amount: 474 }, { children: 5, amount: 417 }] },
  { income: 4900, totalObligation: [{ children: 1, amount: 939 }, { children: 2, amount: 714 }, { children: 3, amount: 573 }, { children: 4, amount: 480 }, { children: 5, amount: 422 }] },
  { income: 5000, totalObligation: [{ children: 1, amount: 951 }, { children: 2, amount: 723 }, { children: 3, amount: 580 }, { children: 4, amount: 486 }, { children: 5, amount: 428 }] },
  { income: 5100, totalObligation: [{ children: 1, amount: 963 }, { children: 2, amount: 732 }, { children: 3, amount: 587 }, { children: 4, amount: 492 }, { children: 5, amount: 433 }] },
  { income: 5200, totalObligation: [{ children: 1, amount: 975 }, { children: 2, amount: 741 }, { children: 3, amount: 594 }, { children: 4, amount: 498 }, { children: 5, amount: 438 }] },
  { income: 5300, totalObligation: [{ children: 1, amount: 987 }, { children: 2, amount: 750 }, { children: 3, amount: 602 }, { children: 4, amount: 504 }, { children: 5, amount: 443 }] },
  { income: 5400, totalObligation: [{ children: 1, amount: 999 }, { children: 2, amount: 759 }, { children: 3, amount: 609 }, { children: 4, amount: 510 }, { children: 5, amount: 449 }] },
  { income: 5500, totalObligation: [{ children: 1, amount: 1011 }, { children: 2, amount: 768 }, { children: 3, amount: 616 }, { children: 4, amount: 516 }, { children: 5, amount: 454 }] },
  { income: 5600, totalObligation: [{ children: 1, amount: 1023 }, { children: 2, amount: 777 }, { children: 3, amount: 623 }, { children: 4, amount: 522 }, { children: 5, amount: 459 }] },
  { income: 5700, totalObligation: [{ children: 1, amount: 1030 }, { children: 2, amount: 782 }, { children: 3, amount: 627 }, { children: 4, amount: 525 }, { children: 5, amount: 462 }] },
  { income: 5800, totalObligation: [{ children: 1, amount: 1036 }, { children: 2, amount: 786 }, { children: 3, amount: 630 }, { children: 4, amount: 528 }, { children: 5, amount: 465 }] },
  { income: 5900, totalObligation: [{ children: 1, amount: 1042 }, { children: 2, amount: 791 }, { children: 3, amount: 634 }, { children: 4, amount: 531 }, { children: 5, amount: 467 }] },
  { income: 6000, totalObligation: [{ children: 1, amount: 1048 }, { children: 2, amount: 795 }, { children: 3, amount: 637 }, { children: 4, amount: 534 }, { children: 5, amount: 470 }] },
  { income: 6100, totalObligation: [{ children: 1, amount: 1054 }, { children: 2, amount: 800 }, { children: 3, amount: 641 }, { children: 4, amount: 537 }, { children: 5, amount: 472 }] },
  { income: 6200, totalObligation: [{ children: 1, amount: 1061 }, { children: 2, amount: 804 }, { children: 3, amount: 644 }, { children: 4, amount: 540 }, { children: 5, amount: 475 }] },
  { income: 6300, totalObligation: [{ children: 1, amount: 1067 }, { children: 2, amount: 809 }, { children: 3, amount: 648 }, { children: 4, amount: 543 }, { children: 5, amount: 477 }] },
  { income: 6400, totalObligation: [{ children: 1, amount: 1073 }, { children: 2, amount: 813 }, { children: 3, amount: 651 }, { children: 4, amount: 545 }, { children: 5, amount: 480 }] },
  { income: 6500, totalObligation: [{ children: 1, amount: 1081 }, { children: 2, amount: 819 }, { children: 3, amount: 656 }, { children: 4, amount: 549 }, { children: 5, amount: 483 }] },
  { income: 6600, totalObligation: [{ children: 1, amount: 1096 }, { children: 2, amount: 830 }, { children: 3, amount: 665 }, { children: 4, amount: 557 }, { children: 5, amount: 490 }] },
  { income: 6700, totalObligation: [{ children: 1, amount: 1111 }, { children: 2, amount: 842 }, { children: 3, amount: 674 }, { children: 4, amount: 564 }, { children: 5, amount: 497 }] },
  { income: 6800, totalObligation: [{ children: 1, amount: 1126 }, { children: 2, amount: 853 }, { children: 3, amount: 683 }, { children: 4, amount: 572 }, { children: 5, amount: 503 }] },
  { income: 6900, totalObligation: [{ children: 1, amount: 1141 }, { children: 2, amount: 864 }, { children: 3, amount: 692 }, { children: 4, amount: 579 }, { children: 5, amount: 510 }] },
  { income: 7000, totalObligation: [{ children: 1, amount: 1156 }, { children: 2, amount: 875 }, { children: 3, amount: 701 }, { children: 4, amount: 587 }, { children: 5, amount: 516 }] },
  { income: 7100, totalObligation: [{ children: 1, amount: 1170 }, { children: 2, amount: 886 }, { children: 3, amount: 710 }, { children: 4, amount: 594 }, { children: 5, amount: 523 }] },
  { income: 7200, totalObligation: [{ children: 1, amount: 1185 }, { children: 2, amount: 898 }, { children: 3, amount: 719 }, { children: 4, amount: 602 }, { children: 5, amount: 530 }] },
  { income: 7300, totalObligation: [{ children: 1, amount: 1200 }, { children: 2, amount: 909 }, { children: 3, amount: 727 }, { children: 4, amount: 609 }, { children: 5, amount: 536 }] },
  { income: 7400, totalObligation: [{ children: 1, amount: 1212 }, { children: 2, amount: 918 }, { children: 3, amount: 734 }, { children: 4, amount: 615 }, { children: 5, amount: 541 }] },
  { income: 7500, totalObligation: [{ children: 1, amount: 1222 }, { children: 2, amount: 925 }, { children: 3, amount: 740 }, { children: 4, amount: 620 }, { children: 5, amount: 545 }] },
  { income: 7600, totalObligation: [{ children: 1, amount: 1231 }, { children: 2, amount: 932 }, { children: 3, amount: 745 }, { children: 4, amount: 624 }, { children: 5, amount: 549 }] },
  { income: 7700, totalObligation: [{ children: 1, amount: 1241 }, { children: 2, amount: 939 }, { children: 3, amount: 751 }, { children: 4, amount: 629 }, { children: 5, amount: 554 }] },
  { income: 7800, totalObligation: [{ children: 1, amount: 1251 }, { children: 2, amount: 946 }, { children: 3, amount: 756 }, { children: 4, amount: 634 }, { children: 5, amount: 558 }] },
  { income: 7900, totalObligation: [{ children: 1, amount: 1261 }, { children: 2, amount: 953 }, { children: 3, amount: 762 }, { children: 4, amount: 638 }, { children: 5, amount: 562 }] },
  { income: 8000, totalObligation: [{ children: 1, amount: 1270 }, { children: 2, amount: 960 }, { children: 3, amount: 767 }, { children: 4, amount: 643 }, { children: 5, amount: 566 }] },
  { income: 8100, totalObligation: [{ children: 1, amount: 1280 }, { children: 2, amount: 968 }, { children: 3, amount: 773 }, { children: 4, amount: 647 }, { children: 5, amount: 570 }] },
  { income: 8200, totalObligation: [{ children: 1, amount: 1290 }, { children: 2, amount: 975 }, { children: 3, amount: 778 }, { children: 4, amount: 652 }, { children: 5, amount: 574 }] },
  { income: 8300, totalObligation: [{ children: 1, amount: 1299 }, { children: 2, amount: 981 }, { children: 3, amount: 783 }, { children: 4, amount: 656 }, { children: 5, amount: 577 }] },
  { income: 8400, totalObligation: [{ children: 1, amount: 1308 }, { children: 2, amount: 987 }, { children: 3, amount: 788 }, { children: 4, amount: 660 }, { children: 5, amount: 581 }] },
  { income: 8500, totalObligation: [{ children: 1, amount: 1316 }, { children: 2, amount: 994 }, { children: 3, amount: 793 }, { children: 4, amount: 664 }, { children: 5, amount: 584 }] },
  { income: 8600, totalObligation: [{ children: 1, amount: 1325 }, { children: 2, amount: 1000 }, { children: 3, amount: 797 }, { children: 4, amount: 668 }, { children: 5, amount: 588 }] },
  { income: 8700, totalObligation: [{ children: 1, amount: 1334 }, { children: 2, amount: 1007 }, { children: 3, amount: 802 }, { children: 4, amount: 672 }, { children: 5, amount: 591 }] },
  { income: 8800, totalObligation: [{ children: 1, amount: 1343 }, { children: 2, amount: 1013 }, { children: 3, amount: 807 }, { children: 4, amount: 676 }, { children: 5, amount: 595 }] },
  { income: 8900, totalObligation: [{ children: 1, amount: 1352 }, { children: 2, amount: 1019 }, { children: 3, amount: 812 }, { children: 4, amount: 680 }, { children: 5, amount: 599 }] },
  { income: 9000, totalObligation: [{ children: 1, amount: 1361 }, { children: 2, amount: 1026 }, { children: 3, amount: 817 }, { children: 4, amount: 684 }, { children: 5, amount: 602 }] },
  { income: 9100, totalObligation: [{ children: 1, amount: 1370 }, { children: 2, amount: 1032 }, { children: 3, amount: 822 }, { children: 4, amount: 689 }, { children: 5, amount: 606 }] },
  { income: 9200, totalObligation: [{ children: 1, amount: 1379 }, { children: 2, amount: 1040 }, { children: 3, amount: 828 }, { children: 4, amount: 694 }, { children: 5, amount: 611 }] },
  { income: 9300, totalObligation: [{ children: 1, amount: 1387 }, { children: 2, amount: 1047 }, { children: 3, amount: 835 }, { children: 4, amount: 699 }, { children: 5, amount: 616 }] },
  { income: 9400, totalObligation: [{ children: 1, amount: 1396 }, { children: 2, amount: 1055 }, { children: 3, amount: 841 }, { children: 4, amount: 705 }, { children: 5, amount: 620 }] },
  { income: 9500, totalObligation: [{ children: 1, amount: 1405 }, { children: 2, amount: 1062 }, { children: 3, amount: 848 }, { children: 4, amount: 710 }, { children: 5, amount: 625 }] },
  { income: 9600, totalObligation: [{ children: 1, amount: 1414 }, { children: 2, amount: 1069 }, { children: 3, amount: 854 }, { children: 4, amount: 716 }, { children: 5, amount: 630 }] },
  { income: 9700, totalObligation: [{ children: 1, amount: 1423 }, { children: 2, amount: 1077 }, { children: 3, amount: 861 }, { children: 4, amount: 721 }, { children: 5, amount: 635 }] },
  { income: 9800, totalObligation: [{ children: 1, amount: 1432 }, { children: 2, amount: 1084 }, { children: 3, amount: 867 }, { children: 4, amount: 727 }, { children: 5, amount: 639 }] },
  { income: 9900, totalObligation: [{ children: 1, amount: 1441 }, { children: 2, amount: 1092 }, { children: 3, amount: 874 }, { children: 4, amount: 732 }, { children: 5, amount: 644 }] },
  { income: 10000, totalObligation: [{ children: 1, amount: 1451 }, { children: 2, amount: 1099 }, { children: 3, amount: 879 }, { children: 4, amount: 737 }, { children: 5, amount: 648 }] },
  { income: 10100, totalObligation: [{ children: 1, amount: 1462 }, { children: 2, amount: 1107 }, { children: 3, amount: 885 }, { children: 4, amount: 741 }, { children: 5, amount: 652 }] },
  { income: 10200, totalObligation: [{ children: 1, amount: 1473 }, { children: 2, amount: 1114 }, { children: 3, amount: 890 }, { children: 4, amount: 745 }, { children: 5, amount: 656 }] },
  { income: 10300, totalObligation: [{ children: 1, amount: 1484 }, { children: 2, amount: 1122 }, { children: 3, amount: 895 }, { children: 4, amount: 750 }, { children: 5, amount: 660 }] },
  { income: 10400, totalObligation: [{ children: 1, amount: 1495 }, { children: 2, amount: 1129 }, { children: 3, amount: 900 }, { children: 4, amount: 754 }, { children: 5, amount: 664 }] },
  { income: 10500, totalObligation: [{ children: 1, amount: 1507 }, { children: 2, amount: 1136 }, { children: 3, amount: 906 }, { children: 4, amount: 759 }, { children: 5, amount: 668 }] },
  { income: 10600, totalObligation: [{ children: 1, amount: 1518 }, { children: 2, amount: 1144 }, { children: 3, amount: 911 }, { children: 4, amount: 763 }, { children: 5, amount: 672 }] },
  { income: 10700, totalObligation: [{ children: 1, amount: 1529 }, { children: 2, amount: 1151 }, { children: 3, amount: 916 }, { children: 4, amount: 767 }, { children: 5, amount: 675 }] },
  { income: 10800, totalObligation: [{ children: 1, amount: 1539 }, { children: 2, amount: 1159 }, { children: 3, amount: 921 }, { children: 4, amount: 772 }, { children: 5, amount: 679 }] },
  { income: 10900, totalObligation: [{ children: 1, amount: 1542 }, { children: 2, amount: 1161 }, { children: 3, amount: 924 }, { children: 4, amount: 774 }, { children: 5, amount: 681 }] },
  { income: 11000, totalObligation: [{ children: 1, amount: 1545 }, { children: 2, amount: 1164 }, { children: 3, amount: 926 }, { children: 4, amount: 776 }, { children: 5, amount: 683 }] },
  { income: 11100, totalObligation: [{ children: 1, amount: 1548 }, { children: 2, amount: 1166 }, { children: 3, amount: 928 }, { children: 4, amount: 778 }, { children: 5, amount: 684 }] },
  { income: 11200, totalObligation: [{ children: 1, amount: 1551 }, { children: 2, amount: 1169 }, { children: 3, amount: 931 }, { children: 4, amount: 780 }, { children: 5, amount: 686 }] },
  { income: 11300, totalObligation: [{ children: 1, amount: 1554 }, { children: 2, amount: 1172 }, { children: 3, amount: 933 }, { children: 4, amount: 782 }, { children: 5, amount: 688 }] },
  { income: 11400, totalObligation: [{ children: 1, amount: 1556 }, { children: 2, amount: 1174 }, { children: 3, amount: 936 }, { children: 4, amount: 784 }, { children: 5, amount: 690 }] },
  { income: 11500, totalObligation: [{ children: 1, amount: 1559 }, { children: 2, amount: 1177 }, { children: 3, amount: 938 }, { children: 4, amount: 786 }, { children: 5, amount: 692 }] },
  { income: 11600, totalObligation: [{ children: 1, amount: 1562 }, { children: 2, amount: 1179 }, { children: 3, amount: 940 }, { children: 4, amount: 788 }, { children: 5, amount: 693 }] },
  { income: 11700, totalObligation: [{ children: 1, amount: 1565 }, { children: 2, amount: 1182 }, { children: 3, amount: 943 }, { children: 4, amount: 790 }, { children: 5, amount: 695 }] },
  { income: 11800, totalObligation: [{ children: 1, amount: 1568 }, { children: 2, amount: 1184 }, { children: 3, amount: 945 }, { children: 4, amount: 792 }, { children: 5, amount: 697 }] },
  { income: 11900, totalObligation: [{ children: 1, amount: 1571 }, { children: 2, amount: 1187 }, { children: 3, amount: 948 }, { children: 4, amount: 794 }, { children: 5, amount: 699 }] },
  { income: 12000, totalObligation: [{ children: 1, amount: 1573 }, { children: 2, amount: 1190 }, { children: 3, amount: 950 }, { children: 4, amount: 796 }, { children: 5, amount: 700 }] },
  { income: 12100, totalObligation: [{ children: 1, amount: 1584 }, { children: 2, amount: 1199 }, { children: 3, amount: 957 }, { children: 4, amount: 802 }, { children: 5, amount: 705 }] },
  { income: 12200, totalObligation: [{ children: 1, amount: 1594 }, { children: 2, amount: 1207 }, { children: 3, amount: 964 }, { children: 4, amount: 808 }, { children: 5, amount: 711 }] },
  { income: 12300, totalObligation: [{ children: 1, amount: 1605 }, { children: 2, amount: 1216 }, { children: 3, amount: 971 }, { children: 4, amount: 814 }, { children: 5, amount: 716 }] },
  { income: 12400, totalObligation: [{ children: 1, amount: 1616 }, { children: 2, amount: 1225 }, { children: 3, amount: 978 }, { children: 4, amount: 820 }, { children: 5, amount: 721 }] },
  { income: 12500, totalObligation: [{ children: 1, amount: 1626 }, { children: 2, amount: 1233 }, { children: 3, amount: 985 }, { children: 4, amount: 826 }, { children: 5, amount: 727 }] },
  { income: 12600, totalObligation: [{ children: 1, amount: 1637 }, { children: 2, amount: 1242 }, { children: 3, amount: 992 }, { children: 4, amount: 832 }, { children: 5, amount: 732 }] },
  { income: 12700, totalObligation: [{ children: 1, amount: 1647 }, { children: 2, amount: 1251 }, { children: 3, amount: 999 }, { children: 4, amount: 838 }, { children: 5, amount: 737 }] },
  { income: 12800, totalObligation: [{ children: 1, amount: 1657 }, { children: 2, amount: 1259 }, { children: 3, amount: 1007 }, { children: 4, amount: 844 }, { children: 5, amount: 743 }] },
  { income: 12900, totalObligation: [{ children: 1, amount: 1668 }, { children: 2, amount: 1268 }, { children: 3, amount: 1014 }, { children: 4, amount: 850 }, { children: 5, amount: 748 }] },
  { income: 13000, totalObligation: [{ children: 1, amount: 1678 }, { children: 2, amount: 1276 }, { children: 3, amount: 1021 }, { children: 4, amount: 856 }, { children: 5, amount: 753 }] },
  { income: 14000, totalObligation: [{ children: 1, amount: 1779 }, { children: 2, amount: 1360 }, { children: 3, amount: 1090 }, { children: 4, amount: 915 }, { children: 5, amount: 805 }] },
  { income: 15000, totalObligation: [{ children: 1, amount: 1876 }, { children: 2, amount: 1443 }, { children: 3, amount: 1158 }, { children: 4, amount: 973 }, { children: 5, amount: 857 }] },
  { income: 16000, totalObligation: [{ children: 1, amount: 1969 }, { children: 2, amount: 1523 }, { children: 3, amount: 1224 }, { children: 4, amount: 1029 }, { children: 5, amount: 908 }] },
  { income: 17000, totalObligation: [{ children: 1, amount: 2058 }, { children: 2, amount: 1601 }, { children: 3, amount: 1289 }, { children: 4, amount: 1085 }, { children: 5, amount: 958 }] },
  { income: 18000, totalObligation: [{ children: 1, amount: 2143 }, { children: 2, amount: 1677 }, { children: 3, amount: 1353 }, { children: 4, amount: 1140 }, { children: 5, amount: 1007 }] },
  { income: 19000, totalObligation: [{ children: 1, amount: 2225 }, { children: 2, amount: 1751 }, { children: 3, amount: 1416 }, { children: 4, amount: 1194 }, { children: 5, amount: 1055 }] },
  { income: 20000, totalObligation: [{ children: 1, amount: 2302 }, { children: 2, amount: 1823 }, { children: 3, amount: 1477 }, { children: 4, amount: 1247 }, { children: 5, amount: 1103 }] },
  { income: 21000, totalObligation: [{ children: 1, amount: 2382 }, { children: 2, amount: 1893 }, { children: 3, amount: 1537 }, { children: 4, amount: 1299 }, { children: 5, amount: 1149 }] },
  { income: 22000, totalObligation: [{ children: 1, amount: 2452 }, { children: 2, amount: 1962 }, { children: 3, amount: 1595 }, { children: 4, amount: 1349 }, { children: 5, amount: 1195 }] },
  { income: 23000, totalObligation: [{ children: 1, amount: 2522 }, { children: 2, amount: 2028 }, { children: 3, amount: 1652 }, { children: 4, amount: 1399 }, { children: 5, amount: 1240 }] },
  { income: 24000, totalObligation: [{ children: 1, amount: 2592 }, { children: 2, amount: 2092 }, { children: 3, amount: 1708 }, { children: 4, amount: 1448 }, { children: 5, amount: 1285 }] },
  { income: 25000, totalObligation: [{ children: 1, amount: 2662 }, { children: 2, amount: 2154 }, { children: 3, amount: 1762 }, { children: 4, amount: 1496 }, { children: 5, amount: 1328 }] },
  { income: 26000, totalObligation: [{ children: 1, amount: 2726 }, { children: 2, amount: 2214 }, { children: 3, amount: 1816 }, { children: 4, amount: 1543 }, { children: 5, amount: 1371 }] },
  { income: 27000, totalObligation: [{ children: 1, amount: 2786 }, { children: 2, amount: 2272 }, { children: 3, amount: 1867 }, { children: 4, amount: 1589 }, { children: 5, amount: 1413 }] },
  { income: 28000, totalObligation: [{ children: 1, amount: 2846 }, { children: 2, amount: 2329 }, { children: 3, amount: 1918 }, { children: 4, amount: 1633 }, { children: 5, amount: 1454 }] },
  { income: 29000, totalObligation: [{ children: 1, amount: 2906 }, { children: 2, amount: 2383 }, { children: 3, amount: 1967 }, { children: 4, amount: 1677 }, { children: 5, amount: 1494 }] },
  { income: 30000, totalObligation: [{ children: 1, amount: 2966 }, { children: 2, amount: 2435 }, { children: 3, amount: 2015 }, { children: 4, amount: 1720 }, { children: 5, amount: 1534 }] },
  { income: 31000, totalObligation: [{ children: 1, amount: 3026 }, { children: 2, amount: 2485 }, { children: 3, amount: 2061 }, { children: 4, amount: 1762 }, { children: 5, amount: 1573 }] },
  { income: 32000, totalObligation: [{ children: 1, amount: 3086 }, { children: 2, amount: 2533 }, { children: 3, amount: 2107 }, { children: 4, amount: 1803 }, { children: 5, amount: 1611 }] },
  { income: 33000, totalObligation: [{ children: 1, amount: 3146 }, { children: 2, amount: 2579 }, { children: 3, amount: 2150 }, { children: 4, amount: 1843 }, { children: 5, amount: 1648 }] },
  { income: 34000, totalObligation: [{ children: 1, amount: 3206 }, { children: 2, amount: 2624 }, { children: 3, amount: 2193 }, { children: 4, amount: 1881 }, { children: 5, amount: 1684 }] },
  { income: 35000, totalObligation: [{ children: 1, amount: 3263 }, { children: 2, amount: 2666 }, { children: 3, amount: 2234 }, { children: 4, amount: 1919 }, { children: 5, amount: 1720 }] },
  { income: 36000, totalObligation: [{ children: 1, amount: 3313 }, { children: 2, amount: 2706 }, { children: 3, amount: 2274 }, { children: 4, amount: 1956 }, { children: 5, amount: 1754 }] },
  { income: 37000, totalObligation: [{ children: 1, amount: 3363 }, { children: 2, amount: 2744 }, { children: 3, amount: 2312 }, { children: 4, amount: 1992 }, { children: 5, amount: 1788 }] },
  { income: 38000, totalObligation: [{ children: 1, amount: 3413 }, { children: 2, amount: 2780 }, { children: 3, amount: 2350 }, { children: 4, amount: 2027 }, { children: 5, amount: 1821 }] },
  { income: 39000, totalObligation: [{ children: 1, amount: 3463 }, { children: 2, amount: 2814 }, { children: 3, amount: 2385 }, { children: 4, amount: 2061 }, { children: 5, amount: 1854 }] },
  { income: 40000, totalObligation: [{ children: 1, amount: 3513 }, { children: 2, amount: 2847 }, { children: 3, amount: 2420 }, { children: 4, amount: 2093 }, { children: 5, amount: 1885 }] },
  { income: 41000, totalObligation: [{ children: 1, amount: 3563 }, { children: 2, amount: 2877 }, { children: 3, amount: 2453 }, { children: 4, amount: 2125 }, { children: 5, amount: 1916 }] },
  { income: 42000, totalObligation: [{ children: 1, amount: 3611 }, { children: 2, amount: 2905 }, { children: 3, amount: 2485 }, { children: 4, amount: 2156 }, { children: 5, amount: 1946 }] },
  { income: 43000, totalObligation: [{ children: 1, amount: 3651 }, { children: 2, amount: 2931 }, { children: 3, amount: 2515 }, { children: 4, amount: 2186 }, { children: 5, amount: 1975 }] },
  { income: 44000, totalObligation: [{ children: 1, amount: 3691 }, { children: 2, amount: 2955 }, { children: 3, amount: 2545 }, { children: 4, amount: 2215 }, { children: 5, amount: 2003 }] },
  { income: 45000, totalObligation: [{ children: 1, amount: 3731 }, { children: 2, amount: 2977 }, { children: 3, amount: 2572 }, { children: 4, amount: 2243 }, { children: 5, amount: 2031 }] },
  { income: 46000, totalObligation: [{ children: 1, amount: 3771 }, { children: 2, amount: 2998 }, { children: 3, amount: 2599 }, { children: 4, amount: 2269 }, { children: 5, amount: 2058 }] },
  { income: 47000, totalObligation: [{ children: 1, amount: 3811 }, { children: 2, amount: 3016 }, { children: 3, amount: 2624 }, { children: 4, amount: 2295 }, { children: 5, amount: 2084 }] },
  { income: 48000, totalObligation: [{ children: 1, amount: 3851 }, { children: 2, amount: 3032 }, { children: 3, amount: 2648 }, { children: 4, amount: 2320 }, { children: 5, amount: 2109 }] },
  { income: 49000, totalObligation: [{ children: 1, amount: 3886 }, { children: 2, amount: 3046 }, { children: 3, amount: 2670 }, { children: 4, amount: 2344 }, { children: 5, amount: 2133 }] },
  { income: 50000, totalObligation: [{ children: 1, amount: 3916 }, { children: 2, amount: 3058 }, { children: 3, amount: 2692 }, { children: 4, amount: 2367 }, { children: 5, amount: 2157 }] }
];

// LEGACY SUPPORT: Maintain Record format for internal compatibility
export const washingtonTable2026: Record<number, Record<number, number>> = Object.fromEntries(
  washingtonSupportTable2026.map(entry => [
    entry.income,
    Object.fromEntries(entry.totalObligation.map(o => [o.children, o.amount]))
  ])
);

// PERFORMANCE OPTIMIZATION: Memoize sorted brackets outside function
const availableBrackets = washingtonSupportTable2026.map(e => e.income).sort((a, b) => b - a);

export type SupportCalculationResult =
  | { status: "calculated"; income: number; bracketUsed: number; childrenUsed: number; totalSupport: number; lookupType: "floor_match"; source: "WASHINGTON_TABLE_2026"; debug?: any }
  | { status: "manual_determination"; income: number; children: number; reason: string; debug?: any }
  | { status: "error"; message: string; debug?: any };

/**
 * PRODUCTION-SAFE LOOKUP HELPER
 * Returns the TOTAL OBLIGATION for the case.
 * @deprecated Use getExactSupport() for structured results
 */
export function getSupport(income: number, children: number): number | null {
  const result = getExactSupport(income, children);
  return result.status === "calculated" ? result.totalSupport : null;
}

/**
 * DETERMINISTIC RULE ENGINE FOR WASHINGTON CHILD SUPPORT (2026)
 * Handles all legal rules, clamping, and edge cases.
 *
 * @param income - Combined Monthly Net Income
 * @param children - Number of Children in case
 * @param debug - Optional flag to include trace info
 * @returns SupportCalculationResult object
 */
export function getExactSupport(income: number, children: number, debug: boolean = false): SupportCalculationResult {
  const debugInfo: any = debug ? { inputIncome: income, inputChildren: children } : undefined;

  // 1. Handle safely invalid inputs
  if (income === null || income === undefined || isNaN(income) || income < 0 ||
      children === null || children === undefined || isNaN(children)) {
    return { status: "error", message: "Invalid input parameters", debug: debugInfo };
  }

  // 2. Legal Rule: Income < 2200 requires manual determination
  if (income < 2200) {
    return {
      status: "manual_determination",
      income,
      children,
      reason: "Income below statutory table threshold ($2,200)",
      debug: debugInfo
    };
  }

  // 3. Income Handling: Max usable income = 50000
  const effectiveIncome = Math.min(income, 50000);

  // 4. Children Handling: Clamp between 1-5
  const childrenUsed = Math.max(1, Math.min(Math.round(children), 5)) as 1 | 2 | 3 | 4 | 5;

  // 5. Bracket Selection: Use floor matching logic
  const bracketUsed = availableBrackets.find(b => b <= effectiveIncome);

  if (bracketUsed === undefined) {
    // This should technically never happen given the < 2200 check above
    return { status: "error", message: "No suitable income bracket found", debug: debugInfo };
  }

  // 6. Lookup Logic
  const row = washingtonTable2026[bracketUsed];
  if (!row) {
    return { status: "error", message: "Internal Data Error: Bracket not found in table", debug: debugInfo };
  }

  const totalSupport = row[childrenUsed];
  if (totalSupport === undefined || isNaN(totalSupport)) {
    return { status: "error", message: "Internal Data Error: Invalid support value", debug: debugInfo };
  }

  if (debug) {
    debugInfo.effectiveIncome = effectiveIncome;
    debugInfo.selectedBracket = bracketUsed;
    debugInfo.childrenUsed = childrenUsed;
    debugInfo.rawValue = totalSupport;
    debugInfo.lookupStrategy = "floor_match";
  }

  // 7. Success Output
  return {
    status: "calculated",
    income,
    bracketUsed,
    childrenUsed,
    totalSupport,
    lookupType: "floor_match",
    source: "WASHINGTON_TABLE_2026",
    debug: debugInfo
  };
}
