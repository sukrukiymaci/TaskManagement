import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<String> {
        return this.authService.signUp(authCredentialsDto);
    }
    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<String> {
        return this.authService.signIn(authCredentialsDto);
    }
}
