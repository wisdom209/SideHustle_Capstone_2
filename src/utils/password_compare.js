const bcrypt = require('bcrypt');

const isPasswordSameAsHash = async (password, hash) => {

    let isPasswordSame = await new Promise((resolve, reject)=>{
        bcrypt.compare(password, hash, (err, isSame)=>{
            if(err) console.log(err);
             resolve(isSame);
        })
    })

   return isPasswordSame;
}

module.exports = {isPasswordSameAsHash}