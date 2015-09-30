// Wrapper component subscribing to collections
AllWorkshops = React.createClass({
  displayName: 'AllWorkshops',
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handle = Meteor.subscribe('workshops');
    return {
      linkLoading: !handle.ready(),
      resource: Workshops.find({},{sort: {startAt: 1}}).fetch()
    };
  },
  renderWorkshops() {
    return this.data.resource.map((workshop) => {
      return <Workshop key={workshop._id} workshop={workshop} />;
    });
  },
  render() {
    if (this.data.linkLoading) {
      return <div className="loader">Loading</div>;
    }

    return <div className="workshops">{this.renderWorkshops()}</div>;
  }
});
