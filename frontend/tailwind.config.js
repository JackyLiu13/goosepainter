/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'stone-texture': "url('https://example.com/stone-texture.png')", // Replace with actual stone texture
        'vine-image': "url('https://example.com/vine-image.png')", // Replace with actual vine image
      },
      keyframes: {
        sway: {
          '0%': { transform: 'translateX(-50%) rotate(0deg)' },
          '50%': { transform: 'translateX(-50%) rotate(5deg)' },
          '100%': { transform: 'translateX(-50%) rotate(0deg)' },
        },
      },
      animation: {
        sway: 'sway 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
