const { createUser,findUser } = require('../model/UserModel')

//user can sign in
const signin_post = async (req, res, next) => {
    const { email, password } = req.body;

    if (!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty'
        })
    }

    let message = await findUser({email,password});

    res.cookie('token', message.token)
    
    if(message.status == 'error'){
        res.status(400).json( {"status": "error", "error-message" : message.body})
    }else{
        res.status(200).json({'status': 'success', 'data': message.body})
    }
}

//user can sign up
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
    signup_post, signin_post
}


