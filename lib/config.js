// Disabling users registration

// Accounts.config({
//   forbidClientAccountCreation : true
// });

// Admin panel configuration
AdminConfig = {
  name: Meteor.settings.public.PortalTitle,
  adminEmails: Meteor.settings.admins,
  collections: {
    Workshops: {
      tableColumns: [
         { label: 'Name', name: 'title' },
         { label: 'Workshoper', name: 'workshoper' },
         { label: 'Location', name: 'location'},
         { label: 'Hour', name: 'startAt'}
        ]
    }
  },
  userSchema: new SimpleSchema({
    'profile.name': {
       type: String
     },
     'profile.gender': {
       type: String,
       allowedValues: ['male', 'female']
     }
  }),
  dashboard: {
    homeUrl: '/dashboard',
    skin: 'black',
    widgets: [
      {
        template: 'adminCollectionWidget',
        data: {
          collection: 'Workshops',
          class: 'col-lg-3 col-xs-6'
        }
      },
      {
        template: 'adminUserWidget',
        data: {
          class: 'col-lg-3 col-xs-6'
        }
      }
    ]
  }
};


