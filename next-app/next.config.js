/** @type {import('next').NextConfig} */
const path = require('path')
const clientPath = path.resolve(__dirname);

module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    // config.resolve = {
    //   alias: {
    //     '@': clientPath,
    //     '@scss': path.resolve(clientPath, 'styles'),
    //     '@assets': path.resolve(clientPath, 'assets'),
    //     '@components': path.resolve(clientPath, 'components'),
    //     '@common': path.resolve(clientPath, 'src/common')
    //   }
    // };
    return config
  },
}
