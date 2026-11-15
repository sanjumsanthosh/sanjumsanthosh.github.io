---
title: "Vision inference benchmark"
summary: "A reproducible PyTorch → ONNX INT8 pipeline that measures latency, model size and process memory — with the accuracy question left honestly open."
year: "2026"
status: shipped
themes: ["ai", "ml"]
stack: ["PyTorch", "ONNX Runtime", "Static INT8 (QDQ)", "Python"]
evidence: ["repo", "metric"]
links:
  repo: "https://github.com/sanjumsanthosh/vision-inference-bench"
  demo: "https://sanjumsanthosh.github.io/vision-inference-bench/"
featured: true
order: 6
---

## Problem

"Quantization makes inference faster" is repeated far more often than it is
measured. When I looked for numbers I could reproduce, most write-ups reported a
speedup with different hardware, different preprocessing or different batch
settings — which makes the comparison meaningless.

## Approach

Fix everything except the thing being tested. One preprocessed image, batch size
1, a single thread, 20 warm-up runs then 200 timed runs, and the same harness for
both precisions. Report latency, file size and process memory from the same run.

## What I built

- A **PyTorch → ONNX export** path plus **static QDQ INT8 quantization** with a
  200-image calibration set
- A **reproducible benchmark harness** reporting median latency, model size and
  process memory as machine-readable output
- Side-by-side FP32 and INT8 runs on identical inputs

## Evidence

On an Apple M4 Pro CPU, ONNX Runtime median latency was **3.095 ms FP32** versus
**1.495 ms INT8** — roughly 2× — with the quantized model also smaller.

Source: [sanjumsanthosh/vision-inference-bench](https://github.com/sanjumsanthosh/vision-inference-bench)

**The caveat matters more than the speedup.** FP32 and INT8 disagreed on top-1
predictions, and I did not measure held-out accuracy. So this is a latency
benchmark, not a demonstration of accuracy-preserving optimization, and nothing
here says anything about deploying to a headset or wearable.

## What I'd do next

Measure accuracy on a withheld split before quoting any speedup, and repeat the
run on the actual target device. The point of the harness is that it makes that
comparison cheap — the missing piece is doing it.
