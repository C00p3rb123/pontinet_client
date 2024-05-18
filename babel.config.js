module.exports = function (api) {
  // Cache the returned value forever and don't call this function again.
  // This is useful to speed up the build process.
  api.cache(true);
  return {
    // Presets are a set of plugins used to transform your code.
    // 'babel-preset-expo' includes the necessary plugins for Expo projects.
    presets: ["babel-preset-expo"],
  };
};
