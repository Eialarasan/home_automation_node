'use strict';

import { MediaType } from "../../config";
import Handler from "./Handler";
import { LoginValidation, Validation } from "./Validator";

export default [
    {
        path: '/register',
        type: MediaType.POST,
        middleware:[Validation],
        method:Handler.UserRegister,
        options: {}
    },
    {
        path: '/login',
        type: MediaType.POST,
        middleware: [LoginValidation],
        method: Handler.UserLogin,
        options: {}
    },
    
   
]