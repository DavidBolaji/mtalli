// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
const nextConfig = {
  /* config options here */
  images: {
    domains: ["avatar.iran.liara.run", "res.cloudinary.com", "img.freepik.com", "img.clerk.com"], // Add any other domains you need here
    // dangerouslyAllowSVG: true,  // Allow SVG images
    // contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;