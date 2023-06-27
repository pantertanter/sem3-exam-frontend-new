import { NavLink } from "react-router-dom";

export default function NavItem({ to, text }) {
    function isActive({ isActive }) {
        return isActive ? "activeNavItem" : "";
    }

    return (
        <li><NavLink
            className={isActive}
            to={to}>{text}</NavLink>
        </li>
    );
}