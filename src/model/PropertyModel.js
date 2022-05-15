const connection = require('../config/db.config')<<<<<<< can_post_property_advert
const { insertAdvertQuery, findbyIdInsertQuery, selectTypeSql} = require('../database/operations')


//view all props  type

const { insertAdvertQuery, findbyIdInsertQuery, updateSoldQuery, selectPropertiesSql, deletePropertySql,selectAllPropertiesQuery, selectTypeSql, selectAdvertSql, updateAdvertQuery, findAdvertQuery} = require('../database/operations')


//update advert


const updateAdvert = async (property) => {

    const {id , owner, status, price, state, city, address, type, image_url } = property;

    let message = await new Promise((resolve, reject) => {
      
        connection.query(updateAdvertQuery, [owner, status, price, state, city, address, type, image_url, owner, id], (err, initialResult) => {
            connection.query(findAdvertQuery, [id],(err, result) => {
               
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


//insert a new property into db
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
                    'body': { ...property, ...result }
                })
            }
        }
        )
    })
    return message
}



//insert a new property into db

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



//view all properties

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



const deletePropertyFromDb = async (property) => {
 
    const { id, owner } = property;

    let message = await new Promise((resolve, reject) => {
        connection.query(selectPropertiesSql, [id], (err, initialResult)=>{
            connection.query(deletePropertySql, [owner, id], (err, result) => {
                if (err) {
                    resolve({
                        'message': 'error',
                        'body': err
                    })
    
                } else {
                    resolve({
                        'message': 'success',
                        'body': { ...initialResult[0] }
                    })
                }
            }
            )
        })

       
    })
    return message
}


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

module.exports = { postAdvert, markSold, deletePropertyFromDb, selectAllProperties, selectPropertyType, selectSpecificAdvert, updateAdvert }


