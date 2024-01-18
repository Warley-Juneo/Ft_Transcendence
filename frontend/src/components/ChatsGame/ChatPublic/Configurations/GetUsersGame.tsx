import axios from "axios";
import Cookies from "js-cookie";

export default function GetUsersGame() {
	return axios.get('https://21f6-2804-14c-1a8-a325-fbe4-507a-840b-f839.ngrok-free.app/users/find-all', {
		headers: {
			Authorization: Cookies.get("jwtToken"),
			"ngrok-skip-browser-warning": "69420"
		},
	}).then((res) => {
		return res.data;
	})
}
