import NavItem from "./NavItem";

export default function AdminNavBar({ loggedIn, user }) {

    return (
        <ul className="navBar">
            <NavItem to="conferences" text="Conferences" />
            <NavItem to="talks" text="Talks" />
            <NavItem to="speakers" text="Speakers" />
        </ul>
    );
}
