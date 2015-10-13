MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function () {
    return {
      portalTitle: Meteor.settings['public'].PortalTitle
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
      <header>
         <div className="navbar navbar-default" role="navigation">
             <div className="navbar-header">
                 <a className="navbar-brand" href="http://jsconf.co">
                 <img className="navbar__logo" src="http://jsconf.co/static/img/logo.1cb389a17782.png" alt="JSConf.co" width="54" height="54"/>
                  <span className="navbar__text">
                    <span>Colombia</span>
                    <span>Workshops</span>
                    <span>Oct 16th 2015</span>
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
