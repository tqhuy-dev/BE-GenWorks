const Constant = require('../constant/constant');

module.exports = function(...args) {
    this.code = args[0];
    this.message = args[1];
    this.version = Constant.VERSION;
    this.data = args[2];
};