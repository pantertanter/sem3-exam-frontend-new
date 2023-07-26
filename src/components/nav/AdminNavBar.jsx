import NavItem from "./NavItem";

export default function AdminNavBar({ loggedIn, user }) {

    return (
        <>
        <ul className="navBar">
            <b>&nbsp;&nbsp;&nbsp;&nbsp;This is the admin navigation bar</b>
            </ul>
        <ul className="navBar">  
            <NavItem to="AllJokes" text="All jokes" />
            <NavItem to="Jokes" text="Iterate jokes" />
            <NavItem to="JokesByCat" text="Category based jokes" />
            <NavItem to="CreateJoke" text="Create joke" />
        </ul>
        </>
    );
}
