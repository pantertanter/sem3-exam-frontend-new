import { NavLink } from "react-router-dom";

export default function NavLoginItem({ user, loggedIn }) {
    function isActive({ isActive }) {
        return isActive ? "activeNavItem" : "";
    }

    return (<div className="navLoginItem">
        {loggedIn
            ? <div>
                <li><span className="userInfo">{user.username}</span> <span className="badge bg-primary rounded-pill">{user.roles.join(", ")}</span></li>
                <li><NavLink to="/logout">Sign out</NavLink></li>
            </div>
            : <li><NavLink className={isActive} to="/login">Sign in</NavLink></li>
        }
    </div>);
}