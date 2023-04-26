/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        dangerouslyAllowSVG: true,
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
    //       source: '/',
    //       destination: '/beta',
    //       permanent: false
    //     }
    //   ]
    // }
};

module.exports = nextConfig;
