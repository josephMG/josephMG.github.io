import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
      },
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false,
            'code::before': {
              content: 'none', // don’t generate the pseudo-element
              //                content: '""', // this is an alternative: generate pseudo element using an empty string
            },
            'code::after': {
              content: 'none',
            },
            code: {
              color: theme('colors.red.500'),
              // color: theme('colors.slate.500'),
              backgroundColor: theme('colors.stone.100'),
              borderRadius: theme('borderRadius.DEFAULT'),
              paddingLeft: theme('spacing[1.5]'),
              paddingRight: theme('spacing[1.5]'),
              paddingTop: theme('spacing.1'),
              paddingBottom: theme('spacing.1'),
            },
          },
        },
        // add a "dark" variant
        invert: {
          css: {
            code: {
              color: theme('colors.red.300'),
              backgroundColor: theme('colors.slate.700'),
            },
          },
        },
        'no-quotes': {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
          },
        },
      }),
    },

    animation: {
      fade: 'fadeInUp 1s both',
    },

    keyframes: {
      fadeInUp: {
        '0%': { opacity: 0, transform: 'translateY(2rem)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
};
