import { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, Modal } from "react-bootstrap";
import apiFacade from "../../apiFacade";

function ConferenceModal({ show, handleChange, handleSubmit, handleClose, editConference }) {
    const [talks, setTalks] = useState();
    const mounted = useRef(true);

    useEffect(() => {
        apiFacade.getAllTalks(setTalks, mounted);
        return () => mounted.current = false;
    }, []);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editConference && editConference.id ? "Edit" : "Create"} conference</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <input type="hidden" id="id" value={editConference ? editConference.id : 0} />
                    <FormGroup controlId="name" className="mb-3">
                        <FormLabel>Name</FormLabel>
                        <FormControl type="text" onChange={handleChange} value={editConference ? editConference.name : ""} />
                    </FormGroup>
                    <FormGroup controlId="location" className="mb-3">
                        <FormLabel>Location</FormLabel>
                        <FormControl type="text" onChange={handleChange} value={editConference ? editConference.location : ""} />
                    </FormGroup>
                    <FormGroup controlId="capacity" className="mb-3">
                        <FormLabel>Capacity</FormLabel>
                        <FormControl type="number" onChange={handleChange} value={editConference ? editConference.capacity : ""} />
                    </FormGroup>
                    <FormGroup controlId="talks" className="mb-3">
                        <FormLabel>Talks</FormLabel>
                        <FormControl as="select" multiple onChange={handleChange} value={editConference ? editConference.talks : []}>
                            {talks && talks.map(t => <option key={t.id} value={t}>{t.topic}</option>)}
                        </FormControl>
                    </FormGroup>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConferenceModal;