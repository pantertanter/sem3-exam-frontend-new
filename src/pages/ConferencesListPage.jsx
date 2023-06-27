import { useEffect, useRef, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import apiFacade from "../apiFacade";

function ConferencesListPage() {
    const [content, setContent] = useState();
    const mounted = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {
        apiFacade.getAllConferences(setContent, mounted);
        return () => mounted.current = false;
    }, []);

    function SingleConference({ conference }) {
        const { id, name, location, capacity, date, time } = conference;

        return (
            <ListGroupItem action onClick={() => navigate(`${id}`)}>
                <h1>{name}</h1>
                <p>{location}</p>
                <p>Capacity: {capacity}</p>
                <p>{date}, {time}</p>
            </ListGroupItem>
        )
    }

    return (
        <div>
            {!content
                ? <p>Loading...</p>
                : <ListGroup>
                    {content.map(c => <SingleConference key={c.id} conference={c} />)}
                </ListGroup>}
        </div>
    );
}

export default ConferencesListPage;
