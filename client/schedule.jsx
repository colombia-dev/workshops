// User schedule component
Schedule = React.createClass({
  displayName: 'Schedule',
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handle = Meteor.subscribe('workshops');

    return {
      linkLoading: !handle.ready(),
      resource: Workshops.find({attendees: Meteor.userId()}, {sort: {startAt: 1}}).fetch(),
      currentUser: Meteor.user()
    };
  },
  renderWorkshops() {
    return this.data.resource.map((workshop) => {
      return <li className="list-group-item">{workshop.title} - {workshop.startAt.toString()}</li>;
    });
  },
  render() {
    if (this.data.linkLoading) {
      return <div className="loader">Loading</div>;
    }

    var userBlock = '';
    if (this.data.currentUser) {
        userBlock = <div>
          <h4>Schedule for {this.data.currentUser.profile.name}</h4>
            <ul className="list-group" key="scheduled">
              {this.renderWorkshops()}
            </ul>
        </div>;
    }

    return  <div key="schdeule-block">{userBlock}</div>;
  }
});
