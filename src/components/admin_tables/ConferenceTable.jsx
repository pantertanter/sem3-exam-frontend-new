import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import apiFacade from "../../apiFacade";
import ConferenceModal from "./ConferenceModal";

function ConferenceTable() {
    const [content, setContent] = useState();
    const mounted = useRef(true);

    // this is such a mess
    // I'm using a single modal and state lifting
    const [selectedConference, setConference] = useState();

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleEdit = (conference) => {
        setConference(conference);
        handleShow();
    }
    const handleClose = () => {
        setConference(null);
        setShow(false);
    }
    const handleChange = (evt) => {
        const prop = evt.target.id;
        console.log(evt.target.selectedOptions);
        const value = evt.target.type === "select-multiple" ? evt.target.selectedOptions : evt.target.value;
        setConference({ ...selectedConference, [prop]: value })
    }
    const handleSubmit = () => {
        if (setConference) {
            // apiFacade.updateConference();
        }
        else {
            // apiFacade.createConference();
        }
        handleClose();
    };


    useEffect(() => {
        apiFacade.getAllConferences(setContent, mounted);
        return () => mounted.current = false;
    }, []);

    function SingleConferenceRow({ conference, handleEdit }) {
        const { id, name, location, capacity, date, time, talks } = conference;

        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{location}</td>
                <td>{capacity}</td>
                <td>{talks.map((t, i) => <p key={i}>{t.topic}</p>)}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>
                    <Button variant="warning" className="me-1" onClick={() => handleEdit(conference)}>Edit</Button>
                    <Button variant="danger">Delete</Button>
                </td>
            </tr>
        )
    }

    return (
        <div>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Talks</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th><Button variant="success" onClick={handleShow}>Create</Button></th>
                    </tr>
                </thead>
                {content &&
                    <tbody>
                        {content.map(c => <SingleConferenceRow key={c.id} conference={c} handleEdit={handleEdit} />)}
                    </tbody>}
            </Table>
            <ConferenceModal show={show} handleChange={handleChange} handleSubmit={handleSubmit} handleClose={handleClose} editConference={selectedConference} />
        </div>
    );
}

export default ConferenceTable;