/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    output: 'export', //for static site build

    trailingSlash: true, //for static site build

    images: { unoptimized: true }, //for static site build
  
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,       
        use: [
          {
            loader: '@svgr/webpack',
            options: { icon: true },
          },
        ],
      })
      return config
    },
  }
  
  module.exports = nextConfig
  