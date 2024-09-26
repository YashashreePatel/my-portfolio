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
          0: '#3B3B3B',
          1: '#686868',
          2: '#919191',
          3: '#B7B7B7',
          4: '#ECECEC',
          5: '#FFFFFF',
        },
      },
      backgroundImage: {
        'background-gif': 'url("/images/bg_gif.gif")',
        'background-image': 'url("/images/bg.jpeg")',
        'background-gradient': 'linear-gradient(to bottom right, rgba(245, 242, 254, 0.3), rgba(255, 251, 238, 0.3))',
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
