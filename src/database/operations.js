let insertQuery = 'INSERT INTO users (first_name, last_name, email, password, phone, address,is_Admin ) VALUES (?,?,?,?,?,?,?)';
let findUserQuery = 'SELECT * FROM users WHERE email = ?';

module.exports = { insertQuery,findUserQuery }