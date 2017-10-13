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
                 <img className="navbar__logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjczcHgiIGhlaWdodD0iMjczcHgiIHZpZXdCb3g9IjAgMCAyNzMgMjczIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0NC4xICg0MTQ1NSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+SnNDb25mIElzbzwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJKUy1Db25mLVYyIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWVudS1GaXhlZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4OC4wMDAwMDAsIC0zNS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Im1lbnUtZml4ZWQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4OC4wMDAwMDAsIDM1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkxvZ28tSnNDb25mIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iSnNDb25mLUlzbyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJDdWVycG8iIGZpbGw9IiNFQjMwMzEiIHBvaW50cz0iMTIwLjg5MTE5NCAxOTAuMDU0NjUzIDE3OS43NjU5ODEgODEuNTE3NzQ2IDIzMC44MjQ1NTMgOTAuMDE1MjI3IDI0NC4wMDc5NDMgMTA1LjgyMjE5NCI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iQWxhLWRlcmVjaGEiIGZpbGw9IiNFNERFNTgiIHBvaW50cz0iMTk5LjUwMzgxOCA4NC4zMjc0NjIzIDEwMy44NDMzNDYgMTkuMzg3MTE1NSA2NC4zNjQxODA3IDQyLjQ2NjMzNDUgMTI2LjA5NjU3MiAxMzUuMTY4MzQ5IDE5OS41MDM4MTggMTM1LjcwODI0MSI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iU29tYnJhLWFsYS1kZXJlY2hhIiBmaWxsPSIjQjhCMzNDIiBwb2ludHM9IjEwNC4xNjExMTYgMTkuMzg3MTE1NSAwIDc5LjgxNzc4NDQgNTAuMjk0OTkyMSAyMC4xMTIwMTM1Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJBbGEtaXpxdWllcmRhIiBmaWxsPSIjRTRERTU4IiBwb2ludHM9IjI0MS4wODYzMTkgMC4wMTQ5OTk2NjIzIDIzMC42Njc1NDYgODkuODk4ODcxIDE5OS41NjMxODEgODQuNzUwMTE2NiAxODUuNDYwMjM3IDc0Ljk3MDM5MjEiPjwvcG9seWdvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlNvbWJyYS1hbGEtaXoiIGZpbGw9IiNCOEIzM0MiIHBvaW50cz0iMjQxLjE1NzAzMiAwLjE5NzA5Njg1MyAyNzIuNTY4NTU4IDQ5LjU5OTI1MDEgMjM3LjA4MzM0NiAzNC4wMTU5Nzc2Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJDYWJlemEiIGZpbGw9IiM5MTBBMEIiIHBvaW50cz0iMjMwLjU2MjM2MyA5MC4wNzM0MDUgMjU5LjMyMjMxMyA5NC4xNzE3NTU0IDI1OS4zMjIzMTMgMTI0LjQ5NTg4MyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iQ29sYSIgZmlsbD0iIzA3MzBBMyIgcG9pbnRzPSIxMjEuNzI2OTQxIDE4OS4xNDEyNTggNzUuMTAyMDIgMjcyLjQ3MzEyMSAxNjMuNTE2NjMzIDIxMi4zNDE0ODcgMTU1Ljc1Mjc5NyAxNjYuMTI0ODcxIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQaWNvIiBmaWxsPSIjQjhCMzNDIiBwb2ludHM9IjI1OS4yMjgxNzUgMTI0LjI2NzY3OSAyNDQuMzczNzI3IDEyNy4yMTk5MjMgMjUyLjk3NjgwMyAxMTYuNjYzODEzIj48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" alt="JSConf.co" width="54" height="54"/>
                 <span className="navbar__text">
                     <span>JSConfCo Workshops</span>
                     <span>- Nov 3 2017</span>
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
