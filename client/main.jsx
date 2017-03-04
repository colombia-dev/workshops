MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function () {
    return {
      portalTitle: Meteor.settings['public'].PortalTitle,
      currentUser: Meteor.user()
    };
  },
  render() {
    var noUser;

    if (!this.data.currentUser) {
      noUser = <div className="alert alert-warning" role="alert">If you don't have a user yet, please follow these instructions to register and get your spot:
        <span/> <a href="http://jsconf.co/workshops/" className="text-info" target="_blank">Registration Instructions</a>
      </div>
    }

    return <div>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
      <header>
         <div className="navbar navbar-default" role="navigation">
             <div className="navbar-header">
                <a className="navbar-brand" href="http://jsconf.co">
                  <span className="navbar__conference">
                    ScaleConf Colombia
                  </span>
                  <span className="navbar__date">
                    Medellín, Mar 24-25th 2017
                  </span>
                </a>
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
             </div>
             <div className="navbar-collapse collapse">
                <AccountsUIWrapper />
             </div>
         </div>
      </header>
      <main>
        <div className="container">
          {noUser}
          <div className="row">
            <div className="col-md-9 col-xs-13">
              <AllWorkshops />
            </div>
            <div className="col-md-2 col-xs-13">
              <Schedule />
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  }
});
