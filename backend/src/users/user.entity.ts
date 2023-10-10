// A ENTITY HAS TO REPRESENT A MODEL INTO THE DATABASE
// IT WILL BE USED TO VALIDATE THE DTO BEFORE CALL THE DATABASE
export class UserEntity { 
    
    private _id?:                string;
    private _login:              string;
    private _email:              string;

    private _first_name?:        string;
    private _last_name?:         string;
    private _nickname?:          string;
    private _avatar?:            string; //trocar aqui para o tipo File
    // private _statusConnection?:  boolean; // podemos colocar um enum aqui para ter mais status de conexão

    private _friends?:           Array<UserEntity>;

    private _created_at?:        Date;
    private _updated_at?:        Date;
    // private _is_active?:         boolean;

    public get id() {
        return this._id;
    }

    public get login() {
        return this._login;
    }
    public set login(theLogin: any) {
        this._login = theLogin;
    }

    public get email() {
        return this._email;
    }
    public set email(theEmail: string) {
        this._email = theEmail;
    }

    public get first_name() {
        return this._first_name;
    }
    public set first_name(the_first_name: any) {
        this._first_name = the_first_name;
    }

    public get last_name() {
        return this._last_name;
    }
    public set last_name(the_last_name: any) {
        this._last_name = the_last_name;
    }

    public get nickname() {
        return this._nickname;
    }
    public set nickname(theNickname: string) {
        this._nickname = theNickname;
    }

    public get avatar() {
        return this._avatar;
    }
    public set avatar(theAvatar: string) {
        if (!theAvatar)
            theAvatar = "../user/default_avatar.jpg";
        this._avatar = theAvatar;
    }

    // public get statusConnection() {
    //     return this._statusConnection;
    // }
    // public set statusConnection(theStatus: boolean) {
    //     this._statusConnection = theStatus;
    // }
    
    public get friends() {
        return this._friends;
    }
    
    public get created_at() {
        return this._created_at;
    }

    public get updated_at() {
        return this._updated_at;
    }

    // public get is_active() {
    //     return this._is_active;
    // }
    // public set is_active(theActive: boolean) {
    //     this._is_active = theActive
    // }
}

abstract class UserHistory {
    wins:  number;
    loses: number;
    draws: number;
}