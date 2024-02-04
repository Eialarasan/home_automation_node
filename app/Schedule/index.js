'use strict';

import { authendicateToken } from "../../Security/JwtAuth";
import { MediaType } from "../../config";
import Handler from "./Handler";
import { Validation } from "./Validation";

export default [
    {
        path: '/list',
        type: MediaType.GET,
        middleware:[authendicateToken],
        method:Handler.getScheduleList,
        options: {}
    },
    {
        path: '/add',
        type: MediaType.POST,
        middleware: [authendicateToken,Validation],
        method: Handler.addSchedule,
        options: {}
    },
    {
        path: '/update',
        type: MediaType.POST,
        middleware: [authendicateToken,Validation],
        method: Handler.updateSchedule,
        options: {}
    },
    {
        path: '/delete',
        type: MediaType.POST,
        middleware: [authendicateToken],
        method: Handler.deleteSchedule,
        options: {}
    },
]