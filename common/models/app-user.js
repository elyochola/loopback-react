'use strict';

module.exports = function(Appuser) {



Appuser.afterRemote('create', function(context, userInstance, next) {

      Appuser.login({"email": userInstance.email,"password": context.args.data.password},
                    (err, token) => {
                      if (err) {console.log('fail to login Appuser')};
                      console.log(token);
                      // context.res.setHeader("Set-Cookie",'userId='+ token.userId);
                      // context.res.setHeader("Set-Cookie",'id='+ token.id);
                      // Encryption like password?
                      context.res.cookie('access_token', token.userId.id, {
                                         signed: context.req.signedCookies ? true : false,
                                        });
                      context.res.json(token);
                    }
      );

      
  
  }); 




};
