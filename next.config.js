/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
        domains: ["lh3.googleusercontent.com", "platform-lookaside.fbsbx.com"], // Google && Facebook
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    // async redirects() {
    //   return [
    //     {
    //       source: '/try',
    //       destination: 'https://beta.vylyn.com',
    //       permanent: false
    //     }
    //   ]
    // }
};

module.exports = nextConfig;
