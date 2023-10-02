import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { lastValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class LoginService {
	constructor(private readonly httpService: HttpService) {}

	async Login(authCode: String): Promise<any> {
		const clientId = process.env.UID;
        const secret = process.env.SECRET;

        const authRequest = {
            grant_type: "authorization_code",
            client_id: clientId,
            client_secret: secret,
            code: authCode,
            redirect_uri: "http://localhost:3000"
        }

        const authResponsePromise: Observable<any> = this.httpService
        .post(process.env.API42_USER_AUTH, authRequest);

        // TRANSFORM FROM OBSERVABLE TO PROMISE
        const  authResponseResolved = await lastValueFrom(authResponsePromise);

        //GET ACCESS TOKEN TO ACCESS USER INFORMATION THROUGH 42 API
        const accessToken: String = authResponseResolved.data.access_token;

        const userInfo: Observable<any> = this.httpService
        .get(process.env.API42_USER_INFO, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // TRANSFORM FROM OBSERVABLE TO PROMISE
        const  userInfoResolved = await lastValueFrom(userInfo);
		
		return userInfoResolved;
	}
}