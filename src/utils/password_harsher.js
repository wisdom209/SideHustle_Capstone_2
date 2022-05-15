const bcrypt = require('bcrypt');


const passwordHasher = async (password) => {
    let hash = await new Promise((resolve, reject)=>{
        bcrypt.hash(password,10, (err,hashedPassword)=>{
            if(err) console.log(err)
            resolve(hashedPassword)
        })
    })
    return hash;
}

module.exports = ({
    passwordHasher
})
