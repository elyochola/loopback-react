 'use strict';

module.exports = function(Appuser) {



Appuser.afterRemote('create', function(context, userInstance, next) {
      console.log(userInstance.email)
      console.log(context.args.data.password)
      Appuser.login({email: userInstance.email,password: context.args.data.password},
                    (err, token) => {
                      if (err) {console.log('fail to login Appuser'); return false};
                      context.res.cookie('access_token', token.id);
                      context.res.cookie('user_id', token.userId);
                      console.log(token);
                      context.res.json({user:{userId: token.userId, id:token.id}});

                    }
      );
  }); 




};
