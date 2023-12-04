import axios from "axios";
import Cookies from "js-cookie";

export default function GetUsersGame() {
	return axios.get('http://localhost:3000/users/find-all', {
		headers: {
			Authorization: Cookies.get("jwtToken")
		},
	}).then((res) => {
		return res.data;
	})
}
