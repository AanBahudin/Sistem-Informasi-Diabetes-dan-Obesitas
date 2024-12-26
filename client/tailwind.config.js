/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    // preflight: false
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins' : ['PoppinsRegular', 'sans'],
        'poppinsMedium': ['PoppinsMedium', 'sans']
      },
      colors: {
        'grey': '#181C14',
        'blue': "#51A2FE ",
        'lightGrey': "#E8EAEE"
      },
      fontSize: {
        'small': '12px',
        'medium': '14px',
        'big': '16px',
        'large': '18px'
      },
      width: {
        'fullScreen': '100vw',
        'halfScreen': '500vw'
      },
      height: {
        'fullScreen': '100vh',
        'halfScreen': '50vh'
      }
    },
  },
  plugins: [],
}