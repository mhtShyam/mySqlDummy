const { serverIp, isFileReqResLogEnabled, serverURL } = require('../../bin/config');
const { winstonLogger, winstonReqLogger } = require('./winston-logger');

class ErrorLogger {

    async MaskRequestId(req_id) {
        if (req_id && !isNaN(req_id) && String(req_id).trim().length == 10) {
            req_id = String(req_id).substring(0, 1) + "xxxx" + String(req_id).substring(5, 10);
        }
        return req_id;
    }

    async logApi(req) {
        try {
            let isReqLogEnabled = isFileReqResLogEnabled ? isFileReqResLogEnabled : false;

            let duration = 0;
            req.start_time = (req.start_time) ? req.start_time : new Date().toISOString();
            req.end_time = (req.end_time) ? req.end_time : new Date().toISOString();
            if (req.start_time && req.end_time) {
                duration = Date.parse(req.end_time) - Date.parse(req.start_time);
            }
            //let req_id = (req.req_id) ? await this.MaskRequestId(req.req_id) : "";

            if (isReqLogEnabled) {
                let logData = {
                    req_id: req.req_id || "",
                    source: req.app_source || 'CBCI_API',
                    url: req.url || null,
                    name: req.name || null,
                    flag: req.flag || null,
                    type: req.type || null,         //internal / external request 
                    method: req.method || null,
                    start_time: req.start_time || null,
                    end_time: req.end_time || null,
                    duration_ms: duration || 0,
                    status_code: req.status_code || null,
                    server_ip: req.server_ip ? req.server_ip : serverIp,
                    bytes_sent: req.bytes_sent || 0,
                    bytes_received: req.bytes_received || 0,
                    ts: new Date().toISOString(),
                    req_params: req.data || {},
                    res_params: req.res_params || {},
                    user_agent: req.userAgent || null,
                    err: req.err
                };
                if(req.err){
                    winstonLogger.error(logData);
                }else{
                    winstonReqLogger.error(logData);
                }
                return { status : true, message : "api logged successfully", data: apiLog };
            }
            return { status : false, message : "api logging facility is switched off." };

        }catch (err) {
            return { status: false, message: "log failure", data: err.message };
        }
    }

}

module.exports = new ErrorLogger();

/*
    For calling the logApi below params need to pass
    {
        req_id: null,
        app_source: null,
        url: null,
        name: null,
        flag: null,
        type: null,         //internal / external request 
        method: null,
        start_time: null,
        end_time: null,
        duration_ms: null,
        status_code: null,
        server_ip: null,
        bytes_sent: null,
        bytes_received: null,
        data: {},
        res_params: {},
        userAgent: null,
        err: null
    }
*/
