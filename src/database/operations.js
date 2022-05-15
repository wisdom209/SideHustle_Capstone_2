let insertQuery = 'INSERT INTO users (first_name, last_name, email, password, phone, address,is_Admin ) VALUES (?,?,?,?,?,?,?)';

let findUserQuery = 'SELECT * FROM users WHERE email = ?';

let insertAdvertQuery = 'INSERT INTO property (owner, status, price, state, city, address, type, image_url ) VALUES (?,?,?,?,?,?,?, ?);';

let findbyIdInsertQuery = "SELECT * FROM property WHERE id = ?";

let updateSoldQuery = `UPDATE property SET status = ? WHERE owner= ? and id = ?`

let selectPropertiesSql = `DELETE FROM property WHERE owner = ? AND Id = ?`
let deletePropertySql = 'SELECT * FROM PROPERTY WHERE id = ?'

let selectAllPropertiesQuery= `SELECT * FROM property`;

module.exports = {
    insertQuery, insertAdvertQuery, findbyIdInsertQuery, findUserQuery, updateSoldQuery,selectPropertiesSql, deletePropertySql, selectAllPropertiesQuery
}


