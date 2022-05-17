const connection = require('../config/db.config')
const { insertAdvertQuery, findPropertyById, updateSoldQuery, selectPropertiesSql, deletePropertySql, selectAllPropertiesQuery, selectTypeSql, selectAdvertSql, updateAdvertQuery, findUpdatedAdvertQuery } = require('../database/operations')


//update advert model
const updateAdvert = async (property) => {

    const { id, owner, status, price, state, city, address, type, image_url } = property;

    let message = await new Promise((resolve, reject) => {

        connection.query(updateAdvertQuery, [owner, status, price, state, city, address, type, image_url, owner, id], (err, initialResult) => {

            connection.query(findUpdatedAdvertQuery, [id, owner], (err, result) => {

                if (err) {
                    resolve({
                        'message': 'error',
                        'body': err
                    })

                } else {
                    
                    if (result.length === 0) {
                        resolve({
                            'message': 'error',
                            'body': ["User cannot update this advert or advert does not exist"]
                        })

                    }
                    resolve({
                        'message': 'success',
                        'body': { ...result }
                    })
                }
            })
        }
        )
    })
    return message
}

//select specific advert model
const selectSpecificAdvert = async (property) => {

    const { id } = property;


    let message = await new Promise((resolve, reject) => {
        connection.query(selectAdvertSql, [id], (err, result) => {

            if (err) {
                resolve({
                    'message': 'error',
                    'body': err
                })

            } else {
                resolve({
                    'message': 'success',
                    'body': { ...result }
                })
            }
        }
        )
    })
    return message
}

//select property type model
const selectPropertyType = async (property) => {

    const { type } = property;

    let message = await new Promise((resolve, reject) => {
        connection.query(selectTypeSql, [type], (err, result) => {
            console.log(result)
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

//view all properties model
const selectAllProperties = async () => {

    let message = await new Promise((resolve, reject) => {
        connection.query(selectAllPropertiesQuery, (err, result) => {
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

//delete a property model
const deletePropertyFromDb = async (property) => {

    const { id, owner } = property;

    let message = await new Promise((resolve, reject) => {
        connection.query(selectPropertiesSql, [id], (err, initialResult) => {
            connection.query(deletePropertySql, [owner, id], (err, result) => {
               
                if (err) {
                    resolve({
                        'message': 'error',
                        'body': err
                    })

                } else {
                    if(result.affectedRows === 0){
                        resolve({
                            'message' : 'error', 
                            'body': 'User cannot delete this advert'
                        })
                    }
                    if (initialResult[0]) {
                        resolve({
                            'message': 'success',
                            'body': { ...initialResult[0] }
                        })
                    } else {
                        resolve({
                            'message': 'success',
                            'body': { ...initialResult }
                        })
                    }

                }
            }
            )
        })


    })
    return message
}

//mark a property as sold model
const markSold = async (property) => {

    const { status, owner, id } = property;

    let message = await new Promise((resolve, reject) => {
        connection.query(updateSoldQuery, [status, owner, id], (err, initialResult) => {
           connection.query(findUpdatedAdvertQuery, [id, owner], (err,result )=>{

            if (err) {
                resolve({
                    'message': 'error',
                    'body': err
                })

            } else {
            
                resolve({
                    'message': 'success',
                    'body': { ...result }
                })
            }
           })
        }
        )
    })
    return message
}

//post a property advert model
const postAdvert = async (property) => {

    const { owner, status, price, state, city, address, type, image_url } = property;

    let message = await new Promise((resolve, reject) => {

        connection.query(insertAdvertQuery, [owner, status, price, state, city, address, type, image_url], (err, initialResult) => {

            if (initialResult) {
                connection.query(findPropertyById, [initialResult.insertId], (err, result) => {
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

module.exports = { postAdvert, markSold, deletePropertyFromDb, selectAllProperties, selectPropertyType, selectSpecificAdvert, updateAdvert }


