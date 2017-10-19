const START_DATE = new Date(Meteor.settings.public.startDate);
const UNLIMITED_DATE = new Date(Meteor.settings.public.unlimitedDate);
const USER_DATES_LIMIT = Meteor.settings.public.limit;

function printAttendeeList (attendees) {
  if (attendees) {
    if (attendees.length) {
      return (
        <div>
          <b>Attendees:</b>
          {attendees.map(printAttendee)}
        </div>
      )
    } else {
      return <i>No attendees registered for this workshop</i>
    }
  } else {
    return 'loading...'
  }
}

function printAttendee (attendeeName, index) {
  return <div key={index}>{index + 1}. {attendeeName}</div>
}

// Component rendering every workshop
Workshop = React.createClass({
  getInitialState() {
    return {
      showDescription: false,
      showAttendees: false
    }
  },
  displayName: 'Workshop',
  mixins: [ReactMeteorData],
  getMeteorData() {
    var subscriptionLimit;
    var now = new Date();

    if (now < UNLIMITED_DATE) {
      subscriptionLimit = USER_DATES_LIMIT
    } else {
      subscriptionLimit = 99999
    }

    Meteor.subscribe('users')

    return {
      currentUser: Meteor.user(),
      limit: subscriptionLimit,
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
  handleToggleShowMore(e){
    e.preventDefault()
    this.setState({
      showDescription: !this.state.showDescription
    })
  },
  handleToggleAttendees(){
    if (!this.state.showAttendees) {
      Meteor.call('getWorkshopAttendees', this.props.workshop._id, function(err, attendees){
        if (err) {
          console.error(err)
        } else {
          this.setState({
            attendees: attendees
          })
        }
      }.bind(this))
      this.setState({
        showAttendees: true
      })
    } else {
      this.setState({
        showAttendees: false,
        attendees: null
      })
    }
  },
  render() {
    // Getting the right option for current user
    var actionButton = '';
    var now = new Date();
    var user = this.data.currentUser;
    var limit = this.data.limit;
    var attendees = this.props.workshop.attendees || [];
    var seatsAvailable = this.props.workshop.seats - attendees.length;
    var wdate = this.props.workshop.startAt.toString();
    var userProfile = (user && user.profile) ? user.profile : {};
    var userDates = (userProfile && userProfile.dates) ? userProfile.dates.map((date) => date.toString()) : [];
    var userSpots = (userProfile && userProfile.dates) ? userProfile.dates.length : 0;
    var areThereSeatsAvailable = attendees.length < this.props.workshop.seats;
    var didRegistrationStarted = now > START_DATE;
    var isAdmin = user && Roles.userIsInRole(user, ['admin'])

    if (user && attendees.indexOf(user._id) === -1 && areThereSeatsAvailable && userDates.indexOf(wdate) === -1 && userSpots < limit  && didRegistrationStarted) {
      actionButton = <button type="button" className="btn btn-primary" onClick={this.register}>Register to attend</button>;
    }
    else if (user && attendees.indexOf(user._id) !== -1) {
      actionButton = <button type="button" className="btn btn-danger" onClick={this.cancelRegistration}>Cancel registration</button>;
    }
    else if (userDates.indexOf(wdate) !== -1 || userSpots >= limit) {
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
          <div className="col-md-8 col-xs-14">
            Starting: {this.props.workshop.startAt.toString()}
            <hr/>
            <div dangerouslySetInnerHTML={{
              __html: this.props.workshop[this.state.showDescription ? 'description' : 'intro']
            }}></div>
            <br/>
            <a
              href="#"
              className="link-show-more-less"
              onClick={this.handleToggleShowMore}
            >
              show {this.state.showDescription ? 'less' : 'more'}
            </a>
            <div>
              {
                this.state.showAttendees ?
                  printAttendeeList(this.state.attendees)
                  : null
              }
            </div>
          </div>
          <div className="col-md-4 col-xs-14 text-right">
            {actionButton}
          </div>
        </div>
      </div>
      <div className="panel-footer" >
        {
          isAdmin ?
            <button
              className="btn btn-info"
              onClick={this.handleToggleAttendees}
            >
              {this.state.showAttendees ? 'Hide' : 'Show'} Attendee List
            </button>
            : null
        }
        {this.props.workshop.location} - Seats available: {seatsAvailable}
      </div>
    </div>;
  }
});
