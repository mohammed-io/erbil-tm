import { NavLink, Link } from "react-router-dom";
import { Container } from "./container";
import Logo from "../assets/images/toastmasters-logo-color-png.png";

export function NavbarLink({ children, to }) {
  return (
    <NavLink to={to}
      className={
        ({ isActive }) => `transition-colors font-bold border-b-[3px] border-transparent py-2 px-1 hover:border-yellow-500 ${isActive ? "border-yellow-600" : ""}`
      }>
      {children}
    </NavLink>
  )
}

export function Navbar() {
  return (
    <div className="bg-tm-500 w-full">
      <Container className="mx-auto">
        <nav className="h-16 flex items-center ">
          <div className="h-full hidden md:block">
            <Link to="/">
              <img className="h-full py-2 flex-1" src={Logo} alt="Toastmasters logo" />
            </Link>
          </div>
          <div className="flex flex-1 justify-between items-center px-4 text-white">
            <ul className="left-nav flex space-x-4">
              <li>
                <NavbarLink to="/">Home</NavbarLink>
              </li>
              <li>
                <NavbarLink to="/posts-planner">Posts Planner</NavbarLink>
              </li>
              <li>
                <NavbarLink to="/event-planner">Event Planner</NavbarLink>
              </li>
            </ul>
            <ul className="righ-nav flex space-x-4">
              <li>
                <NavbarLink to="/login">Login</NavbarLink>
              </li>
            </ul>
          </div>

        </nav>
      </Container>
    </div >
  )
}