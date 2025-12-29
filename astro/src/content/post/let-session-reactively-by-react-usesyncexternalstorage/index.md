---
title: 讓sessionStorge結合useSyncExternalStore，一更新其他components都知道
tags: ['reactjs', 'nextjs']
author: Joseph
category: frontend
publishDate: 2025-06-19 08:00:14
image: 'banner.png'
---

前一陣子遇到一個問題，一直在嘗試如何讓sessionStorage / localStorage / cookie有變動時，react遙遠的其他元件也可以知道其變化。
於是乎就找到了一個[codeSandbox](https://codesandbox.io/p/sandbox/reactive-cookie-store-0g67ps)，其原理就是透過 `useSyncExternalStore` 去通知有subscribe的元件，讓他們知道sessionStorage / localStorage / cookie key-value有變動，

<!-- more -->

<!-- toc -->

### sessionStore

原先[codeSandbox](https://codesandbox.io/p/sandbox/reactive-cookie-store-0g67ps)的寫法裡，會發現subscribe會add到不屬於同個itemName的listener，導致notify forEach的次數增加。雖然最終會因為useSyncExternalStore裡`checkIfSnapshotChanged`沒變，讓實際update到的元件維持在被改變sessionStorage key-value pairs的元件。不過讓forEach少跑一點也不是件壞事。

這邊稍微改一下讓cache可以跟sessionStorage一樣的key-value pairs，同時讓subscribe需要通知的listeners只有key對應到的useSyncExternalStore。做法就是先讓sessionStore改為`higher-order function`，讓第一階(first-order)有個cache，其儲存的內容與sessionStorage get, set, and remove 一致，然後回傳higher-order sessionStore，讓他們各自有各自的listeners。最後要export出來的其實是 `const store = sessionStore();`，這樣就完成第一部的改寫了。

> 可以觀察notify裡listeners.size的數量

`reactiveSessionStorage/sessionStore.ts`

```typescript
type Listener = () => void;

// higher-order function
const sessionStore = () => {
  // First-order scoped, create cache when sessionStore initialized
  const cache = new Map<string, any>();

  return () => {
    // Higher-order scoped, each store has a listeners
    const listeners = new Set<Listener>();
    const subscribe = (listener: Listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    };

    const notify = () => listeners.forEach((l) => l());

    const get = <T>(itemName: string) => {
      const value = cache.get(itemName);
      if (value) return value;
      const sessionValue = sessionStorage.getItem(itemName);
      if (!sessionValue) return undefined;

      const cachedValue = JSON.parse(sessionValue) as T;
      cache.set(itemName, cachedValue);
      return cachedValue;
    };

    const update = <T>(itemName: string, v: T) => {
      cache.set(itemName, v);
      sessionStorage.setItem(itemName, JSON.stringify(v));
      notify();
    };

    const remove = (itemName: string) => {
      cache.delete(itemName);
      sessionStorage.removeItem(itemName);
      notify();
    };

    return {
      subscribe,
      get,
      update,
      remove,
    };
  };
};

// export this store
const store = sessionStore();

export type SessionStoreType = ReturnType<typeof store>;
export default store;
```

### Singleton class

再做個`higher-order function`去create storage讓storeMap在first-order function內，然後return `(itemName: string) => SessionStoreType`形式的function。

> 這邊也可以改寫成Singleton class + getStore function，讓我們不必重複建立sessionStore，後面也可以直接呼叫singleton `getStore`來操作先前建立過的`sessionStore`的get, set, update function

`reactiveSessionStorage/createReactiveSessionStorage.ts`

```typescript
import sessionStore from './sessionStore';
import type { SessionStoreType } from './sessionStore';

const createReactiveSessionStorage = () => {
  const storeMap: Map<string, SessionStoreType> = new Map();
  return (itemName: string) => {
    if (storeMap.get(itemName)) return storeMap.get(itemName);
    storeMap.set(itemName, getSessionStore());
    return storeMap.get(itemName);
  };
};

export const getStorage = createReactiveSessionStorage();
```

### custom hooks: useReactiveSessionStorage, useSessionActions

最後，把他們跟useSyncExternalStore綁在一起，變成一個custom hook，

- useReactiveSessionStorage訂閱useSyncExternalStore，同時return value, update function, remove function
- useSessionActions，很純粹的操作 `getStorage(itemName)`，不依賴useSyncExternalStore

`reactiveSessionStorage/useReactiveSessionStorage.ts`

```typescript
'use client';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

import type { SessionStoreType } from './sessionStore';
import { getStorage } from './createReactiveSessionStorage';

const useReactiveSessionStorage = <T>(itemName: string) => {
  const storeRef = useRef<SessionStoreType>(getStorage(itemName));

  const [selector, update, remove] = useMemo(
    () => [
      // selector
      (): T => storeRef.current?.get<T>(itemName),
      // update
      (v: T) => storeRef.current?.update<T>(itemName, v),
      // remove
      () => storeRef.current?.remove(itemName),
    ],
    [itemName]
  );

  const value = useSyncExternalStore(storeRef.current.subscribe, selector, selector);
  return [value, update, remove] as const;
};

export const useSessionActions = <T>(itemName: string) => {
  const actions = useMemo(
    () => [
      // update
      (v: T) => getStorage(itemName).update<T>(itemName, v),
      // remove
      () => getStorage(itemName).remove(itemName),
    ],
    [itemName]
  );

  return actions;
};

export default useReactiveSessionStorage;
```

這樣一個設計就可以讓sessionStorage有變動的時候也update使用`useReactiveSessionStorage` custom hook的元件。

> 那再來看看chatGPT怎麼說: https://chatgpt.com/s/t_6854dd517540819187228164a5ebe8ef

> 然後看看perplexity怎麼說: https://www.perplexity.ai/search/how-to-use-session-with-usesyn-hUmoT5lMQIeDIAz31ysNpQ#0

AI的方法比較傾向使用window event listerner，Perplexity又相對簡潔，更換storage只要換eventListener就好。而我的做法是換storage higher-order function。除了這些方法外，zustand state management套件也有[Persisting store](https://zustand.docs.pmnd.rs/integrations/persisting-store-data#simple-example)可以用，三種寫法各有利弊，再讓需要的人看看。

### References

1. reactive-cookie-store: https://codesandbox.io/p/sandbox/reactive-cookie-store-0g67ps
2. Zustand: https://zustand.docs.pmnd.rs/integrations/persisting-store-data#simple-example
