Schemas = {};

Workshops = new Mongo.Collection('workshops');

Schemas.Workshops = new SimpleSchema({
  title: {
    type: String,
    max: 256
  },
  intro: {
    type: String,
    max: 256
  },
  location: {
   type: String,
   allowedValues: ['Auditorium', 'Workshops room 1', 'Workshops room 2', 'Workshops room 3']
  },
  workshoper: {
    type: String,
    max: 256
  },
  seats: {
   type: Number,
   decimal: false,
   min: 1,
   defaultValue: 40
  },
  description: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor'
      }
    }
  },
  startAt: {
    type: Date,
    autoform: {
      afFieldInput: {
        type: 'bootstrap-datetimepicker'
      }
    }
  },
  attendees: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    autoform: {
      options: function () {
        return _.map(Meteor.users.find().fetch(), function (user) {
          return {
            label: user.profile.name + ' - ' + user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});

Workshops.attachSchema(Schemas.Workshops)
