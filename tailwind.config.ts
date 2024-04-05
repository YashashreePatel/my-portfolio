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
          0: '#2F2A47',
          1: '#4B4372',
          2: '#7F76A5',
          3: '#CECCDD',
          4: '#F5F2FE',
        },
        secondary: {
          0: '#FFB600',
          1: '#FFCE4D',
          2: '#FFE399',
          3: '#FFFBEE',
        },
        grey: {
          0: '#1A1A1A',
          1: '#4D4D4D',
          2: '#808080',
          3: '#B3B3B3',
          4: '#E6E6E6',
          5: '#FFFFFF',
        },
      },
      backgroundImage: {
        'background-gif': 'url("/images/bg_gif.gif")',
        'background-image': 'url("/images/bg.jpeg")',
        'background-gradient': 'linear-gradient(to bottom right, #F5F2FE, #FFFBEE)',
        'cursor-gradient': 'radial-gradient(circle, rgb(193, 202, 246, 0.3) 0%, rgba(0, 0, 0, 0) 50%)',
      },
      boxShadow: {
        custom: '0 0 40px 5px var(--color-grey-4)',
      },
    },
  },
  plugins: [
    colorVarsPlugin,
  ],
};
export default config;
