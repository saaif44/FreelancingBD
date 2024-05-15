import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto): Promise<{
        id: number;
        username: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.RoleType;
        balance: import("@prisma/client/runtime/library").Decimal;
        language_known: string;
        nationality: string;
        address: string;
        phone_number: string;
        nid_number: string;
        avatarUrl: string;
    }>;
    signin(signinDto: SigninDto): Promise<{
        accessToken: string;
    }>;
}
