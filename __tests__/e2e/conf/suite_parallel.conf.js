require('dotenv').config()

nightwatch_config = {
  src_folders: ["__tests__/e2e/tests"],

  custom_commands_path: "./__tests__/e2e/extensions",

  selenium: {
    "start_process": false,
    "host": "hub-cloud.browserstack.com",
    "port": 443
  },

  common_capabilities: {
    'build': 'Web - Stage - parallel',
    'project': 'podverse-web',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    'browserstack.debug': true
  },

  test_settings: {
    default: {},
    chrome: {
      desiredCapabilities: {
        browser: "chrome"
      }
    },
    firefox: {
      desiredCapabilities: {
        browser: "firefox"
      }
    },
    ie: {
      desiredCapabilities: {
        browser: "internet explorer"
      }
    }
  },

  // "test_workers": {
  //   "enabled": true,
  //   "workers": 10
  // }
};

for (var i in nightwatch_config.test_settings) {
  var config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for (var j in nightwatch_config.common_capabilities) {
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;
