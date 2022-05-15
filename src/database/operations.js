let insertQuery = 'INSERT INTO users (first_name, last_name, email, password, phone, address,is_Admin ) VALUES (?,?,?,?,?,?,?)';
let findUserQuery = 'SELECT * FROM users WHERE email = ?';

let insertAdvertQuery = 'INSERT INTO property (owner, status, price, state, city, address, type, image_url ) VALUES (?,?,?,?,?,?,?, ?);';
let findbyIdInsertQuery = "SELECT * FROM property WHERE id = ?";

const selectTypeSql = `SELECT * FROM property WHERE type = ?`

module.exports = {
    insertQuery, findUserQuery, insertAdvertQuery, findbyIdInsertQuery, selectTypeSql
}


