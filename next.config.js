module.exports = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
   
    ]
  },
}
