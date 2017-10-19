// Component rendering every workshop
Workshop = React.createClass({
  displayName: 'Workshop',
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },
  propTypes: {
    workshop: React.PropTypes.object.isRequired
  },
  cancelRegistration(){
    Meteor.call('removeSubscription', this.props.workshop._id, this.props.workshop.startAt);
  },
  register(){
    Meteor.call('addSubscription', this.props.workshop._id, this.props.workshop.startAt);
  },
  render() {

    // Getting the right option for current user
    var actionButton = '';
    var user = this.data.currentUser;
    var attendees = this.props.workshop.attendees || [];
    var seatsAvailable = this.props.workshop.seats - attendees.length;
    var wdate = this.props.workshop.startAt.toString();
    var userDates = (user && user.profile && user.profile.dates) ? user.profile.dates.map((date) => date.toString()) : [];

    if (user && attendees.indexOf(user._id) === -1 && attendees.length < this.props.workshop.seats && userDates.indexOf(wdate) === -1) {
      actionButton = <button type="button" className="btn btn-success" onClick={this.register}>Register to attend</button>;
    }
    else if (user && attendees.indexOf(user._id) !== -1) {
      actionButton = <button type="button" className="btn btn-danger" onClick={this.cancelRegistration}>Cancel registration</button>;
    }
    else if (userDates.indexOf(wdate) !== -1) {
      actionButton = <span className="btn btn-warning">Incompatible schedule</span>
    }
    else if (attendees.length >= this.props.workshop.seats) {
      actionButton = <span className="btn btn-warning">Sold out</span>
    }

    // Rendering
    return <div key={this.props.workshop._id} className="panel panel-info">
      <div className="panel-heading">
        <h3 className="panel-title">{this.props.workshop.title} - {this.props.workshop.workshoper}</h3>
      </div>
      <div className="panel-body">
        <div className="row">
          <div className="col-md-9 col-xs-14">
            Starting: {this.props.workshop.startAt.toString()}
            <hr/>
            {this.props.workshop.intro}
            <div className='hidden' dangerouslySetInnerHTML={{__html: this.props.workshop.description}}></div>
          </div>
          <div className="col-md-2 col-xs-4">
            {actionButton}
          </div>
        </div>
      </div>
      <div className="panel-footer">
        {this.props.workshop.location} - Seats available {seatsAvailable}
      </div>
    </div>;
  }
});
