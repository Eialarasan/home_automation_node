// babel.config.js

module.exports = function (api) {
    api.cache(true);
  
    const presets = ["@babel/preset-env"];
    // Add other configurations if needed
  
    return {
      presets,
    };
  };
  