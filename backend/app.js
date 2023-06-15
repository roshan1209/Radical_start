const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const con = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "",
        database : "student_management"
    }
)

//getting details
app.get("/listpage",(req,res)=>{
    const selectQuery = "select * from student_details";
    con.query(selectQuery,(err,result)=>{
        if(err){
           return res.status(404).json({msg:err})
        }
        return res.status(200).json({msg:result})
    })
})

// insertpage
app.post("/adddetails",(req,res)=>{
    const data = [
        req.body.firstName,
        req.body.lastName,
        req.body.location,
        req.body.email,
        req.body.dob,
        req.body.education,
        req.body.about
    ]
    const insertquery = "insert into student_details (firstName,lastName,location,email,dob,education,about) values (?,?,?,?,?,?,?)";
    con.query(insertquery,[...data],(err,result)=>{
        if(err){
           return res.status(404).json({msg:err})
        }
        return res.status(200).json({msg:"data inserted"})
    })
})

//update
app.put("/updatedetails/:ID",(req,res)=>{
    const {ID} = req.params
    const data = [
        req.body.firstName,
        req.body.lastName,
        req.body.location,
        req.body.email,
        req.body.dob,
        req.body.education,
        req.body.about
    ]
    console.log([...data,ID])
    const updatequery = "update student_details set firstName=?,lastName=?,location=?,email=?,dob=?,education=?,about=? where ID=?"
    con.query(updatequery,[...data,ID],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(404).json({msg:err})
        }
        return res.status(200).json({msg:"Updated successfully"})
    })
})

// select_unique_Person
app.get("/list1page/:ID",(req,res)=>{
    const {ID} = req.params
    const selectQuery = "select * from student_details where ID = ?";
    con.query(selectQuery,ID,(err,result)=>{
        if(err){
           return res.status(404).json({msg:err})
        }
        return res.status(200).json({msg:result})
    })
})

//delete
app.delete("/delete/:ID",(req,res)=>{
    const {ID} = req.params
    const deleteQuery = "delete from student_details where ID = ?";
    con.query(deleteQuery,ID,(err,result)=>{
        if(err){
           return res.status(404).json({msg:err})
        }
        return res.status(200).json({msg:"delete"})
    })
})


app.listen(4500,()=>{
    console.log("Server Connected")
})