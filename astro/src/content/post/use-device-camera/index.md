---
title: 'use-device-camera'
tags: ["reactjs"]
author: Joseph
category: 'AI & Machine Learning'
publishDate: 2025-12-29 03:58:05
image: 'banner.png'
---


在用了Javascript串webcam一年之後，我做了這個[`use-device-camera`](https://www.npmjs.com/package/use-device-camera?activeTab=readme)的react npm package。

<!-- more -->

### 前情提要


如果你web要使用camera，一定脫離不了一直去找下面這些網站：
1. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
2. [WebRTC](https://webrtc.github.io/samples/)
3. [web.dev](https://web.dev/articles/camera-pan-tilt-zoom?hl=zh-tw#mediastream_api)

然後再翻過各個npm package、github repo，或者問過各大AI Agent後，最後拼出你要的功能。

這一年來，大大小小針對webcam的需求不斷，要開閃光、要縮放、要錄影拍照還要轉檔，一直圍繞在[getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)裡面打轉，每次都覺得為什麼功能總是四散在google的各個角落，近日終於忍不住把所有可能有支援的、會用到的需求，集結在這package的demo裡。透過這個demo，可以快速針對裝置constraints是否支援、支援程度如何，去做一個檢視；有需要也可以extend自己的controls component，去看看那些新的或是特殊的規格他們的實際效果是怎麼樣。


### CameraProvider
先安裝再說！
> npm install use-device-camera

當我們最開始接觸`getUserMedia`的時候，你會發現每次`navigator.mediaDevices.getUserMedia`在mobile端都會跳一次`請求權限`的popup，很不適合在連續拍照的情境裡。
`use-device-camera` 包出了一個`CameraProvider`，讓我們只要request 1次permission，後續就可以一直使用camera。

```jsx
import { CameraProvider } from 'use-device-camera';

function App() {
  return (
    <CameraProvider
      initOnMount={true}
      defaultConstraints={{ video: true, audio: false }}
      onPermissionError={(err) => console.error('Permission failed:', err)}
    >
      <MyCameraComponent />
    </CameraProvider>
  );
}

```

有了`CameraProvider`包著整個scope，就可以接著使用裡面的`useCamera`, `useMediaTrack`, 跟 `useImageCapture`。

```jsx
import { useCamera, useMediaTrack, useImageCapture } from 'use-device-camera';

```

### useCamera
這是針對CameraProvider value包出來的context hooks，讀取一些stream 跟 devices的資訊。

| Property/Function | Type/Return Type |
| :--- | :--- |
| `stream` | `MediaStream \| null` |
| `devices` | `MediaDeviceInfo[]` |
| `requestPermission(constraints?)` | `Promise<MediaStream \| null>` |
| `loadDevices()` | `Promise<MediaDeviceInfo[]>` |
| `cameraPermissionState` | `PermissionState` |
| `audioPermissionState` | `PermissionState` |

### useMediaTrack
這是針對VideoTrack衍伸出來的custom hook，可以操作一些 `MediaStreamTrack` 相關的功能。常用的有applyConstraints、讀取設定值settings跟參數capabilities。
| Property/Function | Type/Return Type |
| :--- | :--- |
| `trackManager` | `MediaStreamTrack \| undefined` |
| `applyConstraints(constraints)` | `Promise<void>` |
| `settings` | `MediaTrackSettings` |
| `capabilities` | `MediaTrackCapabilities` |

### useImageCapture
這是針對ImageCapture衍伸出來的custom hook，可以操作`ImageCapture`的拍照功能。最經典的就是使用閃光燈拍照（不是開手電筒），但目前測試只有iphone有支援，android就無法使用。
| Property/Function | Type/Return Type |
| :--- | :--- |
| `imageCaptureManager` | `ImageCapture \| undefined` |
| `takePhoto(settings?)` | `Promise<Blob \| null>` |
| `photoSettings` | `PhotoSettings` |
| `photoCapabilities` | `PhotoCapabilities` |


### Conclusion
> Demo: https://josephmg.github.io/use-device-camera/

> npm: https://www.npmjs.com/package/use-device-camera

> github: https://github.com/josephMG/use-device-camera

手機、電腦都可以跑看看，也可以用不同廠牌的手機執行，就可以控制、觀察每個裝置對camera的支援程度了。
這也終於有機會做個自己的npm package，從規劃、設計demo、部署、發佈，開了一個自己的open source，真的滿新鮮的。


-- English

I've been working with JavaScript to integrate webcams for over a year. Finally, I've created my `use-device-camera` npm package.

When you start using a camera on your web application, you might consult AI agents or explore various npm packages and GitHub repositories. In the process, you'll likely find yourself browsing tutorials like these:
1. [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
2. [WebRTC](https://webrtc.github.io/samples/)
3. [web.dev](https://web.dev/articles/camera-pan-tilt-zoom?hl=zh-tw#mediastream_api)

Over the past year, I've developed features such as zoom-in/zoom-out, activating the camera torch, and recording video or taking photos. I always wondered why these examples weren't consolidated, and why it was so difficult to quickly test different constraints across various devices. This led to the creation of `use-device-camera` and [its demo](https://josephmg.github.io/use-device-camera/)!

Now, let me introduce this [npm package](https://www.npmjs.com/package/use-device-camera).

#### Installation

The permission popup appears on mobile every time `navigator.mediaDevices.getUserMedia` is invoked. To avoid this, simply install `use-device-camera` and wrap your application's camera-related flow within `CameraProvider`; you'll then be able to use camera resources smoothly after requesting permission once.

> npm install use-device-camera


```jsx
import { CameraProvider } from 'use-device-camera';

function App() {
  return (
    <CameraProvider
      initOnMount={true}
      defaultConstraints={{ video: true, audio: false }}
      onPermissionError={(err) => console.error('Permission failed:', err)}
    >
      <MyCameraComponent />
    </CameraProvider>
  );
}
```

Now, you can access `useCamera`, `useMediaTrack`, and `useImageCapture` directly inside `MyCameraComponent`.

#### useCamera
`import { useCamera } from 'use-device-camera';`

This hook accesses `CameraContext` values such as `stream` and `devices` information.

| Property/Function | Type/Return Type |
| :--- | :--- |
| `stream` | `MediaStream \| null` |
| `devices` | `MediaDeviceInfo[]` |
| `requestPermission(constraints?)` | `Promise<MediaStream \| null>` |
| `loadDevices()` | `Promise<MediaDeviceInfo[]>` |
| `cameraPermissionState` | `PermissionState` |
| `audioPermissionState` | `PermissionState` |

#### useMediaTrack
You can use this hook to apply constraints (`applyConstraints`) and retrieve settings and capabilities by manipulating the `MediaStreamTrack trackManager`.
| Property/Function | Type/Return Type |
| :--- | :--- |
| `trackManager` | `MediaStreamTrack \| undefined` |
| `applyConstraints(constraints)` | `Promise<void>` |
| `settings` | `MediaTrackSettings` |
| `capabilities` | `MediaTrackCapabilities` |

#### useImageCapture
If you need to take photos with flash or capture frames, you should consider using `ImageCapture` via this hook.
| Property/Function | Type/Return Type |
| :--- | :--- |
| `imageCaptureManager` | `ImageCapture \| undefined` |
| `takePhoto(settings?)` | `Promise<Blob \| null>` |
| `photoSettings` | `PhotoSettings` |
| `photoCapabilities` | `PhotoCapabilities` |



#### Demo
> Demo: https://josephmg.github.io/use-device-camera/

> npm: https://www.npmjs.com/package/use-device-camera

> github: https://github.com/josephMG/use-device-camera

Simply run this demo on your browser and mobile device. Furthermore, you can refer to the [demo source code](https://github.com/josephMG/use-device-camera/tree/main/demo/src/components/controls) to extend the control components as needed.
