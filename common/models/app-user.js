 'use strict';

module.exports = function(Appuser) {



Appuser.afterRemote('create', function(context, userInstance, next) {

      Appuser.login({"email": userInstance.email,"password": context.args.data.password},
                    (err, token) => {
                      if (err) {console.log('fail to login Appuser')};
                      console.log(token);
                      context.res.cookie('access_token', token.id);
                      context.res.cookie('user_id', token.userId);   
                      context.res.json(token);
                    }
      );

      
  
  }); 




};
