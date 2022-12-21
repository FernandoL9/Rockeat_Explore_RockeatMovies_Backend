const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')
const {hash, compare} = require('bcrypt')

class UsersController {

  async create(request, response) {
   const {name, email, password} = request.body

      const database = await sqliteConnection()
      const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      if(checkUserExists) {
        throw new AppError("Email already exists")
      }
      
      const hashedPassword = await hash(password, 8)

      await database.run(
        "INSERT INTO users (name,email,password) VALUES (?,?,?)", 
        [name,email,hashedPassword])

      return response.status(201).json({ name, email, password})
  }

  async update(request, response){
    const { name, email, password, old_password} = request.body
    const user_id = request.user.id


    const database = await sqliteConnection(); // connect server async
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]) // consulta na base para checar usuarios

    // console.log(user)

    if(!user) {
      throw new AppError("User not found")
    }

    const userCheckUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    //console.log(userCheckUpdateEmail)

    if(userCheckUpdateEmail && userCheckUpdateEmail.id !== user.id) {
      throw new AppError("This email already exists")
    }
    
    user.name = name ?? user.name
    user.email = email ?? user.email

    if(password && !old_password){
      throw new AppError("Old password not informed")
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password)
      
      if(!checkOldPassword){
        throw new AppError("Old passaword invalid")
      }

      user.password = await hash(password, 8)
    }


    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
    [user.name, user.email, user.password, user_id])

    return response.json()

  }
  
}

module.exports = UsersController;