/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins' : ['PoppinsRegular', 'sans']
      },
      colors: {
        'grey': '#181C14',
        'blue': "#51A2FE ",
        'lightGrey': "#E8EAEE"
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