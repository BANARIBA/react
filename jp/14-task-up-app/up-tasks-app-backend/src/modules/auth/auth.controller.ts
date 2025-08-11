import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewAccountDto, SignInDto } from './dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { IsObjectIdPipe } from 'src/common/pipes/is-object-id.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('new-account')
  newAccount(@Body() newAccountDto: NewAccountDto) {
    return this.authService.newAccount(newAccountDto);
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('confirm-account/:userId')
  confirmAccount(
    @Param('userId', IsObjectIdPipe) userId: string, 
    @Body() confirmAccountDto: ConfirmAccountDto
  ) {
    return this.authService.confirmAccount(confirmAccountDto, userId);
  }
}
