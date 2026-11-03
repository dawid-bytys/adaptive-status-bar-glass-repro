# Status bar reads black when a tinted Liquid Glass view is on screen

Minimal iOS reproduction using Expo SDK 58. The example is in `App.tsx`.

A white screen calls `AdaptiveStatusBar.enable()` and shows the live style and lightness from `useAdaptiveStatusBarStats`. A button toggles an expo-glass-effect `GlassView` with a `tintColor`, placed in the middle of the screen, well away from the status bar.

## Run

```sh
npm ci
npm run ios
```

Requires Node 22.13+ (22.x), 24.3+ (24.x), or 26+, Xcode, CocoaPods, and an iOS 26+ simulator. Use a native development build; Expo Go is not supported.

## Reproduce

1. Launch the app. The readout shows **Style: dark** and **Lightness: 1.00**, and the status bar icons are dark.
2. Press **Show glass**.

**Expected:** the status bar stays dark, because nothing behind it changed.

**Actual:** the readout switches to **Style: light** and **Lightness: 0.00**, and the status bar icons turn white on the white background.

Pressing **Hide glass** brings the dark icons back. A `GlassView` without `tintColor` does not trigger it.

The repository uses the unmodified npm release of @rbayuokt/expo-adaptive-status-bar. No library patch is applied.

## Cause

With a `tintColor`, the glass contains `CASDFLayer`s. The `layer` capture method draws leaf layers with `CALayer.render(in:)`, and for a `CASDFLayer` that call fills the whole 96×8 sample bitmap with black, even though the glass is nowhere near the strip. Every sample after that reads black.

`evidence/` has a recording before and after the fix, as mp4 and gif.

A fix that skips `CASDFLayer`s during capture is on [dawid-bytys/expo-adaptive-status-bar@fix/ios-liquid-glass-black-sample](https://github.com/dawid-bytys/expo-adaptive-status-bar/tree/fix/ios-liquid-glass-black-sample).

## Environment

Reproduced on iPhone 17 simulator, iOS 26.5:

- Expo 58.0.19 / React Native 0.88.0
- @rbayuokt/expo-adaptive-status-bar 0.1.1
- expo-glass-effect 58.0.5

Also seen in a production app on Expo SDK 57 / React Native 0.86.3, on an iPhone 13 Pro with iOS 27.0.

## Checks

```sh
npm run typecheck
npm run lint
npx prettier --check .
```
