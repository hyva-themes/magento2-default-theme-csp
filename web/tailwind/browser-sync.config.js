const path = require('path');
const url = require('url');

const baseDir = path.resolve(
    __dirname.substring(0, __dirname.indexOf('/app/design') + '/app'.length)
);
const proxy = process.env.PROXY_URL || 'http://magento.local/';
const port = process.env.PORT || 3000;
const { host } = url.parse(proxy);

module.exports = {
    proxy,
    port,
    rewriteRules: [
        {
            match: `.${host}`,
            replace: '',
        },
    ],
    files: [
        `${baseDir}/**/*.js`,
        `${baseDir}/**/*.css`,
        `${baseDir}/**/*.xml`,
        `${baseDir}/**/*.phtml`,
    ],
};
