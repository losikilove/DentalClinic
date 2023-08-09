const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql/msnodesqlv8");

const config = {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    database: 'DENTALCLINIC',
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true,
    
  },
  diver: 'msnodesqlv8'
 
};

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
const pool = new sql.ConnectionPool(config);

// Kết nối đến SQL Server
pool.connect()
  .then(() => {
    console.log('Connected to SQL Server');

  })
  .catch(err => {
    console.error('error connect SQL Server:', err);
});
const request = new sql.Request(pool);

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const sqlQuery = "SELECT Username, Passwordd FROM account WHERE Username = @loginUsername AND Passwordd = @loginPassword AND IsActived = 'yes'";
    request.input("loginUsername", sql.VarChar, username);
    request.input("loginPassword", sql.VarChar, password);
    request.query(sqlQuery, (err, accountResult) => {
        if (err) {
            console.error("Error executing the SELECT query:", err.message);
            res.status(500).json({ error: "An error occurred while checking credentials." });
            return;
        }
        if (accountResult.recordset.length === 0) {
            const userType = "wrong";
            res.json({ success: false, userType });
            return;
        }
        const gotUsername = accountResult.recordset[0].Username;
        const getUserTypeSql = "SELECT UserType FROM user_dental WHERE Username = @gotUsername";
        const userTypeRequest = new sql.Request(pool);
        userTypeRequest.input("gotUsername", sql.VarChar, gotUsername);
        userTypeRequest.query(getUserTypeSql, (err, userTableResult) => {
            if (err) {
                console.error("Error executing the SELECT query:", err.message);
                res.status(500).json({ error: "An error occurred while fetching UserType." });
                return;
            }

            if (userTableResult.recordset.length > 0) {
                const userType = userTableResult.recordset[0].UserType;
                res.json({ success: true, userType });
            } else {
                res.status(401).json({ error: "UserType not found" });
            }
        });
    });
    
});

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})
// app.get("/get-account", (req, res) => {
//     const sqlQuery = "SELECT * FROM ACCOUNT"; // Thay đổi câu truy vấn theo tên bảng thật sự trong cơ sở dữ liệu
//     poolConnect.then(() => {
//         const request = new sql.Request(pool);
//         request.query(sqlQuery, (err, result) => {
//             if (err) {
//                 console.error("Error executing the select query:", err.message);
//                 res.status(500).json({ error: "An error occurred while selecting data." });
//                 return;
//             }
//             res.send(result.recordset);
//         });
//     }).catch(err => {
//         console.error('Error connecting to SQL Server:', err);
//         res.status(500).json({ error: "An error occurred while connecting to the database." });
//     });
// }); 


// // app.get("/get-appointment", (req, res) => {
// //   const sqlGetAppointment = "Select * from appointment order by Time";
// //   db.query(sqlGetAppointment,(err, result) => {
// //       if (err) {
// //           console.error("Error executing the select query:", err.message);
// //           res.status(500).json({ error: "An error occurred while selecting data." });
// //           return;
// //       }
// //       res.send(result);
// //  });
// // });
// // app.delete("/remove-appoinment/:AID", (req, res) => {
// //   const {AID }= req.params;
// //   console.log(AID);
// //   const sqlRemove = "DELETE FROM appointment WHERE AID = ?";
// //   db.query(sqlRemove, AID , (error, result) => {
// //       if(error) {
// //           console.log(error);
// //       }
// //       console.log("Delete query successful!");
// //       console.log("Deleted rows:", result.affectedRows);
// //       res.status(200).json({ message: "Deleted successfully!" });
// //   });
// // });
// // app.get("/get-appointment-group-by-room", (req, res) => {
// //   const sqlGetAppointment = "Select * from appointment order by RoomID";
// //   db.query(sqlGetAppointment,(err, result) => {
// //       if (err) {
// //           console.error("Error executing the select query:", err.message);
// //           res.status(500).json({ error: "An error occurred while selecting data." });
// //           return;
// //       }
// //       res.send(result);
// //  });
// // });
// // /*Duyet theo banh nhan*/
// // app.get("/get-appointment-group-by-customerID", (req, res) => {
// //   const sqlGetAppointment = "Select * from appointment order by CusID";
// //   db.query(sqlGetAppointment,(err, result) => {
// //       if (err) {
// //           console.error("Error executing the select query:", err.message);
// //           res.status(500).json({ error: "An error occurred while selecting data." });
// //           return;
// //       }
// //       res.send(result);
// //  });
// // });
// // /* dentist */ 
// // app.get("/get-appointment-group-by-dentist", (req, res) => {
// //   const sqlGetAppointment = "SELECT *  FROM appointment order by Den_UserID";
// //   db.query(sqlGetAppointment, (err, result) => {
// //     if (err) {
// //       console.error("Error executing the select query:", err.message);
// //       res.status(500).json({ error: "An error occurred while selecting data." });
// //       return;
// //     }
// //     res.send(result);
// //   });
// // });

