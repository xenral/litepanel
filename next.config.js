/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
    },
    async rewrites() {
        return [{
            source: '/storybook/:path*',
            destination: '/api/storybook/:path*',
        }, ];
    },
};

module.exports = nextConfig;