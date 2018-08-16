console.log('Uploading sourcemaps!')
var fs = require('fs');
var FormData = require('form-data');
var axios = require('axios')
var buildManifest = require('../.next/build-manifest.json');
const git = require('git-rev-sync');
var _ = require('lodash');
var apmConfig = require('../apm.config');

var basePath = {
  client: '.next/',
  server: '.next/server'
};

_.map([buildManifest['bundles/pages/_error.js']], function(val, key) {
  debugger;
  if(val && val[0]) {
    console.log('uploading ' + val[0]);
    var filepath = basePath.client + val[0] + '.map';
    var formData = new FormData();
    formData.append('sourcemap', fs.createReadStream(filepath));
    formData.append('service_version', git.short());
    formData.append('bundle_filepath', val[0].replace('bundles', '_next/' + git.short()));
    formData.append('service_name', apmConfig.serviceName);
    // var formData = {
    //   sourcemap: fs.createReadStream(filepath),
    //   service_version: git.short(),
    //   bundle_filepath: val[0].replace('bundles', '_next/' + git.short()),
    //   service_name: apmConfig.serviceName,
    // }
    axios.post(apmConfig.serverUrl + '/v1/client-side/sourcemaps', formData, { headers: { 'Content-Type': 'multipart/form-data; boundary=node-boundary' }}).then(function (res) {
      console.log('then ', res)
    }).catch(function(e) {
      console.log('catch ', e)
    });
  }
});

//bundles/pages/search.js

//http://localhost:3000/_next/e9159f7/page/search.js