// // app.get("/get-medicine", (req, res) => {
// //     const sqlGetAppointment = "Select * from medicine";
// //     db.query(sqlGetAppointment,(err, result) => {
// //         if (err) {
// //             console.error("Error executing the select query:", err.message);
// //             res.status(500).json({ error: "An error occurred while selecting data." });
// //             return;
// //         }
// //         res.send(result);
// //    });
// // });
// // app.put("/update-medicine/:Medicine", (req, res) => {
// //   const {Medicine} = req.params;
// //   const {Price,Type} = req.body;
// //   const sqlUpdate = "Update medicine set  Price = ? ,TypeOfMedicine = ? where Medicine = ?";
// //   db.query(sqlUpdate, [Price,Type,Medicine],(err, result) => {
// //       if (err) {
// //           console.error("Error executing the update query:", err.message);
// //           res.status(500).json({ error: "An error occurred while inserting data." });
// //           return;
// //       }
// //       console.log("Update query successful!");
// //       console.log("Updated rows:", result.affectedRows);
// //       res.status(200).json({ message: "Data update successfully!" });

// //   })
// // });


// // app.get("/get-staff", (req, res) => {
// //     const sqlStaff = "Select * from usertable where UserType = 'Staff'";
// //     db.query(sqlStaff,(err, result) => {
// //         if (err) {
// //             console.error("Error executing the select query:", err.message);
// //             res.status(500).json({ error: "An error occurred while selecting data." });
// //             return;
// //         }
// //         res.send(result);
// //    });
// // });

// // app.get("/get-patient", (req, res) => {
// //     const sqlPatient = "Select * from customer";
// //     db.query(sqlPatient,(err, result) => {
// //         if (err) {
// //             console.error("Error executing the select query:", err.message);
// //             res.status(500).json({ error: "An error occurred while selecting data." });
// //             return;
// //         }
// //         res.send(result);
// //    });
// // });
// // app.get("/get-dentist", (req, res) => {
// //     const sqlGetAppointment = "Select * from usertable where UserType = 'Dentist'";
// //     db.query(sqlGetAppointment,(err, result) => {
// //         if (err) {
// //             console.error("Error executing the select query:", err.message);
// //             res.status(500).json({ error: "An error occurred while selecting data." });
// //             return;
// //         }
// //         res.send(result);
// //    });
// // });

// // app.get("/getAppoinmentDetail/:AID", (req, res) => {
// //   const {AID} = req.params;
// //   const ViewDetailAppoinment = "Select * from appointment where AID = ?";
// //   db.query(ViewDetailAppoinment, AID,(err, result) => {
// //       if (err) {
// //           console.error("Error executing the view query:", err.message);
// //           res.status(500).json({ error: "An error occurred while viewing data." });
// //           return;
// //       }
// //       res.send(result);
// //   })
// // });

// // app.get("/getDentistDetail/:DID", (req, res) => {
// //     const {DID} = req.params;
// //     const ViewDetailDentist = "Select * from usertable where UserType = 'Dentist' and UserID = ?";
// //     db.query(ViewDetailDentist, DID,(err, result) => {
// //         if (err) {
// //             console.error("Error executing the view query:", err.message);
// //             res.status(500).json({ error: "An error occurred while viewing data." });
// //             return;
// //         }
// //         res.send(result);
// //     })
// // });

