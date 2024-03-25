const getUsers ="SELECT * from users";

const getPainters = " SELECT * from users where  role = 'PAINTER'"
const createUser = "INSERT INTO users(first_name, last_name, email, role, phone, password) VALUES($1, $2, $3, $4, $5, $6)";


const getUserByEmail = "SELECT * FROM users where email = $1;"

const getUserByUserId = "SELECT * FROM users where user_id = $1;"

const checkIfUserWithEmailExist= "SELECT * FROM users where email = $1;"

const updateUserDetails = "UPDATE users SET first_name = $1,last_name= $2, email= $3, role= $4, phone= $5 where user_id = $6"


module.exports = {getUsers,
    createUser,
    checkIfUserWithEmailExist,
    updateUserDetails,
    getUserByEmail,
    getPainters,
    getUserByUserId
}
