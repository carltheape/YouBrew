import React from "react";
var sessionStorage = require('web-storage')().sessionStorage;

const isLoggedIn = sessionStorage.get("access_token");
const isAdmin = sessionStorage.get("admin_token");

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
        active: '/'
    }
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(e) {
    this.setState({
      active: e
    });
  }
  render() {

    let homeStyle;
    let availabilityStyle;
    let mySalesStyle;
    let requestStyle;
    let recipesStyle;
    let administratorStyle;

    switch (this.state.active) {
      case "home":
        homeStyle = {color: "rgb(231,175,95)"}
        break;
      case "availability":
        console.log("Availability");
        availabilityStyle = {color: "rgb(231,175,95)"}
        break;
      case "mysales":
        console.log("My Sales");
        mySalesStyle = {color: "rgb(231,175,95)"}
        break;
      case "request":
        console.log("Request");
        requestStyle = {color: "rgb(231,175,95)"}
        break;
      case "recipes":
        console.log("Recipes");
        recipesStyle = {color: "rgb(231,175,95)"}
        break;
      case "administrator":
        console.log("Administrator");
        administratorStyle = {color: "rgb(231,175,95)"}
        break;
      default:

    }

    return(
      <nav className="navbar navbar-default navbar-top">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <img id="logo" alt="YouBrew" src="assets/images/YouBrewv3.png" />
        </div>
        <div id="navbar" className="navbar-collapse collapse col-lg-7 col-lg-offset-4">
          <ul className="nav navbar-nav navbar-right">
            <li><a onClick={() => this.handleNavClick("/")} style={homeStyle} className="open" href="/">Home</a></li>
            <li><a onClick={() => this.handleNavClick("availability")} style={availabilityStyle} href="availability">Availability</a></li>
            <li><a onClick={() => this.handleNavClick("mysales")} style={mySalesStyle} href="mysales">My Sales</a></li>
            <li><a onClick={() => this.handleNavClick("request")} style={requestStyle} href="request">Request</a></li>
    		    <li><a onClick={() => this.handleNavClick("recipes")} style={recipesStyle} href="myrecipes">Recipes</a></li>
            <li>{isAdmin != undefined ? (<a onClick={() => this.handleNavClick("administrator")} style={administratorStyle} href="admin" className="administrator">Administrator</a>) : (<div />)}</li>
            <li>
        {isLoggedIn != undefined ? (
          <a href="/signin"><button style={{ float: "right" }} className="btn btn-warning" onClick={(event) => { sessionStorage.remove("access_token"); sessionStorage.remove("admin_token");}}>Logout</button></a>
          ) : (
            <div />
          )}
        </li>
          </ul>

        </div>
      </nav>
    )
  }
}

export default Nav;
