import mongoose from './index.js';
import { validateEmail,validatePassword } from '../common/Validations.js';

const userSchema = new mongoose.Schema({
    name : String,
    email: { 
        type: String, 
        unique: true ,
        validate:{
            validator: validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date
});

const user = mongoose.model('user', userSchema);


export default user;
