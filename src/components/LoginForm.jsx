import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

export default function LoginForm({ login }) {
    const [username, setUsernameValue] = useState();
    const [password, setPasswordValue] = useState();

    function submitLogin(event) {
        event.preventDefault();
        login(username, password);
    }

    return <Form className="loginForm mt-3 m-auto" onSubmit={submitLogin}>
        <FormControl
            onChange={e => setUsernameValue(e.target.value)}
            className="mb-3"
            type="text"
            placeholder="Username"
            id="username" />

        <FormControl
            onChange={e => setPasswordValue(e.target.value)}
            className="mb-3"
            type="password"
            placeholder="Password"
            id="password" />

        <Button type="submit" className="d-block btn-lg mb-3 mx-auto">Login</Button>
    </Form>
}