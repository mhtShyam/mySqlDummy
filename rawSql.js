const express = require('express');
const mysql = require('mysql2')

const app = express();

//DB connection
require('./database/connection')
require('./controllers/controller.user')();

app.listen(3000,()=>{
    console.log('server up on port 3000');
})

// const db = mysql.createConnection({
//     host:"localhost",
//     user:'root',
//     password:'toor',
//     database:"NodeMySql"
// });

// db.connect((err)=>{
//     if(err){
//         console.log('mysql not connected: ',err);
//     }
//     console.log('sql server connected');
// });

// //create db
// app.get('/createdb',(req, res)=>{
//     const sql ="CREATE DATABASE NodeMySql";
//     db.query(sql, (err, result)=>{
//         console.log('result=>', result);
//         res.send('DATABASE created!')
//     })
// });

// //create table
// app.get('/createpoststable', (req, res)=>{
//     const sql = 'CREATE TABLE contact_info(id int AUTO_INCREMENT PRIMARY KEY, address VARCHAR(255), phone_no VARCHAR(255), userId int, CONSTRAINT fk_user_contact FOREIGN KEY (userId) REFERENCES users(id))';
//     //const sql = 'CREATE TABLE posts(id int AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255), userId int, CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id))';
//     //const sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), mail VARCHAR(255), passwd VARCHAR(11), PRIMARY KEY(id))';
//     db.query(sql, (error, result)=>{
//         if(error) throw error;
//         console.log(result);
//         res.send('Table created..')
//     })
// })

// //insert data
// app.get('/addpost1', (req, res)=>{
//     const user = {name:'uspm', mail:'abc@gmail.com', passwd:'123ty'}
//     const post = {title:"post1", body:"this is post1"};
//     const contact = {address:"thane", phone_no:'2344125487'}

//     const sql = "INSERT INTO users SET ?";
//     const sql1 = "INSERT INTO posts SET ?"
//     const sql2  = "INSERT INTO contact_info SET ?"
//     const query = db.query(sql, user,(error, result)=>{
//         if(error) throw error;
//         if(result.affectedRows === 1){
//             post.userId = result.insertId;
//             const query1 = db.query(sql1, post,(error, result)=>{
//                 if(error) throw error;
//                 if(result.affectedRows ==1){
//                     contact.userId = result.insertId;
//                     const query2 = db.query(sql2, contact,(error, result)=>{
//                         if(error) throw error;
//                             console.log(result)
//                     })
//                 }
//             })
//         }
//         console.log(result);
//         res.send('post1 added..')
//     })
// });

// app.get('/addpost2', (req, res)=>{
//     const post = {title:"post2", body:"this is post2"};
//     const sql = "INSERT INTO posts SET ?";
//     const query = db.query(sql, post,(error, result)=>{
//         if(error) throw error;
//         console.log(result);
//         res.send('post2 added..')
//     })
// });

// //get data
// app.get('/getposts',(req, res)=>{
//     //const sql = "SELECT * FROM posts";
//     const sql = "select * from users u join contact_info c on u.id = c.userId join posts p on c.userId =  p.userId"
//     db.query(sql, (error, results)=>{
//         if(error) throw error;
//         console.log(results);
//         res.send('selected records...')
//     })
// });

// //get data by id
// app.get('/getpost/:id',(req, res)=>{
//     //const sql = `SELECT * FROM posts WHERE id=${req.params.id}`;
//     const sql = `select * from users u join contact_info c on ${req.params.id} = c.userId join posts p on ${req.params.id} =  p.userId`
//     db.query(sql, (error, result)=>{
//         if(error) throw error;
//         console.log(result)
//         res.send('post feched..')
//     })
// })


// //update data by id
// app.get('/updatepost/:id',(req, res)=>{
//     const newTitle = "new post with join";
//     //const sql = `UPDATE posts SET title='${newTitle}' WHERE id=${req.params.id}`;
//     const sql = `update users u join posts p on u.id = p.userId join contact_info c on p.userId = c.userId set p.title='new update' where  u.id = ${req.params.id}`
//     db.query(sql, (error, result)=>{
//         if(error) throw error;
//         console.log(result)
//         res.send('post updated..')
//     })
// })

// //delet data by id
// app.get('/deletepost/:id',(req, res)=>{
//     //const sql =`DELETE FROM posts WHERE id=${req.params.id}`;
//     const sql = `DELETE P FROM users u JOIN posts p ON u.id = p.userId JOIN contact_info c ON p.userId = c.userId where u.id = ${req.params.id}`
//     db.query(sql, (error, result)=>{
//         if(error) throw error;
//         console.log(result)
//         res.send('post deleted..')
//     })
// })