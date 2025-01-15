

const withPwa = require('next-pwa')({
  dest: "public",
  register: true,
  // skipWaiting: true, // Optional: Ensures the new service worker takes control immediately
});

const nextConfig = {
  images: {
    domains: ["avatar.iran.liara.run", "res.cloudinary.com", "img.freepik.com", "img.clerk.com"],
  },
  serverRuntimeConfig: {
    ZOHO_PASSWORD_KEY: process.env.ZOHO_PASSWORD_KEY,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_ZOHO_KEY: process.env.NEXT_PUBLIC_ZOHO_KEY,
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    localeDetection: false
  }
  // Add other Next.js config options if needed
};

module.exports = withPwa(nextConfig);