Accounts.validateNewUser(function (user) {
  if (!user.emails[0].address) {
    throw new Meteor.Error(403, 'You should provide a valid email.');
  }
  return true
  // console.log(user.emails[0].address)
  // throw new Meteor.Error(403, "Username must have at least 3 characters");
});
