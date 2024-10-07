/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',            // 루트 디렉터리의 HTML 파일
    './src/**/*.{js,jsx,ts,tsx}' // src 디렉터리 내의 모든 JS, JSX, TS, TSX 파일
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
