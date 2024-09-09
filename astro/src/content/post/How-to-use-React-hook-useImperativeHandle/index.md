---
title: How to use React hook - useImperativeHandle
tags: ["Reactjs", "Typescript"]
author: Joseph
photos: ["banner.png"]
categories:
  - Joseph
  - Fullstack
date: 2023-03-14 17:02:41
---

Today, We're going to introduce the way to use a great and useful React hook - useImperativeHandle. Have you ever think what is meaning of **Imperative**?
> [Imperative](https://www.collinsdictionary.com/dictionary/english/imperative)
> In grammar, a clause that is in the imperative, or in the imperative mood, contains the base form of a verb and usually has no subject. Examples are ' Go away' and ' Please be careful'. Clauses of this kind are typically used to tell someone to do something.

So we can just think `useImperativeHandle` is **Let `ref` access the handle.** Go back to [useImperativeHandle](https://beta.reactjs.org/reference/react/useImperativeHandle) definition:
> useImperativeHandle is a React Hook that lets you customize the handle exposed as a **ref**.

Right? Okay, before starting it, we have to recap how we do if we don't use it.

<!-- more -->

### Set it to parent's state

```typescript
import { Dispatch, useEffect, useState } from "react";

type HandlerType = {
  val: string;
  action: (str: string) => void;
};

function Input({ setHandler }: { setHandler: Dispatch<HandlerType> }) {
  const [text, setText] = useState("");

  useEffect(() => {
    setHandler({ 
      val: text, 
      action: (str: string) => setText(str)
     });
  }, [text, setHandler]);
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
}

function Demo(): JSX.Element {
  const [inputHandle, setInputHandle] = useState<HandlerType>();
  return (
    <>
      <Input setHandler={setInputHandle} />
      <div>
        <button onClick={() => inputHandle?.action("Changed by Demo")}>
  I don't like {inputHandle?.val}! Change it!
        </button>
      </div>
    </>
  );
}

```

You can replace `inputHandle useState` in parent component `Demo` by reducer, context, or state management library. In my opinion, in child component `Input`, all we have to do is set something which is used in `Input` so that `Demo` access it.

### Rewrite action by ref

```typescript
import { useEffect, useState, useRef, forwardRef, Dispatch } from "react";

type HandlerType = {
  action: (str: string) => void;
};

const Input = forwardRef<HandlerType, { setVal: Dispatch<string>}>(({setVal}, ref) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (ref) {
      ref.current.action = (str: string) => setText(str)
    }
  }, [])
  useEffect(() => {
    setVal(text)
  }, [text])
  return (
    <input value={text} onChange={(e) => setText(e.target.value)} />
  );
});

function Demo(): JSX.Element {
  const ref = useRef<HandlerType>({action: () => {} });
  const [val, setVal] = useState('')

  return (
    <>
      <Input ref={ref} setVal={setVal} />
      <div>
        <button onClick={() => {
          ref?.current.action("Changed by Demo")
        }}>
          I don't like {val}! Change it!
        </button>
      </div>
    </>
  );
}

```

Now, because `ref` won't re-render, so we use `ref` to handle **action**, and `[val, setVal]` to get text from `Input`. 
Could we use `ref` to do everything? Sure, just use `useImperativeHandle`.

### useImperativeHandle

```typescript
import { useState, useRef, forwardRef, useImperativeHandle } from "react";

type HandlerType = {
  val: string;
  action: (str: string) => void;
};

const Input = forwardRef<HandlerType, unknown>((_props, ref) => {
  const [text, setText] = useState("");
  useImperativeHandle(
    ref,
    () => {
      return {
        val: text,
        action: (str: string) => setText(str)
      };
    },
    [text]
  );

  return <input value={text} onChange={(e) => setText(e.target.value)} />;
});

function Demo(): JSX.Element {
  const ref = useRef<HandlerType>({ val: "", action: () => {} });
  return (
    <>
      <Input ref={ref} />
      <div>
        <button
          onClick={() => {
            ref?.current.action("Changed by Demo");
          }}
        >
          Change it!
        </button>
        <button onClick={() => alert(ref?.current.val)}>alert value</button>
      </div>
    </>
  );
}
```

You may notice that we don't render `${ref?.current.val}`, because `ref` won't trigger re-render too. If you want to re-render parent component, `ref` may not suit for you. In this example, we use a button to `alert` the value, that is, you can get `ref?.current.val` in your handler or function. It's so easy to access child component handler, isn't it?

### Conclusion

You can find these examples on [CodeSandbox](https://codesandbox.io/s/xenodochial-saha-bm4gqb). Although `useImperativeHandle` is a useful feature, it is not commonly used. If you have an existing child component that is called by multiple parent components and you want to move some handlers into the parents, then you might consider using `useImperativeHandle`. However, if all of your parent components need to move some handlers into the child component, then using a [custom hook](https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks) would be more appropriate.
