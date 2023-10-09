export class OutputLoginDto {
    authCode:    string;
    login:       string;
    email:       string;
    first_name:  string;
    last_name:   string;
    nickname:    string;
    avatar:      string;
    _login:              string;
    _email:              string;

    _first_name:        string;
    _last_name:         string;
    _nickname:          string;
    _avatar:            string; //trocar aqui para o tipo File

	_wins:				 number;
	_loses:				 number;
	_draws:				 number;
    _ladder:             number;

    _access_token:       string;
    // createdAt: 2023-10-07T20:22:03.011Z,
    // updatedAt: 2023-10-07T20:22:03.011Z,
    
    // is_active: true
}
