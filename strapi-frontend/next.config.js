const withTs = require('@zeit/next-typescript')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const { ANALYZE } = process.env
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = withTs(withSass(withBundleAnalyzer({
  analyzeServer: ['server', 'all'].includes(ANALYZE),
  analyzeBrowser: ['browser', 'all'].includes(ANALYZE),
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  }
})))