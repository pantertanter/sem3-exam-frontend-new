import NavItem from "./NavItem";

export default function AdminNavBar({ loggedIn, user }) {

    return (
        <ul className="navBar">
            <NavItem to="AllJokes" text="All jokes" />
            <NavItem to="Jokes" text="Iterate jokes" />
            <NavItem to="JokesByCat" text="Category based jokes" />
        </ul>
    );
}
