import React, { Component } from 'react'
import { Container, Nav, NavItem, NavbarBrand, NavLink } from 'reactstrap'
import { Link } from 'react-router-dom'
import './NavMenu.css'

export class NavMenu extends Component {
  static displayName = NavMenu.name
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
      <header>
        <Container className="top-nav">
          <NavbarBrand tag={Link} className="text-primary" to="/">
            FitTrax
          </NavbarBrand>
          <Nav pills color="primary">
            <NavItem>
              <NavLink tag={Link} className="text-primary" to="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-primary" to="/profile">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-primary" to="/build">
                Build
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/logout">
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </header>
    )
  }
}