// // app.get("/getStaffDetail/:SID", (req, res) => {
// //     const {SID} = req.params;
// //     const ViewDetailStaff = "Select * from usertable where UserType = 'Staff' and UserID = ?";
// //     db.query(ViewDetailStaff, SID,(err, result) => {
// //         if (err) {
// //             console.error("Error executing the view query:", err.message);
// //             res.status(500).json({ error: "An error occurred while viewing data." });
// //             return;
// //         }
// //         res.send(result);
// //     })
// // });



// // app.post("/insert-dentist", (req, res) => {
// //     const { Username, Password, FullName, NationalID, Address, PhoneNumber, Gender } = req.body;
// //     console.log(Username + " " + Password);
  
// //     const sqlInsertUserTable = "INSERT INTO usertable (UserID,FullName,NationalID,Address,PhoneNumber,Gender,UserType,UserName) VALUES ('321',?,?,?,?,?,'Dentist',?)";
// //     const sqlInsertAccount = "INSERT INTO account (Username,Password,isActive) VALUES (?,?,'yes')";
 
// //     Promise.all([
// //       new Promise((resolve, reject) => {
// //         db.query(sqlInsertUserTable, [FullName, NationalID, Address, PhoneNumber, Gender, Username], (err, result) => {
// //           if (err) {
// //             console.error("Error executing the INSERT query:", err.message);
// //             reject(err);
// //             return;
// //           }
// //           console.log("INSERT query for usertable successful!");
// //           console.log("Inserted rows:", result.affectedRows);
// //           resolve(result);
// //         });
// //       }),
// //       new Promise((resolve, reject) => {
// //         db.query(sqlInsertAccount, [Username, Password], (err, result) => {
// //           if (err) {
// //             console.error("Error executing the INSERT query:", err.message);
// //             reject(err);
// //             return;
// //           }
// //           console.log("INSERT query for account successful!");
// //           console.log("Inserted rows:", result.affectedRows);
// //           resolve(result);
// //         });
// //       })
// //     ])
// //       .then(() => {

// //         res.status(200).json({ message: "Data inserted successfully!" });
// //       })
// //       .catch((err) => {
 
// //         console.error("An error occurred while inserting data:", err.message);
// //         res.status(500).json({ error: "An error occurred while inserting data." });
// //       });
// // });
// // app.post("/insert-staff", (req, res) => {
// //     const { Username, Password, FullName, NationalID, Address, PhoneNumber, Gender } = req.body;
// //     console.log(Username + " " + Password);
  
// //     const sqlInsertUserTable = "INSERT INTO usertable (UserID,FullName,NationalID,Address,PhoneNumber,Gender,UserType,UserName) VALUES ('32',?,?,?,?,?,'Staff',?)";
// //     const sqlInsertAccount = "INSERT INTO account (Username,Password,isActive) VALUES (?,?,'yes')";
 
// //     Promise.all([
// //       new Promise((resolve, reject) => {
// //         db.query(sqlInsertUserTable, [FullName, NationalID, Address, PhoneNumber, Gender, Username], (err, result) => {
// //           if (err) {
// //             console.error("Error executing the INSERT query:", err.message);
// //             reject(err);
// //             return;
// //           }
// //           console.log("INSERT query for usertable successful!");
// //           console.log("Inserted rows:", result.affectedRows);
// //           resolve(result);
// //         });
// //       }),
// //       new Promise((resolve, reject) => {
// //         db.query(sqlInsertAccount, [Username, Password], (err, result) => {
// //           if (err) {
// //             console.error("Error executing the INSERT query:", err.message);
// //             reject(err);
// //             return;
// //           }
// //           console.log("INSERT query for account successful!");
// //           console.log("Inserted rows:", result.affectedRows);
// //           resolve(result);
// //         });
// //       })
// //     ])
// //       .then(() => {

// //         res.status(200).json({ message: "Data inserted successfully!" });
// //       })
// //       .catch((err) => {
 
// //         console.error("An error occurred while inserting data:", err.message);
// //         res.status(500).json({ error: "An error occurred while inserting data." });
// //       });
// // });

