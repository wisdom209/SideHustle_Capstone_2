const connection = require('../config/db.config')
const { insertAdvertQuery, findbyIdInsertQuery, selectTypeSql} = require('../database/operations')


//view all props  type


const selectPropertyType = async (property) => {
 
    const { type } = property;

    let message = await new Promise((resolve, reject) => {
        connection.query(selectTypeSql, [type], (err, result) => {
            if (err) {
                resolve({
                    'message': 'error',
                    'body': err
                })

            } else {
                resolve({
                    'message': 'success',
                    'body': result
                })
            }
        }
        )
    })
    return message
}

module.exports = { selectPropertyType }


//insert a new property into db
const postAdvert = async (property) => {
    console.log(property)
    const { owner, status, price, state, city, address, type, image_url } = property;

    let message = await new Promise((resolve, reject) => {

        connection.query(insertAdvertQuery, [owner, status, price, state, city, address, type, image_url], (err, initialResult) => {
            console.log("i",initialResult)
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

module.exports = { postAdvert }


