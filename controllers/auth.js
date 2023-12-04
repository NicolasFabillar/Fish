<<<<<<< HEAD
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcryptjs");
const router = require("express")


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const capitalize = (str) => {
    return str.replace(/\b\w/g, match => match.toUpperCase());
};

exports.login = (req,res) => {
    console.log(req.body);
    const {email, password} = req.body;

    db.query(`SELECT * FROM users WHERE email = "${email}"`, async (error, results, fields) => {

        if (error) {
            console.log("error: ", error)
        }
        if (results.length == 0) {
            return res.render('login', {
                message: 'The email is not registered'
            })
        }
        if (results[0].password == password) {
            req.session.userEmail = email;
            res.redirect('/home')
        }
        if (results[0].password != password) {
            return res.render('login', {
                message: 'Wrong Password'
            });
        }
    });

}

exports.register = (req,res) => {

    console.log(req.body);

    const { fname, lname, bdate, email, position, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log("error: ", error)
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if (password != passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }
        db.query("INSERT INTO users SET ? ", {first_name: fname, last_name: lname, birth_date:bdate, email: email, position: position, password: password}, (error, results) => {
            if (error){
                console.log("error: ",error);
            } else{
                console.log(results)
                return res.render('Login', {
                    message: 'User Registered'
                })
            }
        })
    });
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
};

exports.updateProfile = (req, res) => {
    const userEmail = req.session.userEmail;
    const { fname, lname, bdate, position } = req.body;

    db.query('UPDATE users SET first_name=?, last_name=?, birth_date=?, position=? WHERE email=?', [fname, lname, bdate, position, userEmail], (error, results) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        req.session.message = "Profile updated successfully";
        res.redirect('/edit-profile')
    });
};

exports.employeeRender = (req, res) => {
    db.query('SELECT * FROM users INNER JOIN salary ON users.position = salary.position', (error, results) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).send('Internal Server Error');
        }

        const allEmployeeData = {
            employeeData: results.map((row, index) => ({
                id: index + 1, 
                fname: capitalize(row.first_name),
                lname: capitalize(row.last_name),
                fullName: capitalize(row.first_name) + " " + capitalize(row.last_name),
                bdate: new Date(row.birth_date).toLocaleDateString(),
                email: row.email,
                position: row.position,
                salary: row.salary,
            }))
        };
        console.log()

        res.render('home', { allEmployeeData });
    });
};

exports.userRender = (req, res) => {
    const userEmail = req.session.userEmail;
    db.query('SELECT * FROM users WHERE email = ?', [userEmail], (error, results) => {
        if (error) {
          console.error('Error querying the database:', error);
        } else {
          if (results.length > 0) {
            const row = results[0];
            const userData = {
              id: row.id,
              fname: capitalize(row.first_name),
              lname: capitalize(row.last_name),
              fullName: capitalize(row.first_name) + " " + capitalize(row.last_name),
              bdate: new Date(row.birth_date).toLocaleDateString(),
              email: row.email,
              position: row.position,
            };
            res.render('profile', { userData });
          } else {
            console.log('Email not found in the database');
          }
        }
      });
};

exports.editUserRender = (req, res) => {
    const userEmail = req.session.userEmail;
    const message = req.session.message;
    db.query('SELECT * FROM users WHERE email = ?', [userEmail], (error, results) => {
        if (error) {
          console.error('Error querying the database:', error);
        } else {
          if (results.length > 0) {
            const row = results[0];
            const userData = {
              id: row.id,
              fname: capitalize(row.first_name),
              lname: capitalize(row.last_name),
              fullName: capitalize(row.first_name) + " " + capitalize(row.last_name),
              bdate: new Date(row.birth_date).toLocaleDateString(),
              email: row.email,
              position: row.position,
            };
            res.render('edit-profile', { userData, message });
          } else {
            console.log('Email not found in the database');
          }
        }
      });
=======
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcryptjs");
const router = require("express")


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const capitalize = (str) => {
    return str.replace(/\b\w/g, match => match.toUpperCase());
};

exports.login = (req,res) => {
    console.log(req.body);
    const {email, password} = req.body;

    db.query(`SELECT * FROM users WHERE email = "${email}"`, async (error, results, fields) => {

        if (error) {
            console.log("error: ", error)
        }
        if (results.length == 0) {
            return res.render('login', {
                message: 'The email is not registered'
            })
        }
        if (results[0].password == password) {
            req.session.userEmail = email;
            res.redirect('/home')
        }
        if (results[0].password != password) {
            return res.render('login', {
                message: 'Wrong Password'
            });
        }
    });

}

exports.register = (req,res) => {

    console.log(req.body);

    const { fname, lname, bdate, email, position, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log("error: ", error)
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if (password != passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }
        db.query("INSERT INTO users SET ? ", {first_name: fname, last_name: lname, birth_date:bdate, email: email, position: position, password: password}, (error, results) => {
            if (error){
                console.log("error: ",error);
            } else{
                console.log(results)
                return res.render('Login', {
                    message: 'User Registered'
                })
            }
        })
    });
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
};

exports.updateProfile = (req, res) => {
    const userEmail = req.session.userEmail;
    const { fname, lname, bdate, position } = req.body;

    db.query('UPDATE users SET first_name=?, last_name=?, birth_date=?, position=? WHERE email=?', [fname, lname, bdate, position, userEmail], (error, results) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        req.session.message = "Profile updated successfully";
        res.redirect('/edit-profile')
    });
};

exports.employeeRender = (req, res) => {
    db.query('SELECT * FROM users INNER JOIN salary ON users.position = salary.position', (error, results) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).send('Internal Server Error');
        }

        const allEmployeeData = {
            employeeData: results.map((row, index) => ({
                id: index + 1, 
                fname: capitalize(row.first_name),
                lname: capitalize(row.last_name),
                fullName: capitalize(row.first_name) + " " + capitalize(row.last_name),
                bdate: new Date(row.birth_date).toLocaleDateString(),
                email: row.email,
                position: row.position,
                salary: row.salary,
            }))
        };
        console.log()

        res.render('home', { allEmployeeData });
    });
};

exports.userRender = (req, res) => {
    const userEmail = req.session.userEmail;
    db.query('SELECT * FROM users WHERE email = ?', [userEmail], (error, results) => {
        if (error) {
          console.error('Error querying the database:', error);
        } else {
          if (results.length > 0) {
            const row = results[0];
            const userData = {
              id: row.id,
              fname: capitalize(row.first_name),
              lname: capitalize(row.last_name),
              fullName: capitalize(row.first_name) + " " + capitalize(row.last_name),
              bdate: new Date(row.birth_date).toLocaleDateString(),
              email: row.email,
              position: row.position,
            };
            res.render('profile', { userData });
          } else {
            console.log('Email not found in the database');
          }
        }
      });
};

exports.editUserRender = (req, res) => {
    const userEmail = req.session.userEmail;
    const message = req.session.message;
    db.query('SELECT * FROM users WHERE email = ?', [userEmail], (error, results) => {
        if (error) {
          console.error('Error querying the database:', error);
        } else {
          if (results.length > 0) {
            const row = results[0];
            const userData = {
              id: row.id,
              fname: capitalize(row.first_name),
              lname: capitalize(row.last_name),
              fullName: capitalize(row.first_name) + " " + capitalize(row.last_name),
              bdate: new Date(row.birth_date).toLocaleDateString(),
              email: row.email,
              position: row.position,
            };
            res.render('edit-profile', { userData, message });
          } else {
            console.log('Email not found in the database');
          }
        }
      });
>>>>>>> 3c5921d114dac1b3a84453c7e5c66d4555abee1c
};