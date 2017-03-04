const START_DATE = new Date(Meteor.settings.public.startDate)
const UNLIMITED_DATE = new Date(Meteor.settings.public.unlimitedDate)
const USER_DATES_LIMIT = Meteor.settings.public.limit

// Publishing collections
Meteor.publish('workshops', function() {
  return Workshops.find({});
});

// if ( Meteor.users.find().count() === 0 ) {
//   console.log('Creating admin user!')
//   Accounts.createUser({
//       username: 'g.avella@gmail.com',
//       email: 'g.avella@gmail.com',
//       password: 'asdfasdf',
//       profile: {
//           name: 'David Avellaneda',
//           company: 'company',
//       }
//   });
// }

// Subscribe and unsubscribe a user to a workshop
Meteor.methods({
  getWorkshopAttendees: function(workshopId) {
    var user = Meteor.user()
    if (user && Roles.userIsInRole(user, ['admin'])) {
      const workshop = Workshops.findOne({_id: workshopId})
      if (Array.isArray(workshop.attendees)) {
        return workshop.attendees.map(function(userId) {
          const userInW = Meteor.users.findOne({_id: userId})
          return userInW && userInW.profile.name
        })
      }
    }
    return []
  },
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

    var now = new Date()
    var subscriptionLimit

    if (now < START_DATE) {
      subscriptionLimit = 0
    } else if (now < UNLIMITED_DATE) {
      subscriptionLimit = USER_DATES_LIMIT
    } else {
      subscriptionLimit = 99999
    }

    if (attendees.length < cWorkshop.seats && userDates.indexOf(wdate) === -1 && userDates.length < subscriptionLimit) {
      Meteor.users.update({_id: this.userId}, {$push: {'profile.dates': date}});
      return Workshops.update({_id: wid}, {$push: {attendees: this.userId}});
    }
    return false;
  },
  loadAttendees: function() {
    var user = Meteor.user()
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
  var user = Meteor.users.findOne({_id:userId});
  return (user && Roles.userIsInRole(user, ['admin']));
}

Workshops.allow({
  insert: onlyAdmin,
  remove: onlyAdmin,
  update: onlyAdmin
});

Workshops.helpers({
  attendeesList: function () {
    return '<a href="/attendees-list">Attendees list</a>';
  }
});

Meteor.startup(function () {
   process.env.MAIL_URL = Meteor.settings.mail_url;
   Accounts.emailTemplates.from = Meteor.settings.email_from;
   Accounts.emailTemplates.siteName = Meteor.settings.public.PortalTitle;
});
