const userModel = require('../models/user_model');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { sendOTP } = require('../services/mail');
const { logger } = require('../logger/logger');
const { validateForm, validateLogin, verifyEmail, newPassword, resetPassword } = require('../validation/userValidation')

var otp = Math.floor(100000 + Math.random() * 900000);


exports.register = (req, res) => {
    return res.render('register', {
        values: req.body,

    });
}

exports.authregister = async (req, res) => {

    try {
        const { error } = validateForm(req.body);
        if (error) {

            if (error.details[0].context.key == "name") {
                var err1 = error.details[0].message;
                res.render('register', {
                    error1: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "email") {
                var err2 = error.details[0].message;
                res.render('register', {
                    error2: err2,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "gender") {
                var err3 = error.details[0].message;
                res.render('register', {
                    error3: err3,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "phoneno") {
                var err4 = error.details[0].message;
                res.render('register', {
                    error4: err4,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "password") {
                var err5 = error.details[0].message;
                res.render('register', {
                    error5: err5,
                    values: req.body
                })
            }
            if (error.details[0].context.key == "confirmpassword") {
                var err6 = error.details[0].message;
                res.render('register', {
                    error6: err6,
                    values: req.body
                })
            }


            if (error.details[0].context.key == "city") {
                var err8 = error.details[0].message;
                res.render('register', {
                    error8: err8,
                    values: req.body
                })
            }


        }
        if (!req.file) {
            var err1 = 'Image is now allowed to empty';
            res.render('register', {
                error7: err1,
                values: req.body
            })
        }
        else {

            let user = await userModel.findOne({ email: req.body.email })
            if (user) {
                var err1 = "User Already Register"
                return res.render('register', {
                    error: err1,
                    values: req.body
                })
            }

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

            const data = {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                phoneno: req.body.phoneno,
                password: req.body.password,
                uploadImage: req.file.filename,
                city: req.body.city
            }


            const userData = new userModel(data)
            userData.save()
                .then(data => {
                    res.redirect('/')
                })
        }
    }
    catch (err) {
        logger.error('Error', err);
    }
}

exports.login = (req, res) => {
    return res.render('login', {
        values: req.body,

    });
}

exports.authlogin = async (req, res) => {
    const { error } = validateLogin(req.body);

    if (error) {

        if (error.details[0].context.key == "email") {
            var err1 = error.details[0].message;
            res.render('login', {
                error1: err1,
                values: req.body

            });
        }
        if (error.details[0].context.key == "password") {
            var err2 = error.details[0].message;
            res.render('login', {
                error2: err2,
                values: req.body
            })
        }
    }
    else {
        let user = await userModel.findOne({ email: req.body.email });

        if (user) {

            const password = req.body.password;
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                res.render('index');
            }
            else {
                var err1 = "Password does not match"
                return res.render('login', {
                    error: err1,
                    values: req.body
                })
            }
        }
        else {
            var err1 = "User is not found";
            return res.render('login', {
                error: err1,
                values: req.body
            })
        }
    }
}

exports.forgetpass = (req, res) => {
    return res.render('forgetpass', {
        values: req.body
    });
}

exports.verifyEmail = async (req, res) => {
    try {
        const { error } = verifyEmail(req.body);

        if (error) {
            if (error.details[0].context.key == "email") {
                var err1 = error.details[0].message;
                res.render('forgetpass', {
                    error1: err1
                });
            }
        }
        else {
            let user = await userModel.findOne({ email: req.body.email });

            if (user) {
                sendOTP(req.body.email, otp);
                res.render('otp', {
                    email: req.body.email
                });
            }
            else {
                var err1 = "User is not found";
                return res.render('forgetpass', {
                    error: err1,
                    email: req.body.email,
                })
            }
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.otp = (req, res) => {
    return res.render('otp', {
        email: req.body.email
    });
}

exports.verifyOtp = (req, res) => {
    try {
        if (otp == req.body.otp) {
            res.render('updatePassword', {
                email: req.body.email
            });
        }
        else {
            var err = "Please enter valid OTP";
            return res.render('otp', {
                error: err,
                email: req.body.email,

            })
        }
    } catch (err) {
        logger.error('Error', err);
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const { error } = newPassword(req.body);
        if (error) {
            if (error.details[0].context.key == "password") {
                var err1 = error.details[0].message;
                res.render('updatePassword', {
                    error1: err1,
                    email: req.body.email,
                })
            }

            if (error.details[0].context.key == "confirmpassword") {
                var err2 = error.details[0].message;
                res.render('updatePassword', {
                    error2: err2,
                    email: req.body.email,
                })
            }
        } else {


            const salt = 10;
            const bcryptPassword = await bcrypt.hash(req.body.password, salt);

            const passwordUpdate = { password: bcryptPassword }


            userModel.updateOne({ email: req.body.email }, passwordUpdate, (err, response) => {
                if (response) {

                    res.redirect('/')
                } else {
                    logger.error(err);
                }
            })

        }

    } catch (err) {
        console.error('Error', err);
    }
}


exports.resetPassword = (req, res) => {
    res.render('resetPassword', {
        email: req.body.email,
    })
}

exports.newPassword = async (req, res) => {
    try {

        const { error } = resetPassword(req.body)

        if (error) {
            if (error.details[0].context.key == "currentpassword") {
                var err1 = error.details[0].message;
                res.render('resetPassword', {
                    error1: err1
                })
            }

            if (error.details[0].context.key == "newpassword") {
                var err2 = error.details[0].message;
                res.render('resetPassword', {
                    error2: err2
                })
            }

            if (error.details[0].context.key == "confirmpassword") {
                var err3 = error.details[0].message;
                res.render('resetPassword', {
                    error3: err3
                })
            }

        } else {
            const email = req.user.email;
            const user = await userModel.findOne({ email });
            if (user) {
                const passwordValid = await bcrypt.compare(req.body.currentpassword, user.password);

                if (passwordValid) {

                    const salt = 10;
                    const bcryptPassword = await bcrypt.hash(req.body.newpassword, salt);


                    const passwordUpdate = { password: bcryptPassword };

                    userModel.updateOne({ email }, passwordUpdate, async (err, response) => {
                        if (response) {
                            console.log("response", response);
                            res.redirect('/')
                        } else {
                            logger.log(err);
                        }
                    })
                } else {
                    return res.render('resetPassword', {
                        error: "Current Password is incorrect",
                    });
                }
            }
        }


    }
    catch (err) {
        logger.error(err);
    }
}

exports.index = (req, res) => {
    res.render('index');
}

exports.viewProfile = async (req, res) => {
    const email = req.user.email;

    try {
        const user = await userModel.findOne({ email });
        if (user) {
            res.render('profile', {
                values: user
            })
        }

    } catch (err) {
        logger.error(err);
    }
}

exports.updateProfile = async (req, res) => {
    const email = req.user.email;

    userModel.findOne({ email: email }, (err, tdata) => {
        if (err) {
            logger.error(err)
        } else {
            res.render('editprofile', {
                user: tdata
            })
        }
    })
}


exports.editProfile = async (req, res) => {
    const email = req.user.email;
    let new_image = "";
    if (req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync("./uploads/" + req.body.old_image);
        } catch (err) {
            logger.error(err);
        }
    }
    else {
        new_image = req.body.old_image;
    }
    userModel.findOneAndUpdate({ email: email }, {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        phoneno: req.body.phoneno,
        password: req.body.password,
        uploadImage: new_image,
        city: req.body.city
    }, (err, result) => {
        if (err) {
            res.render('editProfile', {
                user: req.body,
                error: err,
            });
        } else {
            res.redirect("/profile")
        }
    })
}

exports.logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.redirect('/');
    } catch (err) {
        logger.error(err);
    }
}









