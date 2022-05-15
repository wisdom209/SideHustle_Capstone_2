const connection = require('../config/db.config')
const { insertAdvertQuery, findbyIdInsertQuery, updateSoldQuery} = require('../database/operations')



//insert a new property into db
const markSold = async (property) => {
 
    const {  status,owner,id } = property;

    let message = await new Promise((resolve, reject) => {
        connection.query(updateSoldQuery, [ status, owner, id], (err, result) => {
            if (err) {
                resolve({
                    'message': 'error',
                    'body': err
                })

            } else {
                resolve({
                    'message': 'success',
                    'body': { ...property  }
                })
            }
        }
        )
    })
    return message
}



//insert a new property into db
const postAdvert = async (property) => {

    const { owner, status, price, state, city, address, type, image_url } = property;

    let message = await new Promise((resolve, reject) => {

        connection.query(insertAdvertQuery, [owner, status, price, state, city, address, type, image_url], (err, initialResult) => {
            if (initialResult) {
                connection.query(findbyIdInsertQuery, [initialResult.insertId], (err, result) => {
                    if (err) {
                        resolve({
                            'message': 'error',
                            'body': err.sqlMessage
                        })

                    } else {
                        resolve({
                            'message': 'success',
                            'body': { ...result }
                        })
                    }

                })
            } else {
                resolve(
                    {
                        'message': 'error',
                        'body': 'property was not empty. Details must be complete'
                    }
                )

            }
        })
    })
    return message
}

module.exports = { postAdvert, markSold}


