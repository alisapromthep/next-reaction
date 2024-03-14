import type { Config } from "tailwindcss";

const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        NunitoSans: 'Nunito-Sans',
        sans: ['sans-serif']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        transparent: 'transparent',
        grey:{
          light: '#edede9',
          dark: '#292929'
        },
        green:{
          light:'#CBE4C8',
          DEFAULT: '#183A2D',
          dark:'#10472A'
        },
        orange:{
          DEFAULT:'#E27167'
        },
      },
      keyframes:{
        slideLeft:{
          '0%':{
            transform: 'translateX(0)'
          },
          '100%':{
            transform: 'translateX(-100px)'
          }
        }
      },
      animation:{
        'slide-left':'slideLeft 1s cubic-bezier(.25,.46,.45,.94)',
        'slide-right':'slideLeft 1s cubic-bezier(.25,.46,.45,.94) reverse',
      }
    },
  },
  plugins: [],
  corePlugins:{
    fontFamily: true,
  }
};
export default config;
