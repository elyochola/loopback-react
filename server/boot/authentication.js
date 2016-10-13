module.exports = function enableAuthentication(server) {
  // enable authentication
  delete server.models.appUser.validations.email;
  server.enableAuth();
};
