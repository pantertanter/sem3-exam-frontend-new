import { useEffect, useRef, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel, FormSelect, Modal } from "react-bootstrap";
import apiFacade from "../../apiFacade";

function SpeakerModal({ editSpeaker, setContent }) {
    const [speaker, setSpeaker] = useState(editSpeaker);
    const mounted = useRef(true);


    const [show, setShow] = useState(false);

    const handleShow = () => {
        // if needed, fetch from api here
        setShow(true);
    }

    const handleClose = () => {
        setSpeaker(editSpeaker);
        setShow(false);
    }

    const handleChange = (evt) => {
        const prop = evt.target.id;
        const value = evt.target.value;
        setSpeaker({ ...speaker, [prop]: value })
    }

    const handleSubmit = () => {
        if (speaker && speaker.id) {
            apiFacade.updateSpeaker(speaker, mounted, () => {
                apiFacade.getAllSpeakers(setContent, mounted);
            });
        }
        else {
            apiFacade.createSpeaker(speaker, mounted, () => {
                apiFacade.getAllSpeakers(setContent, mounted);
            });
            // technically, it's the wrong mounted.
            // it might be better to lift handleSubmit entirely and send it down via prop.
        }
        handleClose();
    };

    useEffect(() => {
        return () => mounted.current = false;
    }, []);

    return (
        <>
            {editSpeaker
                ? <Button variant="warning" onClick={handleShow}>Edit</Button>
                : <Button variant="success" onClick={handleShow}>Create</Button>}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{speaker && speaker.id ? "Edit" : "Create"} speaker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <input type="hidden" id="id" value={speaker ? speaker.id : 0} />
                        <FormGroup controlId="name" className="mb-3">
                            <FormLabel>Name</FormLabel>
                            <FormControl type="text" onChange={handleChange} value={speaker ? speaker.name : ""} />
                        </FormGroup>
                        <FormGroup controlId="profession" className="mb-3">
                            <FormLabel>Profession</FormLabel>
                            <FormControl type="text" onChange={handleChange} value={speaker ? speaker.profession : ""} />
                        </FormGroup>
                        <FormGroup controlId="gender" className="mb-3">
                            <FormLabel>Gender</FormLabel>
                            <FormSelect type="number" onChange={handleChange} value={speaker ? speaker.gender : ""}>
                                <option value="choose" disabled>Choose gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non_binary">Non-binary</option>
                                <option value="other">Other</option>
                            </FormSelect>
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
        </>
    );
}

export default SpeakerModal;