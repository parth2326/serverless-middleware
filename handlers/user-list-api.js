const BaseHandler = require("../core/base-handler");
const db = require('./../models');

class UserListAPI extends BaseHandler {
    
    async execute(req) {

        const userList = await db.users.findAll({limit:10});

        return {
            data: userList,
            status: 'success'
        }  
    }

}

const userListAPI = new UserListAPI();
module.exports.handler = userListAPI.run.bind(userListAPI);