AccountsUIWrapper = React.createClass({
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template._loginButtons, React.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return <ul ref="container" className="nav navbar-nav navbar-right"></ul> ;
  }
});
