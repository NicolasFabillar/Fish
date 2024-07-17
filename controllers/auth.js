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

exports.login = (req, res) => {
    const { email, password, fishID, sellerPage } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results, fields) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).render('login', {
                message: 'Internal server error'
            });
        }

        if (results.length === 0) {
            return res.render('login', {
                message: 'The email is not registered'
            });
        }

        const user = results[0];

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            req.session.userEmail = email;
            req.session.userID = user.id;
            req.session.profileImage = user.profile_img;
            req.session.isSeller = user.is_Seller;
            req.session.isLoggedin = true;

            if (fishID) {
                res.redirect(`/product_info?id=${fishID}`);
            } else if (sellerPage) {
                res.redirect(`/sellers`);
            } else {
                res.redirect('/');
            }
        } else {
            return res.render('login', {
                message: 'Wrong Password'
            });
        }
    });
};

exports.register = (req, res) => {
    console.log(req.body);

    const Image = req.file;
    const { fname, lname, email, city, contact, password, userType, storeName } = req.body;

    if (!Image) {
        return res.render('signup', {
            message: 'No file uploaded'
        });
    }

    const targetDirectory = path.join(__dirname, "../public/profile_uploads/");
    const targetPath = path.join(targetDirectory, Image.originalname);

    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).render('signup', {
                message: 'Internal server error'
            });
        }
        if (results.length > 0) {
            return res.render('signup', {
                message: 'That email is already in use'
            });
        }

        // Hash the password before storing it
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Hashing error:', err);
                return res.status(500).render('signup', {
                    message: 'Internal server error'
                });
            }

            fs.writeFile(targetPath, Image.buffer, (error) => { 
                if (error) {
                    console.error('File write error:', error);
                    return res.status(500).send('File write error');
                }

                db.query("INSERT INTO users SET ?", {
                    first_name: fname,
                    last_name: lname,
                    store_name: storeName,
                    email: email,
                    contact_number: contact,
                    city: city,
                    password: hashedPassword,
                    profile_img: Image.originalname,
                    is_Seller: userType
                }, (error, results) => {
                    if (error) {
                        console.error("Database error:", error);
                        return res.status(500).render('signup', {
                            message: 'Internal server error'
                        });
                    } else 
                    {
                        console.log(results);
                        return res.render('Login', {
                            message: 'User Registered'
                        });
                    }
                });
            });
        });
    });
};

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
    const isLoggedIn = req.session?.isLoggedin;
    const userID =  req.session?.userID;
    const profileImage =  req.session?.profileImage;
    const isSeller =  req.session?.isSeller;
    const userData = {
        loginStatus: isLoggedIn,
        profileImage: profileImage,
        userID: userID,
        isSeller: isSeller,
    };
    console.log(userData)

    db.query('SELECT * FROM fish_listings', (error, results) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).send('Internal Server Error');
        }

        const allFishListings = {
            fishData: results.map((row, index) => ({
                id: row.id, 
                fish_name: capitalize(row.fish_name),
                description: row.description,
                price: row.price,
                img: row.fish_img,
            }))
        };

        res.render('product-list', { allFishListings, userData });
    });
};

exports.productInfoRender = (req, res) => {
    const fishID = req.query.id;
    const LoginStatus = req.session.isLoggedin;

    if (LoginStatus == true){
        db.query('SELECT * FROM fish_listings WHERE id = ?', [fishID], (error, results) => {
            if (error) {
                console.log("error: ", error);
                return res.status(500).send('Internal Server Error');
            }
        
            if (results.length === 0) {
                return res.status(404).send('Fish not found');
            }
        
            const fishData = {
                id: results[0].id,  
                seller: results[0].sellerID,  
                fish_name: capitalize(results[0].fish_name),
                description: results[0].description,
                price: results[0].price,
                img: results[0].fish_img,
            };
    
            db.query('SELECT * FROM users WHERE id = ?', [fishData.seller], (error, results) => {
                if (error) {
                    console.log("Error fetching fish listings: ", error);
                    return res.status(500).send('Internal Server Error');
                }
    
                const sellerData = {
                    id: results[0].id,
                    fullName: capitalize(results[0].first_name) + " " + capitalize(results[0].last_name),
                    contact: results[0].contact_number,
                    email: results[0].email,
                    city: results[0].city,
                };
    
                res.render('product-info', { fishData, sellerData });
            });
        });
    } else {
        res.render('login', {fishID, message: 'Login First'})
    }
};

exports.sellersRender = (req, res) => {
    const LoginStatus = req.session.isLoggedin;
    const sellerPage = true;

    if (LoginStatus == true){ 
        db.query('SELECT * FROM users WHERE is_Seller = ?',[1], (error, results) => {
            if (error) {
                console.log("error: ", error);
                return res.status(500).send('Internal Server Error');
            }
    
            const allSellers = {
                Seller: results.map((row, index) => ({
                    id: row.id, 
                    fullName: capitalize(row.first_name) + " " + capitalize(row.last_name),
                }))
            };
    
            res.render('sellers', { allSellers });
        });
    } else {
        res.render('login', {sellerPage, message: 'Login First'})
    }
};

exports.sellerInfoRender = (req, res) => {
    const sellerID = req.query.id;

    db.query('SELECT * FROM users WHERE id = ?', [sellerID], (error, userResults) => {
        if (error) {
            console.log("Error fetching seller info: ", error);
            return res.status(500).send('Internal Server Error');
        }

        if (userResults.length === 0) {
            return res.status(404).send('Seller not found');
        }

        const sellerData = {
            id: userResults[0].id,
            fullName: capitalize(userResults[0].first_name) + " " + capitalize(userResults[0].last_name),
            contact: userResults[0].contact_number,
            email: userResults[0].email,
            city: userResults[0].city,
        };

        db.query('SELECT * FROM fish_listings WHERE sellerID = ?', [sellerID], (fishError, fishResults) => {
            if (fishError) {
                console.log("Error fetching fish listings: ", fishError);
                return res.status(500).send('Internal Server Error');
            }

            const allFishListings = {
                fishData: fishResults.map(row => ({
                    id: row.id,
                    fish_name: capitalize(row.fish_name),
                    description: row.description,
                    price: row.price,
                    img: row.fish_img,
                }))
            };
            res.render('sellerinfo', { sellerData, allFishListings });
        });
    });
};

exports.profileRender = (req, res) => {
    const userID = req.query.id;

    db.query('SELECT * FROM users WHERE id = ?', [userID], (error, results) => {
        if (error) {
            console.log("error: ", error);
            return res.status(500).send('Internal Server Error');
        }
    
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
    
        const userData = {
            id: results[0].id, // Access results as an array element
            fullName: capitalize(results[0].first_name) + " " + capitalize(results[0].last_name), // Access first_name and last_name from results[0]
            location: results[0].city,
            contact: results[0].contact_number,
            email: results[0].email,
            img: results[0].profile_img,
        };
        
        res.render('profilepage', { userData });
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