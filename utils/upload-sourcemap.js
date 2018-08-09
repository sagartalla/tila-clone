console.log('Uploading sourcemaps!')
var request = require('request')
var buildManifest = require('.next/build-manifest.json');
var filepath = './dist/app.min.js.map'
var formData = {
  sourcemap: fs.createReadStream(filepath),
  service_version: require("./package.json").version, // Or use 'git-rev-sync' for git commit hash
  bundle_filepath: 'http://localhost/app.min.js',
  service_name: 'service-name'
}
request.post({url: 'http://localhost:8200/v1/client-side/sourcemaps',formData: formData}, function (err, resp, body) {
  if (err) {
    console.log('Error while uploading sourcemaps!', err)
  } else {
    console.log('Sourcemaps uploaded!')
  }
})
