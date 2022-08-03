const {logger} = require('../utils/logger_config')
module.exports.sendRsp = async (res, statusCode, msg, output) => {
    var api = {};
    api.statusCode = statusCode;
    api.messaage = msg;
    logger.info({ api, response: output })
    res.status(statusCode).json({ api, response: output });
}