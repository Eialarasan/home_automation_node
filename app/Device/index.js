'use strict';

import { authendicateToken } from "../../Security/JwtAuth";
import { MediaType } from "../../config";
import Handler from "./Handler";

export default [
    {
        path: '/list',
        type: MediaType.GET,
        middleware:[authendicateToken],
        method:Handler.getDeviceList,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.addDevice,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.updateDevice,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.DELETE,
        middleware: [authendicateToken],
        method: Handler.deleteDevice,
        options: {}
    },
]