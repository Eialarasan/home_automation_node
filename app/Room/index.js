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
        method:Handler.getRoomList,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.addRoom,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.updateRoom,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.deleteRoom,
        options: {}
    },
    
   
]