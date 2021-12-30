const contactModel = require('../models/contact_model');
const { logger } = require('../logger/logger');


exports.contact = async (req, res) => {
    const result = await contactModel.find();
    res.render('contact', {
        users: result
    })
}


exports.addContact = (req, res) => {
    res.render('addContact', {
        values: req.body
    });
}

exports.addData = (req, res) => {

    try {

        const { error } = validateForm(req.body)

        if (error) {

            if (error.details[0].context.key == "name") {
                var err1 = error.details[0].message;
                res.render('addContact', {
                    error1: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "email") {
                var err1 = error.details[0].message;
                res.render('addContact', {
                    error2: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "contactnumber") {
                var err1 = error.details[0].message;
                res.render('addContact', {
                    error3: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "message") {
                var err1 = error.details[0].message;
                res.render('addContact', {
                    error4: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "date") {
                var err1 = error.details[0].message;
                res.render('addContact', {
                    error5: err1,
                    values: req.body
                })
            }
        } else {
            const data = {
                name: req.body.name,
                email: req.body.email,
                contactnumber: req.body.contactnumber,
                message: req.body.message,
                date: req.body.date,
            }

            const contactData = new contactModel(data)
            contactData.save()
                .then(data => {
                    res.redirect('/contact')
                })


        }

    } catch (err) {
        logger.error(err);
    }
}


exports.editContact = (req, res) => {
    contactModel.findById(req.params.id, function (err, result) {
        res.render('editContact', {
            users: result
        })
    })
}

exports.editData = async (req, res) => {
    try {

        const { error } = editForm(req.body)
        if (error) {
            if (error.details[0].context.key == "name") {
                var err1 = error.details[0].message;
                res.render('editContact', {
                    error1: err1,
                    users: req.body
                })
            }

            if (error.details[0].context.key == "email") {
                var err1 = error.details[0].message;
                res.render('editContact', {
                    error2: err1,
                    users: req.body
                })
            }

            if (error.details[0].context.key == "contactnumber") {
                var err1 = error.details[0].message;
                res.render('editContact', {
                    error3: err1,
                    users: req.body
                })
            }

            if (error.details[0].context.key == "message") {
                var err1 = error.details[0].message;
                res.render('editContact', {
                    error4: err1,
                    users: req.body
                })
            }

            if (error.details[0].context.key == "date") {
                var err1 = error.details[0].message;
                res.render('editContact', {
                    error5: err1,
                    users: req.body
                })
            }

        } else {
            const data = {
                name: req.body.name,
                email: req.body.email,
                contactnumber: req.body.contactnumber,
                message: req.body.message,
                date: req.body.date,
            }
            const result = await contactModel.findByIdAndUpdate(req.params.id, data)
            res.redirect('/contact')


        }

    } catch (err) {
        logger.error(err);
    }
}

exports.deleteData = (req, res) => {
    const id = req.params.id;
    contactModel.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot Delete user with ${id}.May be is wrong` })
            } else {
                res.redirect('/contact')
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete User with id' + id
            })
        })
}

exports.deleteAll = (req, res) => {
    const id = req.query;
    var countId = Object.keys(id).length;
    for (let i = 0; i < countId; i++) {
        contactModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                logger.error("error", err)
            }
        })
    }
    return res.redirect('/contact')
}

