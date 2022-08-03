const {format, createLogger} = require('winston');
const fs = require('fs');
const dir = './logfiles';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const logger = createLogger({
    transports:[
        new(require('winston-daily-rotate-file'))({
            level:'info',
            filename:dir+'/'+'%DATE%-info.log',
            format:format.combine(format.timestamp(), format.json()),
            datePattern: 'DD-MM-YYYY',
            })
    ]
});

module.exports ={logger}

