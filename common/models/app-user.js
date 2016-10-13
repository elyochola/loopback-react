'use strict';

module.exports = function(Appuser) {



   Appuser.afterRemote('create', (req, res) => {
    
    Appuser.remoteMethod(registrationLogin(req.result.email, req.result.password, {
                            returns: [
                              { arg: 'bodyStream', type: 'stream', root: true },
                              { arg: 'content-type', type: 'string', http: { target: 'header' } }
                            ]
                          } ))
    
   });


   function registrationLogin(email, password, cb) {
    Appuser.login(
        {email: email, password: password},
        (err, token) => {

          if (err) {console.log('fail to login Appuser')};
          cb();
        }
      );
   }


//    function streaming(cb) {
//   var bodyStream = // create response stream from file
//   var contentType = // set from file extension
//   cb(null, bodyStream, contentType);
// }

// loopback.remoteMethod(streaming, {
//   returns: [
//     { arg: 'bodyStream', type: 'stream', root: true },
//     { arg: 'content-type', type: 'string', http: { target: 'header' } }
//   ]
// });

};
