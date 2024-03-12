import type { Config } from 'tailwindcss';
import { colorVarsPlugin } from './src/plugins/colorVarsPlugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: '#282A40',
          1: '#404465',
          2: '#858FC0',
          3: '#C1CAF6',
          4: '#E6EAF3',
        },
        secondary: {
          1: '#686868',
          2: '#919191',
          3: '#919191',
          4: '#B7B7B7',
          5: '#ECECEC',
        }
      },
      backgroundImage: {
        'background-image': 'url("/images/bg.jpeg")',
        'cursor-gradient': 'radial-gradient(circle, rgb(193, 202, 246, 0.5) 0%, rgba(0, 0, 0, 0) 50%)',
      },
    },
  },
  plugins: [
    colorVarsPlugin,
  ],
};
export default config;
