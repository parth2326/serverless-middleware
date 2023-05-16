const db = require('./../models');

exports.checkAuth = async function (token) {
    
    if(!token){
        return false;
    }

    const accessToken = await db.oauth_access_tokens.findOne({
        where:{
            id:token
        }
    });

    if(!accessToken) {
        return false;
    }
    
    return accessToken;

}