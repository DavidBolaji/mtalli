const withPwa = require('next-pwa')({
  dest: "public",
  register: true,
  // skipWaiting: true, // Optional: Ensures the new service worker takes control immediately
});

const nextConfig = {
  images: {
    domains: ["avatar.iran.liara.run", "res.cloudinary.com", "img.freepik.com", "img.clerk.com"],
  },
  // Add other Next.js config options if needed
};

module.exports = withPwa(nextConfig);