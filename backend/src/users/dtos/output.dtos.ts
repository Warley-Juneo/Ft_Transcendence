export class UserLoginDto {
    _login:              string;
    _email:              string;

    _first_name:        string;
    _last_name:         string;
    _nickname:          string;
    _avatar:            string; //trocar aqui para o tipo File

	_wins:				 number;
	_loses:				 number;
	_draws:				 number;

	// _statusConnection?:  boolean; // podemos colocar um enum aqui para ter mais status de conexão
}