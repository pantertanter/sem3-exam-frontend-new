export default function tokenUtil() {
    function setToken(token) {
        if (!token) localStorage.removeItem("jwtToken");
        else localStorage.setItem('jwtToken', token);
    }

    function getToken() {
        const token = localStorage.getItem('jwtToken');
        if (!validateToken(token)) {
            setToken(null); // remove invalid tokens
            return null;
        }
        return token;
    }

    function validateToken(token) {
        if (!token) return false;
        const { exp } = getPayloadFromToken(token); // expired
        return exp > Date.now() / 1000; // seconds vs. miliseconds
    }

    function getPayloadFromToken(token) {
        const encodedPayload = token.split('.')[1];
        return JSON.parse(Buffer.from(encodedPayload, 'base64'));
    }

    function getUserFromToken(token) {
        if (!token) return null;
        const { username, roles } = getPayloadFromToken(token);
        const rolesArray = roles.split(",");
        return { username: username, roles: rolesArray };
    }

    return { getToken, setToken, getUserFromToken }
}