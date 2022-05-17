const cloudinary = require('cloudinary').v2
require('dotenv').config()
const { postAdvert, markSold, deletePropertyFromDb ,selectAllProperties,selectPropertyType, selectSpecificAdvert, updateAdvert} = require('../model/PropertyModel')
const { decodedJwt } = require('../utils/jwt_util')
require('dotenv').config()


//user can view specific advert
const viewSpecificAdvert = async (req, res, next) => {
    
    if (!req.body) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

    let result = await selectSpecificAdvert({...req.body, 'id' : req.params.id});

    if(result.message == 'success'){
        
        res.status(200).json({"status" : "success", "data": result.body[0] || result.body})
    }else{
        res.status(400).json({"status": "error", "error-message": result.body})
    }
  
}

//users can view specific type of property advert
const viewType = async (req, res, next) => {  

    const type = req.query.type;
    

    if (!req.body) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

    let result = await selectPropertyType({ ...req.body, type });

    if (result.message == 'success') {
        res.status(200).json({ "status": "success", "data": result.body })
    } else {
        res.status(400).json({ "status": "error", "error-message": result.body })
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

    if (result.message == 'success') {
        res.status(200).json({ "status": "success", "data": result.body })
    } else {
        res.status(400).json({ "status": "error", "error-message": result.body })
    }

}

//user can update advert
const updatePropertyAdvert = async (req, res, next) => {
    let jsonData = JSON.parse(req.body.data)
    
     
    if (!req.body.data) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

    const files = req.files.photo;
    
    require('../config/cloudinary.config')

    let imageUrl = await cloudinary.uploader.upload(files.tempFilePath,(err, result)=>{
        return result;
    })

    let id = req.params.id;

    let owner =  decodedJwt(req.cookies.token).id;

    let result = await updateAdvert({...jsonData, owner, id: Number(id), "image_url" : imageUrl.url});

    if(result.message == 'success'){
        
        res.status(200).json({"status" : "success", "data": result.body[0]})
    }else{
        res.status(400).json({"status": "error", "error-message": result.body})
    }
}

//user can delete property advert
const deleteProperty = async (req, res, next) => {

    if (!req.body) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }

    let owner = decodedJwt(req.cookies.token).id;
    let id = req.params.id

    let result = await deletePropertyFromDb({ ...req.body, owner, id});

    if (result.message == 'success') {
        
        res.status(200).json({ "status": "success", "data": result.body })
    } else {
        res.status(400).json({ "status": "error", "error-message": result.body })
    }

}

//user can mark advert as sold
const markAdvertSold = async (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            "status": "error",
            "error-message": 'Content cannot be empty'
        })
    }
    
    let owner = decodedJwt(req.cookies.token).id;
    let id = req.params.id

    let result = await markSold({ ...req.body, owner, id });

    if (result.message == 'success') {
     
        res.status(200).json({ "status": "success", "data": result.body })
    } else {
        res.status(400).json({ "status": "error", "error-message": result.body })
    }

}

//user can post advert
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
        if (err) {
            res.status(400).send({
                'status' : 'error',
                'error-message' : err
            })
        }
    })

    let owner =  decodedJwt(req.cookies.token).id;
    
    let result = await postAdvert({ ...jsonData, owner, "image_url": imageUrl.url });

    if (result.message == 'success') {
       
        res.status(200).json({ "status": "success", "data": result.body[0] })
    } else {
        res.status(400).json({ "status": "error", "error-message": result.body })
    }

}

module.exports = {
    postPropertyAdvert, markAdvertSold,
     deleteProperty,
     viewProperties, 
    viewSpecificAdvert, 
    viewType,
    updatePropertyAdvert
}

