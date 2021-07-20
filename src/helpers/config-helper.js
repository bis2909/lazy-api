const fs = require('fs');

const getConfig = () => {
  const customConfigs = getCustomConfig();

  return {
    migrationPath: customConfigs.migrationPath || 'migrations',
    modelPath: customConfigs.modelPath || 'models',
    controllersPath: customConfigs.controllersPath || 'controllers',
    servicesPath: customConfigs.servicesPath || 'services',
    routesPath: customConfigs.routesPath || 'routes'
  };
};

const getCustomConfig = () => {
  try {
    let rawdata = fs.readFileSync('./lazy-api/config.json');
    return JSON.parse(rawdata);
  } catch (error) {
    console.log('error: ', error);
    return {};
  };
};

module.exports = {
  getConfig
};
