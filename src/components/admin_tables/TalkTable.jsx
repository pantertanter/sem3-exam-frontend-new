import { useEffect, useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import apiFacade from "../../apiFacade";

function TalkTable() {
    const [content, setContent] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.getAllTalks(setContent, mounted);
        return () => mounted.current = false;
    }, []);

    function SingleTalkRow({ talk }) {
        const { id, topic, duration, speakers, conference } = talk;

        function deleteTalk(id) {
            apiFacade.deleteTalk(id, mounted, () => {
                apiFacade.getAllTalks(setContent, mounted);
            })
        }

        return (
            <tr>
                <td>{id}</td>
                <td>{topic}</td>
                <td>{duration}</td>
                <td>{speakers.map((s, i) => <p key={i}>{s.name}</p>)}</td>
                <td>{conference}</td>
                <td>
                    <Button variant="warning" className="me-1">Edit</Button>
                    <Button variant="danger" onClick={() => deleteTalk(id)}>Delete</Button>
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
                        <th>Topic</th>
                        <th>Duration</th>
                        <th>Speakers</th>
                        <th>Conference</th>
                        <th><Button variant="success">Create</Button></th>
                    </tr>
                </thead>
                {content &&
                    <tbody>
                        {content.map(t => <SingleTalkRow key={t.id} talk={t} />)}
                    </tbody>}
            </Table>
        </div>
    );
}

export default TalkTable;