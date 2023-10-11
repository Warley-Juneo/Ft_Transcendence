let DataLogin : object = {};

function SetDataLogin(loginRes: object) {
	DataLogin = loginRes;
}
 function GetDataLogin() {
	return DataLogin;
}

export { SetDataLogin, GetDataLogin };
