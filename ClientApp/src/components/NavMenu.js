import React, { Component } from 'react'
import { Nav, NavItem, NavLink, NavbarBrand, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

export class NavMenu extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <Container>
        <NavbarBrand tag={Link} to="/" className="mt-6">
          <h1>
            <span className="font-weight-bold">FitTrax</span>
          </h1>
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
