const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcryptjs");
const router = require("express");
const path = require("path");
const fs = require('fs');

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
            req.session.userID = results[0].id
            res.redirect('/')
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

    const { fname, lname, email, city, contact, password, userType } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.log("error: ", error)
        }
        if (results.length > 0) {
            return res.render('signup', {
                message: 'That email is already in use'
            })
        }
        db.query("INSERT INTO users SET ? ", {first_name: fname, last_name: lname, email: email, contact_number: contact, city: city, password: password, is_Seller: userType}, (error, results) => {
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

exports.listFish = (req, res) => {

    const userID = req.session.userID;
    const { fish_name, description, price, category } = req.body;
    const fishPhoto = req.file;
    
    if (!fishPhoto) {
        return res.render('listingform', {
            message: 'No file uploaded'
        });
    }

    const targetDirectory = path.join(__dirname, "../public/fish_uploads/");

    db.query('SELECT * FROM fish_listings WHERE sellerID = ? AND fish_name = ?', 
        [userID, fish_name], (error, results) => {
        if (error) {
            console.error("Database query error: ", error);
            return res.status(500).send('Database query error');
        }
        if (results.length > 0) {
            return res.render('listingform', {
                message: 'That fish is already listed'
            });
        }
        
        const targetPath = path.join(targetDirectory, fishPhoto.originalname);

        fs.writeFile(targetPath, fishPhoto.buffer, (error) => {
            if (error) {
                console.error('File write error:', error);
                return res.status(500).send('File write error');
            }
            console.log(`File has been moved to ${targetPath}`);

            const query = 'INSERT INTO fish_listings (sellerID, fish_name, description, price, category, fish_img) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [userID, fish_name, description, price, category, fishPhoto.originalname];

            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return res.status(500).send('Database insert error');
                }

                return res.render('listingform', {
                    message: 'Listing Successful'
                });
            });
        });
    });
};

exports.productRender = (req, res) => {
    db.query('SELECT * FROM fish_listings', (error, results) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).send('Internal Server Error');
        }

        const allFishListings = {
            fishData: results.map((row, index) => ({
                id: index, 
                fish_name: capitalize(row.fish_name),
                description: row.description,
                price: row.price,
                img: row.fish_img,
            }))
        };
        console.log(allFishListings)

        res.render('product-list', { allFishListings });
    });
};

// exports.productRender = (req, res) => {
//     db.query('SELECT * FROM fish_listings', (error, results) => {
//         if (error) {
//             console.log("error: ", error);
//             return res.status(500).send('Internal Server Error');
//         }

//         const allFishListings = {
//             employeeData: results.map((row, index) => ({
//                 id: index + 1, 
//                 fname: capitalize(row.first_name),
//                 lname: capitalize(row.last_name),
//                 fullName: capitalize(row.first_name) + " " + capitalize(row.last_name),
//                 bdate: new Date(row.birth_date).toLocaleDateString(),
//                 email: row.email,
//                 position: row.position,
//                 salary: row.salary,
//             }))
//         };
//         console.log()

//         res.render('home', { allEmployeeData });
//     });
// };

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
};