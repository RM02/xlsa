/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_v1_URL: 'http://ec2-18-216-191-86.us-east-2.compute.amazonaws.com:8000',
        API_v2_URL: 'http://ec2-3-145-34-160.us-east-2.compute.amazonaws.com:8000',
        API_v3_URL: 'http://ec2-18-116-199-245.us-east-2.compute.amazonaws.com:8000',
        API_v4_URL: 'http://ec2-18-218-93-239.us-east-2.compute.amazonaws.com:8000'
    },
}

module.exports = nextConfig
