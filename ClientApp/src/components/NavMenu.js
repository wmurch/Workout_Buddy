import React, { Component } from 'react'
import { Nav, NavItem, NavLink, NavbarBrand, Container } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'

class NavMenu extends Component {
  render() {
    return (
      <Container color="#2f518d">
        <NavbarBrand tag={Link} to="/" className="mt-6">
          <h5>
            <span className="font-weight-bold">FitTrax</span>
          </h5>
        </NavbarBrand>
        <Nav tabs className="border-bottom box-shadow mb-6">
          <NavItem>
            <NavLink tag={Link} to="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/profile">
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/build">
              Build
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/logout">
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    )
  }
}
export default withRouter(NavMenu)
