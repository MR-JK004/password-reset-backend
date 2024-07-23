import 'dotenv/config.js'
import bcrypt from 'bcryptjs'

const hashPassword = async(password)=>{
    try {
        let salt =  await bcrypt.genSalt(Number(process.env.SALT))
        let hashedPassword = await bcrypt.hash(password,salt)
        return hashedPassword

    } catch (error) {
        throw error
    }
}

const hashCompare = async(password,hashedPassword)=>{
    try {
       return await bcrypt.compare(password,hashedPassword)
    } catch (error) {
        throw error
    }
}



export default{
    hashPassword,
    hashCompare,
}