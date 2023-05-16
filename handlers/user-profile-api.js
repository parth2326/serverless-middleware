const BaseHandler = require("../core/base-handler");
const db = require('./../models');

class UserProfileAPI extends BaseHandler {

    constructor(){
        super();
        this.requiredAuth = true;
    }
    
    async execute(req) {

        const user = await db.users.findAll({
            where:{
                id: req.params.id
            }
        });

        return {
            data: user,
            status: 'success'
        }  
    }

}

const userProfileAPI = new UserProfileAPI();
module.exports.handler = userProfileAPI.run.bind(userProfileAPI);