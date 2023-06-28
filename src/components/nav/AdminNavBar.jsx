import NavItem from "./NavItem";

export default function AdminNavBar({ loggedIn, user }) {

    return (
        <ul className="navBar">
            <NavItem to="jokes" text="Jokes" />
        </ul>
    );
}
