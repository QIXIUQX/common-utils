import {requestServer} from "./request";

/**
 *
 * @param username
 * @param password
 * @returns {*}
 */
export function login(username, password) {
	return requestServer({
		url: "/api/login",
		method: "POST",
		data: {username, password},
	});
}
