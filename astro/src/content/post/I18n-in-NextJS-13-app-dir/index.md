---
title: I18n in NextJS 13 app dir
tags: ["Next.js"]
author: Joseph
photos: []
categories:
  - Joseph
  - Fullstack
date: 2023-05-21 11:46:07
---

I used to implement I18n with [next-i18next](https://github.com/i18next/next-i18next) in Next.js. However, after upgrading Next.js 13, there is no need for next-i18next. Instead, you can directly use i18next and react-i18next by [this tutorial](https://locize.com/blog/next-13-app-dir-i18n/). Meanwhile, the [official doc](https://nextjs.org/docs/app/building-your-application/routing/internationalization) shows how to use internationalization in app dir. and also provide an example of using [next-intl](https://next-intl-docs.vercel.app/docs/next-13). In this blog, I'll demostrate how to use [next-intl](https://next-intl-docs.vercel.app/docs/next-13) in Next.js 13 app dir.

<!-- more -->

## 1. Settings and middleware

Let's start by looking at my `src/app/i18n` folder structure.

```
src/app/i18n
├── IntlWrapper.tsx      # Imports `NextIntlClientProvider` and reads locale messages
├── locales              # Puts locale files
│   ├── en
│   │   └── common.json
│   └── zh-TW
│       └── common.json
├── settings.ts          # Sets Lang and namespace settings
└── utils.ts             # Implements utility functions
```

So, I have to show `settings.ts` first.

**src/app/i18n/settings.ts**
```typescript
export const locales = ['en', 'zh-TW'];
export const defaultLocale = 'en';

export const ns = [
  'common',
] as const;

export type NsType = (typeof ns)[number];
```

In `settings.ts`, I have set `locales` and `ns` namespaces, which facilitate the easy addition of more locales or page-specific namespaces. Also, I've defined `NsType` as namespaces type and `defaultLocale` as `en` in this file.

Next, the `IntlWrapper` could look like this:

**src/app/i18n/IntlWrapper.tsx**
```typescript
import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { NsType, ns } from '@/app/i18n/settings';
import { getTranslationJson } from '@/app/i18n/utils';

const IntlWrapper = async ({
  children, // will be a page or nested layout
  locale,
  namespaces = [...ns],
}: {
  children: React.ReactNode;
  locale: string;
  namespaces?: NsType[];
}) => {
  let messages;
  try {
    messages = await getTranslationJson(locale, namespaces);
  } catch (error) {
    notFound();
  }
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlWrapper;
```
Nothing special. just import `NextIntlClientProvider` and put `children` into it, and I can import `IntlWrapper` in the `layout.tsx` or `page.tsx` files.
 You may notice the `getTranslationJson` function, which is imported from `utils`. The `utils` could have the following structure:

**src/app/i18n/utils.ts**
```typescript
import { AbstractIntlMessages } from 'next-intl';
import { NsType, ns } from '@/app/i18n/settings';

export const getTranslationJson = async (locale: string, namespaces: NsType[] = [...ns]) => {
  let messages: AbstractIntlMessages = {};
  for (const namespace of namespaces) {
    const message = (await import(`./locales/${locale}/${namespace}.json`)).default;
    messages = { ...messages, [namespace]: message };
  }
  return messages;
};
```

According to `locales`, the `getTranslationJson` works as server side function to import multiple namespaces `json` sequentially.
The json files could look like this:

**src/app/i18n/locales/en/common.json**
```json
{
  "header": {
    "product": "Product",
    "category": "Category",
    "sign_in_sign_up": "Log in",
    "profile": "Profile",
    "lang": {
      "zh-TW": "Chinese",
      "en": "English"
    }
  }
}
```
**src/app/i18n/locales/en/common.json**
```json
{
  "header": {
    "product": "所有商品",
    "category": "類別",
    "sign_in_sign_up": "登入/註冊",
    "profile": "會員資料",
    "lang": {
      "zh-TW": "繁體中文",
      "en": "英文"
    }
  }
}
```



That's all about `i18n` settings. I'll go ahead to `middleware`, 

**src/app/middleware.ts**
```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/settings'; 

export default createMiddleware({
  locales,
  defaultLocale
});
 
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

The `createMiddleware` handles accessing cookies `NEXT_LOCALE`, parsing headers, and redirecting to `NEXT_LOCALE` langs.
Right now, settings and middleware are ready, so let's start looking my app `[locale]` dir!

## 2. `[locale]` dynamic routes

I think `layout.tsx` is more important in Next.js 13 `app` directory structure, and thus I show it first.

**src/app/[locale]/layout.tsx**
```typescript
import IntlWrapper from '@/app/i18n/IntlWrapper';
import { locales } from '@/app/i18n/settings';
import { DefaultLayout as Layout } from '@/components/layouts';
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function MainLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <IntlWrapper locale={params.locale} namespaces={['common']}>
      <Layout>
        <main style={{ minHeight: 'calc(100vh - 70px)', marginTop: '69px' }}>{children}</main>
      </Layout>
    </IntlWrapper>
  );
}
```

The `params` comes from [dynamic routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes). As you see, I pass `params.locale` and `['common']` into `IntlWrapper` props. Thanks for `next-intl`, now I can simply use `useTranslations`.

**src/components/layouts/NavLinks.tsx**
```typescript
const appBarRoutes = [
  { text: '所有商品', href: '/', key: 'product', icon: 'store' },
  { text: '類別', href: '/', key: 'category', icon: 'category' },
  { text: '登入/註冊', href: '/auth/login', key: 'sign_in_sign_up', icon: 'account_circle' },
] as const;

// DesktopLinks is one of the child components of Layout component
export const DesktopLinks = memo(function DesktopLinks() {
  const t = useTranslations('common');
  const links = AppBarRoutes;

  return (
    <>
      {links.map(({ href, key, icon }) => {
        return (
          <>
            <NavButton key={key}>
              <SwitchLink href={href}>
                <Icon className="material-symbols-outlined">{icon}</Icon>
                <div>{t(`header.${key}`)}</div>
              </SwitchLink>
            </NavButton>
            <ColorDivider orientation="vertical" flexItem />
          </>
        );
      })}
    </>
  );
});

```

Lastly, let me describe how I change `locale`. I have a `handleChangeLocale` function, so that I can set cookie in this function and redirect to correct page.

**src/components/layouts/LayoutAppBar.tsx**
```typescript
const pathname = usePathname();
const handleChangeLocale = useCallback(
  (key: string) => () => {
    setCookie(null, 'NEXT_LOCALE', key, { path: '/' });
    const re = new RegExp(`^/${i18n}`, 'g');
    router.push(`/${key}${pathname?.replace(re, '')}`);
  },
  [router, i18n, pathname]
);

/* button example
{Langs.map((setting) => (
  <MenuItem key={setting.key} onClick={handleCloseLangsMenu}>
    <Link component="button" onClick={handleChangeLocale(setting.key)} locale={setting.key}>
      {t(`header.lang.${setting.key as LangType}`)}
    </Link>
  </MenuItem>
))}
*/
```

Click the following video to show the result.

{% video 'video.mov' %}

## Conclusion


I have converted one of my projects to use the Next.js 13 application directory structure and migrated from [next-i18next](https://github.com/i18next/next-i18next) to [next-intl](https://github.com/amannn/next-intl). The [official documentation](https://next-intl-docs.vercel.app/docs/next-13/server-components#using-interactive-state-in-translations) seems to suggest combining all namespaces together, but with my `getTranslationJson` function, I can separate them into multiple namespaces, similar to `next-i18next`.
