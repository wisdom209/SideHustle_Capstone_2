const { createUser } = require('../model/UserModel')


const signup_post = async (req, res, next) => {
    
    if (!req.body) {
        res.status(400).send({
            "status": 'error',
            "error-messsage": 'Content cannot be empty'
        })
    }

    let result = await createUser(req.body);

    if(result.message == 'success'){
        res.cookie('token', result.token);
        res.status(200).json({"status" : "success", "data": result.body})
    }else{
        res.status(400).json({"status": "error", "error-message": result.body})
    }
  
}

module.exports = {
    signup_post
}


