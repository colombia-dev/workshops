MainLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: function () {
    return {
      portalTitle: Meteor.settings['public'].PortalTitle
    };
  },
  render() {
    return <div>
      <header>
         <div className="navbar navbar-default" role="navigation">
             <div className="navbar-header">
                 <a className="navbar-brand" href="#">{this.data.portalTitle}</a>
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
      <footer>
        Made with love - Colombia.dev
      </footer>
    </div>
  }
});
