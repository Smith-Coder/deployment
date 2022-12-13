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

const port = 3000;


//trishna
// host: 'database-3.covqi8hsiake.us-east-1.rds.amazonaws.com',
//     port: 3306,
//     user: 'sirvi',
//     password: 'sirvi123',
//     database: 'Covid19'

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
  // sql3="select * from Covid_details ORDER BY State_Name ASC"
  // sql2="insert into Covid_details values(0,'karnataka','2022-11-30',500,10,100,400,100)";
//   sql4="delete from Covid_details"
//   sql5="ALTER TABLE Covid_details ADD PRIMARY KEY (State_Name)";
//   sql6="ALTER TABLE Covid_details DROP PRIMARY KEY;"
// sql11="CREATE TABLE Covid_details (ID int(100) AUTO_INCREMENT,State_Name varchar(255),Date_of_Record date, No_of_Samples int, No_of_Deaths int, No_of_Positive int, No_of_Negative int, No_of_Discharge int, PRIMARY KEY (ID))"
  // connection.query(sql3,function(err,res1){
  //   if(err) throw err
  //   console.log(res1)
  //     })

  app.get('/',(req,res)=>{
    sql1="select * from Covid_details ORDER BY State_Name ASC";
    connection.query(sql1,function(err,res1){
        if (err) throw err;
        if(res1.length==0){
          res.render('index',{res1})
        }
        else{
          res.render('index',{res1})
          // console.log(res1) 
        }
          })
   })

   app.get('/add',(req,res)=>{
    res.render('form')
   })

   app.post('/insert',(req,res)=>{
    var data=req.body;
    // console.log(data)
    sql2=`insert into Covid_details values(0,'${data.State_Name}','${data.Date_of_Record}',${data.No_of_Samples},${data.No_of_Deaths},${data.No_of_Positive},${data.No_of_Negative},${data.No_of_Discharge})`;
    sql1="select * from Covid_details ORDER BY State_Name ASC";
    connection.query(sql2,function(err){
            if (err) throw err
            res.redirect("/");
          })
   })

   app.post('/update/change/:id',(req,res)=>{
    const id = req.params.id;
    var data=req.body;
    connection.query(`update Covid_details SET State_Name='${data.State_Name}',Date_of_Record='${data.Date_of_Record}',No_of_Samples=${data.No_of_Samples},No_of_Deaths=${data.No_of_Deaths},No_of_Positive=${data.No_of_Positive},No_of_Negative=${data.No_of_Negative},No_of_Discharge=${data.No_of_Discharge} WHERE ID=${id}`,function(err,res1){
      if (err) throw err
      res.redirect('/')
    })
   })

   app.get('/update/:id',function(req,res){
    const id = req.params.id;
    connection.query(`select * from Covid_details where ID=${id}`,function(err,res1){
      if (err) throw err
      res.render('form2',{res1,id})
      console.log(res1);
    })
   // should display 123
});

app.get('/delete/:id',function(req,res){
  const id = req.params.id;
  connection.query(`delete from Covid_details where ID=${id}`,function(err){
    if (err) throw err
    res.redirect("/");
  })
   // should display 123
});

   app.listen(port, () => {
    console.log(`app listening at ${port}`)
  })
