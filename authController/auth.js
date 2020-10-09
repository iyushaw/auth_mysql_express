// const e = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
});

exports.register = (req, res) => {
    console.log(req.body);

    const { firstname, lastname,email, username, password, confirm_password } = req.body;

    db.query('SELECT polls.username FROM users WHERE username = ?', [username], async (error, results) => {
            if (error) {
                console.log(error);
            }

            if (results.length > 0) {
                return res.render('register', {
                    message: "Email Already Taken"
                });
            } else if (password !== confirm_password) {
                return res.render('register', {
                    message: "Password did not match"
                });
            }

           let hashedPassword = await bcrypt.hash(password, 8);
           console.log(hashedPassword);

        //    db.query('INSERT INTO polls.users SET ?', {firstname:firstname, lastname:lastname, email:email, password:hashedPassword }, (error, result)=> {
        //        if(error){
        //            console.log(error);
        //        } else {
        //            console.log(result);
        //            return res.render('register', {
        //                message: "User Registered."
        //            });
        //        }
        //   });
        }); //db query

    // res.send("Form Submitted")
}