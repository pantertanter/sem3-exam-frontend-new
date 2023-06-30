import NavItem from "./NavItem";

export default function AdminNavBar({ loggedIn, user }) {

    return (
        <ul className="navBar">
            <NavItem to="allJokes" text="All jokes" />
            <NavItem to="jokes" text="Iterate jokes" />
        </ul>
    );
}
