import axios from "axios";
import Cookies from "js-cookie";

export default function GetUsersGame() {
	return axios.get(`${process.env.REACT_APP_HOST_URL}/users/find-all`, {
		headers: {
			Authorization: Cookies.get("jwtToken"),
			"ngrok-skip-browser-warning": "69420"
		},
	}).then((res) => {
		return res.data;
	})
}
