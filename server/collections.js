// Publishing collections
Meteor.publish('workshops', function() {
  return Workshops.find({});
});

// Subscribe and unsubscribe a user to a workshop
Meteor.methods({
  removeSubscription: function(wid, date) {
    Meteor.users.update({_id: this.userId}, {$pull: {'profile.dates': date}});
    return Workshops.update({_id: wid}, {$pull: {attendees: this.userId}});
  },
  addSubscription: function(wid, date) {
    var cWorkshop = Workshops.findOne({_id: wid});
    var attendees = cWorkshop.attendees || [];
    var wdate = cWorkshop.startAt.toString();
    var user =Meteor.user();
    var userDates = []
    if (user.profile.dates) {
      userDates = user.profile.dates.map(function (date) {
            return date.toString();
      });
    }

    if (attendees.length < cWorkshop.seats && userDates.indexOf(wdate) === -1) {
      Meteor.users.update({_id: this.userId}, {$push: {'profile.dates': date}});
      return Workshops.update({_id: wid}, {$push: {attendees: this.userId}});
    }
    return false;
  },
  loadAttendees: function() {
    var user = Meteor.user();
    if (user && Roles.userIsInRole(user, ['admin'])) {
      var attendees = JSON.parse(Assets.getText('attendees.json'));
      for (var i = 0; i < attendees.length; i++) {
        var account = Meteor.users.findOne({'emails.address': attendees[i].email});
        if (!account) {
          var rnd = Math.floor(Math.random() * (999 - 100 + 1)) + 100
          Accounts.createUser({
            email: attendees[i].email,
            password: attendees[i].firstname + rnd,
            profile: {
              name: attendees[i].name,
              gender: attendees[i].gender,
              ticket: attendees[i].ticket
            }
          });
        }
      }
    }
  }
});

function onlyAdmin (userId) {
  var u = Meteor.users.findOne({_id:userId});
  return (u && u.isAdmin);
}

Workshops.allow({
  insert: onlyAdmin,
  remove: onlyAdmin,
  update: onlyAdmin
});

Meteor.startup(function () {
   process.env.MAIL_URL = Meteor.settings.mail_url;
   Accounts.emailTemplates.from = Meteor.settings.email_from;
   Accounts.emailTemplates.siteName = Meteor.settings.public.PortalTitle;
});
