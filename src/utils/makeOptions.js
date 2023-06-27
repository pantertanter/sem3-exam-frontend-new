import tokenUtil from "../auth/tokenUtil";

export default function makeOptions(method, addToken, body) {
    const { getToken } = tokenUtil();
    const token = (addToken) ? getToken() : null;
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }
    if (token) opts.headers["x-access-token"] = token;
    if (body) opts.body = JSON.stringify(body);

    return opts;
}
