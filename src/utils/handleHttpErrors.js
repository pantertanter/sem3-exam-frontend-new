export default function handleHttpErrors(res) {
    if (!res.ok) return Promise.reject({ status: res.status, fullError: res.json() });
    return res.json();
}