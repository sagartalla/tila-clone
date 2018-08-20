var React = require('react');
var reactGuard = require('react-guard');
var git = require('git-rev-sync');
var apmConfig = require('../apm.config');

if (process.env.ENV !== 'local') {
  var apm = require('elastic-apm-node').start({
      serviceName: apmConfig.serviceName,
      serverUrl: apmConfig.serverUrl,
      serviceVersion: git.short(),
  });

  reactGuard(React, function (err, componentInfo) {
    apm.captureError(err);
    return 'Failed to render';
  });
}
