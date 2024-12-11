import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blueFade : "#052742",
        bluePrimary : "#032038",
        blueSec : "#1DCAD3",
        normalText : "rgba(29, 29, 29, 0.8)",
        secText : "rgba(16, 16, 16, 0.4)",
      },
      fontFamily: {
        poppinsRegular : ['var(--font-poppins-regular)'],
        poppinsMedium : ['var(--font-poppins-medium)'],
        poppinsSemiBold : ['var(--font-poppins-semi-bold)'],
        poppinsBold : ['var(--font-poppins-bold)'],
      },
      keyframes: {
        moveUpAndFade: {
          '0%': { transform: 'translateY(0vh)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh)', opacity: '0' },
        },
        moveUpAndShow: {
          '0%': { transform: 'translateY(100vh)', opacity: '0' },
          '100%': { transform: 'translateY(0vh)', opacity: '1', zIndex: '20' },
        },
        shakeHome : {
          '0%' : {transform: 'rotate(0deg) translateY(0px)'},
          '50%' : {transform: 'rotate(2deg) translateY(1px)'},
          '100%' : {transform: 'rotate(0deg) translateY(0px)'},
        },
        upDownHome : {
          '0%' : {transform: ' translateY(0px)'},
          '50%' : {transform: ' translateY(6px)'},
          '100%' : {transform: ' translateY(0px)'},
        },
        animateNavDown : {
          '0%': { top: '-100%', opacity: '0' },
          '100%': { top: '0%', opacity: '1' },
        },
        moveUpAndShowDashboard: {
          '0%': { transform: 'translateY(0vh)', opacity: '0' },
          '100%': { transform: 'translateY(-100vh)', opacity: '1', zIndex: '20' },
        },
      },
      animation: {
        moveUpAndFade: 'moveUpAndFade 1.2s cubic-bezier(0.64, 0, 0.78, 0) forwards',
        moveUpAndShow: 'moveUpAndShow 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        shakeHome : 'shakeHome 2.5s linear forwards infinite',
        upDownHome : 'upDownHome 2.5s linear forwards infinite',
        animateNavDown : 'animateNavDown 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        moveUpAndShowDashboard: 'moveUpAndShowDashboard 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
