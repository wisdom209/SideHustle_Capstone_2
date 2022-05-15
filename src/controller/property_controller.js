const { postAdvert, markSold, deletePropertyFromDb ,selectAllProperties,selectPropertyType} = require('../model/PropertyModel')
const cloudinary = require('cloudinary').v2
require('dotenv').config()


//view type

const viewType = async (req, res, next) => {  
    const type = req.query.type;

    if (!req.body) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

    let result = await selectPropertyType({...req.body, type});

    if(result.message == 'success'){
        res.status(200).json({"status" : "success", "data": result.body})
    }else{
        res.status(400).json({"status": "error", "error-message": result.body})
    }
  
}



//view all adverts
const viewProperties = async (req, res, next) => {
    
    if (!req.body) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

    let result = await selectAllProperties();

    if(result.message == 'success'){
        res.cookie('token', result.token);
        res.status(200).json({"status" : "success", "data": result.body})
    }else{
        res.status(400).json({"status": "error", "error-message": result.body})
    }
  
}

//delete property advert

const deleteProperty = async (req, res, next) => {
    
    if (!req.body) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

    let result = await deletePropertyFromDb({...req.body, 'id':req.params.id});

    if(result.message == 'success'){
        res.cookie('token', result.token);
        res.status(200).json({"status" : "success", "data": result.body})
    }else{
        res.status(400).json({"status": "error", "error-message": result.body})
    }
  
}

//mark advert sold
const markAdvertSold = async (req, res, next) => {
    
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

  
    let result = await markSold({...req.body, id : req.params.id});

    if(result.message == 'success'){
        res.cookie('token', result.token);
        res.status(200).json({"status" : "success", "data": result.body})
    }else{
        res.status(400).json({"status": "error", "error-message": result.body})
    }
  
}

//post advert
const postPropertyAdvert = async (req, res, next) => {
   

    let jsonData = JSON.parse(req.body.data)

    if (!req.body.data) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

    require('../config/cloudinary.config')
   
    let imageUrl = await cloudinary.uploader.upload(req.files.photo.tempFilePath, (err, result) => {
        if (err) console.log('error :', err);
    })


    let result = await postAdvert({ ...jsonData, "image_url": imageUrl.url });



    if (result.message == 'success') {
        res.cookie('token', result.token);
        res.status(200).json({ "status": "success", "data": result.body[0] })
    } else {
        res.status(400).json({ "status": "error", "error-message": result.body })
    }

}

module.exports = {
    postPropertyAdvert, markAdvertSold, deleteProperty, viewProperties
}


