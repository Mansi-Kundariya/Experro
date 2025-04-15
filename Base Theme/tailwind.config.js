/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'lg:text-lg',
    'lg:text-xl',
    'lg:text-2xl',
    'lg:text-3xl',
    'lg:text-4xl',
    'lg:text-5xl',
    'lg:text-6xl',
    'lg:text-7xl',
    'top-7',
    'py-7',
    'px-2',
    'm-[4px]',
    'flex',
    'justify-center',
    'items-center',
  ],
  theme: {
    screens: {
      xsm: '480px',
      sm: '667px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1630px',
    },
    extend: {
      container: {
        center: true,
        padding: '60px',
      },
      fontFamily: {
        primary: ['"Poppins", sans-serif'],
        secondary: ['"Source Serif 4", serif'],
      },
      fontSize: {
        xs: ['0.75rem', '1rem'], //12px
        sm: ['0.875rem', '1.25rem'], //14px
        base: ['1rem', '1.5rem'], //16px
        lg: ['1.125rem', '1.75rem'], //18px
        xl: ['1.25rem', '1.75rem'], //20px
        '2xl': ['1.5rem', '2rem'], //24px
        '3xl': ['2rem', '2.25rem'], //32px
        '4xl': ['2.5rem', '3.375rem'], //40px
        '5xl': ['3rem', '1'], //48px
        '6xl': ['3.5rem', '1'], //56px
        '7xl': ['4rem', '1'], //64px
      },
      colors: {
        sand: {
          50: '#FCF0E4',
          100: '#F8E1CA',
          200: '#F1D2B1',
          300: '#EAC39B',
          400: '#E0B486',
          500: '#D5A573',
          600: '#C89661',
          700: '#BA8751',
          800: '#A97641',
          900: '#956633',
        },
        gray: {
          50: '#F4F4F4',
          100: '#E8E8E8',
          200: '#D8D8D8',
          300: '#C9C9C9',
          400: '#BABABA',
          500: '#AAAAAA',
          600: '#9B9B9B',
          700: '#8B8B8B',
          800: '#7C7C7C',
          900: '#6C6C6C',
        },
        primary: '#BA8751',
        primaryLight: '#FFEDDB',
        primaryDark: '#9A6935',
        secondary: '#494136',
        danger: '#FF2E3D',
        success: '#1DAB5E',
        warning: '#FFB800',
        trending: '#008AEE',
      },
      backgroundImage: {
        'select-arrow': "url('@icons/arrow-down.svg')",
      },
    },
  },
  plugins: [],
};
