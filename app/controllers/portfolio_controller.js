const portfolioModel = require('../models/portfolio_model');
const { logger } = require('../logger/logger');
const categoryModel = require('../models/category_model');
const { formValid, editValid } = require('../validation/portfolioValidation')


exports.portfolio = async (req, res) => {

    const user = await portfolioModel.aggregate([{
        $lookup: {
            from: "Category",
            localField: "category",
            foreignField: "pcategory",
            as: "data"
        },

    },

    ])


    res.render('portfolio', {
        values: user
    })



}

exports.addPortfolio = async (req, res) => {
    try {
        const result = await categoryModel.find();
        if (result) {
            res.render('addPortfolio', {
                values: result
            })
        }

    } catch (err) {
        logger.error(err);
    }

}

exports.addData = async (req, res) => {

    try {
        const { error } = formValid(req.body);
        if (error) {

            if (error.details[0].context.key == "pcategory") {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error1: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "pname") {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error2: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "ptitle") {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error3: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "url") {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error4: err1,
                    values: req.body
                })
            }

            if (error.details[0].context.key == "pdate") {
                var err1 = error.details[0].message;
                res.render('addPortfolio', {
                    error5: err1,
                    values: req.body
                })
            }

        } else {
            const result = req.files.map(images => images.filename);
            const data = {
                pcategory: req.body.pcategory,
                pname: req.body.pname,
                uploadImage: result,
                ptitle: req.body.ptitle,
                url: req.body.url,
                pdate: req.body.pdate

            }
            const portData = await portfolioModel(data)
            portData.save()
                .then(data => {
                    res.redirect('/portfolio')
                })
        }

    } catch (err) {
        logger.error(err);
    }
}

exports.editPortfolio = async (req, res) => {
    try {
        const category = await categoryModel.find()
        const portfolio = await portfolioModel.findById(req.params.id)
        if (category && portfolio) {
            res.render('editportfolio', {
                users: portfolio,
                values: category
            })
        }
    } catch (err) {
        logger.error(err)
    }
}

exports.editData = async (req, res) => {
    try {
        let { error } = editValid(req.body);
        if (error) {

            if (error.details[0].context.key == 'pcategory') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error1: err1,
                    users: req.body
                });
            }

            if (error.details[0].context.key == 'pname') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error2: err1,
                    users: req.body
                });
            }
            if (error.details[0].context.key == 'ptitle') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error3: err1,
                    users: req.body
                });
            }

            if (error.details[0].context.key == 'url') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error4: err1,
                    users: req.body
                });
            }

            if (error.details[0].context.key == 'pdate') {
                var err1 = error.details[0].message;
                return res.render('editPortfolio', {
                    error5: err1,
                    users: req.body
                });
            }
        } else {
            const data = {
                pcategory: req.body.pcategory,
                pname: req.body.pname,
                ptitle: req.body.ptitle,
                url: req.body.url,
                pdate: req.body.pdate
            }
            if (req.files) {
                data.uploadImage = req.files.map(images => images.filename);
            } else {
                data.old_image = req.body.old_image
            }

            await portfolioModel.findByIdAndUpdate(req.params.id, data)
            res.redirect('/portfolio')
        }
    }
    catch (err) {
        logger.error('Error', err);
    }
}

exports.deleteData = async (req, res) => {
    const id = req.params.id;
    portfolioModel.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot Delete user with ${id}.May be is wrong` })
            } else {
                res.redirect('/portfolio')
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not delete User with id' + id
            })
        })
}

// exports.deleteAll = (req,res)=>{
//     const id = req.query;
//     var countId = Object.keys(id).length;
//     for(let i=0; i < countId ; i++){
//         portfolioModel.findByIdAndDelete(Object.keys(id)[i],function(err){
//             if(err){

//                 logger.error("error",err)
//             }
//         })
//     }
//     return res.redirect('/portfolio')
// }



