'use strict';

import { authendicateToken } from "../../Security/JwtAuth";
import { MediaType } from "../../config";
import Handler from "./Handler";
import { Validation } from "./Validation";

export default [
    {
        path: '/list',
        type: MediaType.GET,
        middleware:[authendicateToken,Validation],
        method:Handler.getHomeList,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.addHome,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.updateHome,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.deleteHome,
        options: {}
    },
    
   
]