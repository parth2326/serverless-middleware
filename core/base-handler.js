const db = require('./../models');
const { checkAuth } = require('./auth-middleware');

class BaseHandler {
    
    async run(event, context) {

        try {

            const req = {};
            req.body = typeof event.body === 'string' ? JSON.parse(event.body): event.body;
            req.query = event.queryStringParameters;
            req.params = event.pathParameters;
            req.headers = event.headers;

            if (this.requiredAuth) {
                const accessToken = await checkAuth(req.headers.Authorization || req.headers.authorization);
                if(!accessToken) {
                    return this.unauthorized();
                }

                req.user_id = accessToken.user_id;
            }

            const response = await this.execute(req);
            return {
                statusCode: 200,
                Headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(response)
            }

        } catch (e) {

            console.error(e);

            return {
                statusCode: 500,
                Headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status:'error',
                    message:'Internal server error.'
                })
            }


        } finally {

        }
    }

    unauthorized(){
        return {
            statusCode: 401,
            Headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status:'error',
                message:'Unauthorized Request.'
            })
        }
    }

}

module.exports = BaseHandler;