import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import Transaction from '../models/transaction.model.js'


const userResolver = {
  Mutation: {
    signUp: async(_,{input},context) => {

      try {
        const {username, name, password, gender} = input

        if(!username || !name || !password || !gender) throw new Error('All field needs to be filled')

        const existingUser = await User.findOne({username})
        if(existingUser) throw new Error('User already exists')

        //* Disguise the password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //* API request for profile pics
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        //* Saving user to the database
        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        await newUser.save()
        await context.login(newUser)
        return newUser

      } catch (error) {
        console.error('Error in create user',error)
        throw new Error(error.message || 'Internal server error')
      }
    },


    login: async(_,{input},context) => {

      try {
        const {username, password} = input
        if(!username || !password) throw new Error('Please fill in all fields')
        const {user} = await context.authenticate('graphql-local',{username,password})

        await context.login(user)
        return user
      } catch (error) {
        console.error('Error when login',error)
        throw new Error(error.message || 'Internal server error')
      }
    },


    logout: async(_,__,context) => {

      try {

        await context.logout()
        context.req.session.destroy((error)=>{
          if(error) throw new Error
        })
        context.res.clearCookie('connect.sid')
        return {message:'Logged out successfully'}

      } catch (error) {
        console.error('Error when logout',error)
        throw new Error(error.message || 'Internal server error')
      }
    },

  },


  Query: {
    authUser: async(_,__,context) => {

      try {
        const user = await context.getUser()
        return user
      } catch (error) {
        console.error('Error in authentication',error)
        throw new Error('Internal server error')
      }

    },

    user: async(_,{userId}) => {
      
      try {
        const user = await User.findById(userId)
        return user
      } catch (error) {
        console.error('Error in user query',error)
        throw new Error(error.message || 'Internal server error')
      }

    }
  },

  //* Adding relationship GraphQL
  User: {
    transactions: async(parent) => {
      try {
        const transactions = await Transaction.find({userId:parent._id})
        return transactions
      } catch (error) {
        console.error('Error in user.transaction resolver',error)
        throw new Error(error.message || 'Internal server error')
      }
    }
  }
}

export default userResolver