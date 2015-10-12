FlowRouter.route('/', {
  action: function() {
    ReactLayout.render(MainLayout);
  }
});

FlowRouter.route('/admin/load', {
  triggersEnter: [function(context, redirect) {
    Meteor.call('loadAttendees');
    redirect('/admin/view/Users');
  }],
});
