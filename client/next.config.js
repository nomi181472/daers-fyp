module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
  images: {
    domains: ["res.cloudinary.com","https://res.cloudinary.com"],
  },
};
