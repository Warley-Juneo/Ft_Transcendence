import { Injectable } from "@nestjs/common";
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';


@Injectable()
export class TwoFactorauthenticationService {
    generateTwoFactorAuthenticationSecret() {
        const secret = speakeasy.generateSecret({ length: 20});
        return {
            otpauth_url: secret.otpauth_url,
            base32: secret.base32,
        };
    }

    async generateQRCode(): Promise<string> {
        const { otpauth_url } = this.generateTwoFactorAuthenticationSecret();
        return await QRCode.toDataURL(otpauth_url);
    }

    verifyTwoFactorAuthenticationToken(TwoFactorauthenticationSecret: string, token: string): boolean {
        return speakeasy.totp.verify({
            secret: TwoFactorauthenticationSecret,
            encoding: 'base32',
            token,
        });
    }
}
