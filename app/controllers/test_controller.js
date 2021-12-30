const testModel = require('../models/testomonial_model');
const { logger } = require('../logger/logger');
const { addForm, editForm } = require('../validation/testValidation')

exports.testimonial = async (req, res) => {
    const result = await testModel.find();

    res.render('testimonial', {
        users: result
    })
}

exports.addTest = (req, res) => {
    return res.render('addTest', {
        values: req.body
    });
}

exports.addData = (req, res) => {

    try {
        const { error } = addForm(req.body);
        if (error) {
            if (error.details[0].context.key == "name") {
                var err1 = error.details[0].message;
                res.render('addTest', {
                    error1: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "designation") {
                var err2 = error.details[0].message;
                res.render('addTest', {
                    error2: err2,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "description") {
                var err3 = error.details[0].message;
                res.render('addTest', {
                    error3: err3,
                    values: req.body
                })
            }
        }
        else {
            const data = {
                name: req.body.name,
                designation: req.body.designation,
                description: req.body.description,
                uploadImage: req.file.filename
            }

            const testData = new testModel(data)
            testData.save()
                .then(data => {
                    res.redirect('/testimonial')
                })
        }
    }
    catch (err) {
        logger.error('Error', err);
    }
}

exports.editTest = (req, res) => {
    testModel.findById(req.params.id, function (err, result) {
        res.render('editTest', {
            users: result
        })
    })
}

exports.editData = async (req, res) => {

    try {

        let { error } = editForm(req.body);
        if (error) {
            if (error.details[0].context.key == 'name') {
                var err1 = error.details[0].message;
                return res.render('editTest', {
                    error1: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'designation') {
                var err1 = error.details[0].message;
                return res.render('editTest', {
                    error2: err1,
                    values: req.body
                });
            }
            if (error.details[0].context.key == 'description') {
                var err1 = error.details[0].message;
                return res.render('editTest', {
                    error3: err1,
                    values: req.body
                });
            }
        }
        const data = {
            name: req.body.name,
            designation: req.body.designation,
            description: req.body.description,
        }

        if (req.file) {
            data.uploadImage = req.file.filename
        }

        const result = await testModel.findByIdAndUpdate(req.params.id, data)
        res.redirect('/testimonial')
    }
    catch (err) {
        logger.error('Error', err);
    }
}

exports.deleteData = (req, res) => {
    const id = req.params.id;
    testModel.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot Delete user with ${id}.May be is wrong` })
            } else {
                res.redirect('/testimonial')
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
        testModel.findByIdAndDelete(Object.keys(id)[i], function (err) {
            if (err) {
                logger.error("error", err)
            }
        })
    }
    return res.redirect('/testimonial')
}

