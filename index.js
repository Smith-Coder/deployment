var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var ejs = require("ejs");
const path=require('path');


app.use(express.static(path.join(__dirname,'static')));
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//create a webserve rds 

const port = 3000;

var connection = mysql.createConnection({
    host: 'covid19.cwxdtmdsfnni.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'adminroot',
    database: 'covid19'
  })

  connection.connect(function(err){
    if(!err)
    console.log("database connected");
    else
    console.log("database not connected");
  })

//   sql1="desc Covid_details"
//   sql3="select * from Covid_details ORDER BY State_Name ASC"
//   sql2="insert into Covid_details values('karnataka','2022-11-30',500,10,100,400,100)";
//   sql4="delete from Covid_details"
//   sql5="ALTER TABLE Covid_details ADD PRIMARY KEY (State_Name)";
//   sql6="ALTER TABLE Covid_details DROP PRIMARY KEY;"
//   connection.query(sql3,function(err,res1){
//     console.log(res1[0].State_Name)
//     console.log(res1.length)
//       })

  app.get('/',(req,res)=>{
    sql1="select * from Covid_details ORDER BY State_Name ASC";
    connection.query(sql1,function(err,res1){
        res.render('index',{res1})
        console.log(res1)
          })
   })

   app.get('/add',(req,res)=>{
    res.render('form')
   })

   app.post('/insert',(req,res)=>{
    var data=req.body;
    // console.log(data)
    sql2=`insert into Covid_details values('${data.State_Name}','${data.Date_of_Record}',${data.No_of_Samples},${data.No_of_Deaths},${data.No_of_Positive},${data.No_of_Negative},${data.No_of_Discharge})`;
    sql1="select * from Covid_details ORDER BY State_Name ASC";
    connection.query(sql2,function(err){
            if (err) throw err
            connection.query(sql1,function(err,res1){
                res.render('index',{res1})
                  })
          })
   })

   app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })