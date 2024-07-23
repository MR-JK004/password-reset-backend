import {Router} from 'express'
import userService from '../service/userService.js'

const routes = Router();
routes.post('/user/forget-password',userService.forgetPassword)
routes.post('/user/reset-password',userService.resetPassword)
routes.post('/user/register',userService.createUser)
routes.post('/user/login',userService.authenticateUser)

export default routes