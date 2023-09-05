/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_v1_URL: 'http://www.sabienal.com:5000',
        API_v2_URL: 'http://www.sabienal.com:5001',
        API_v3_URL: 'http://www.sabienal.com:5002',
    },
}

module.exports = nextConfig
