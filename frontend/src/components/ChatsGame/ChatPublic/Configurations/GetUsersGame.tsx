import axios from "axios";
import Cookies from "js-cookie";

export default function GetUsersGame() {
	return axios.get('https://990d-187-62-198-223.ngrok-free.app/users/find-all', {
		headers: {
			Authorization: Cookies.get("jwtToken"),
			"ngrok-skip-browser-warning": "69420"
		},
	}).then((res) => {
		return res.data;
	})
}
