# makefun-auto-news-image-20261119-entri

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/rioxbt/makefun-auto-news-image-20261119-entri/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/rioxbt/makefun-auto-news-image-20261119-entri/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

One image that sums up the world's news of Thursday 19 November 2026: an
editorial "the world in one day" front graphic. It names the day across the
masthead, gives the day's biggest story — Trump, Xi and Putin meeting in China
at the APEC summit — the hero card, carries six further stories across regions
and fields (Ukraine's strike on the Kerch bridge, Iran and the Gulf, the
US-Venezuela military pact, Nvidia halting H200 chips to China, the COP climate
stocktake, BepiColombo arriving at Mercury), and closes with a ticker of the
rest. The program writes that image to `/output/entry.png`, the one path the
grader reads.

The image is `entry.png` (1024x1024 PNG, ~126 KiB, well inside the 1 MiB cap)
held beside `main.ts`; the program copies its bytes to the output directory, so
the two grading runs write identical bytes. `main.ts` also checks the file
against the gate before writing it — a whole PNG or JPEG, at most 1 MiB and at
most 1024x1024 — and prints the image's format, size and sha256.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

From inside the grader's container `MAKEFUN_OUTPUT_DIR` is unset and the program
writes `/output/entry.png` directly.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
