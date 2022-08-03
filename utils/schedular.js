const nodecron = require('node-cron')
const fs = require('fs').promises
const path = require('path')
const logger = require('../utils/logger_config')
const app = require('../app')
const dir = './logfiles'


// function isDirEmpty(dirname) {
//     return fs.promises.readdir(dirname).then(files => {
//         return files.length;
//     });
// }

 async function isDirEmpty(dirname) {
     try{
        return await fs.readdir(dirname)
     }catch(error){console.log('error=>', error)}
    
}

module.exports = ()=>{
    nodecron.schedule('*/5 * * * * *',()=>{
        const filecount =  isDirEmpty(dir).then(res => res);
        //console.log('---------------------', isDirEmpty(dir).then(res => { console.log(res)
        //}));
        const filePath = path.join(__dirname.split('\\').slice(0,-1).join('\\'),'logfiles')
        console.log('---------------------', filePath)
        
        // isDirEmpty(dir).then(res => { 
        //     if(res > 0){
        //         fs.unlinkSync('./logfiles/27-07-2022-info.log', err => {
        //             if (err) throw err;
        //         });
        //     }else {
        //         console.log('dir empty!');
        //     }
        // });
    })
}