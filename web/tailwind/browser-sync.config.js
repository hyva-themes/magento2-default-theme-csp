const path = require('path');

const baseDir = path.resolve(__dirname.substring(0, __dirname.indexOf('/app/design') + '/app' . length));
const proxyUrl = process.env.PROXY_URL || 'http://magento.local/';

module.exports = {
    proxy: proxyUrl,
    files: [
        `${baseDir}/**/*.js`,
        `${baseDir}/**/*.css`,
        `${baseDir}/**/*.xml`,
        `${baseDir}/**/*.phtml`,
    ],
};
