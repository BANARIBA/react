import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { ConfirmAccountDto, NewAccountDto, SignInDto } from './dto';
import { errorHandleExceptions } from 'src/common/exceptions/error-handle.exception';
import { BcryptUtils, TokenUtils } from 'src/common/utils';
import { ConfirmationAuthCode } from './schemas/confirmation-auth-code.schema';
import { MailService } from 'src/common/services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(ConfirmationAuthCode.name)
    private readonly confirmationAuthCodeModel: Model<ConfirmationAuthCode>,
    private readonly emailSrv: MailService,
  ) {}

  public async newAccount(newAccountDto: NewAccountDto) {
    try {
      // await this.emailSrv.testConnection();
      const newUser = await this.userModel.create({
        ...newAccountDto,
        password: BcryptUtils.hashParam(newAccountDto.password),
      });

      const confirmationCode = await this.confirmationAuthCodeModel.create({
        user: newUser,
        code: TokenUtils.generateToken(),
      });

      const [user, confirmationCodeAuth] = await Promise.all([
        newUser.save(),
        confirmationCode.save(),
      ])
      await this.emailSrv.sendEmailData({
        from: `UpTasks <${process.env.MAIL_USER}>`,
        to: user.email,
        subject: 'UpTasks - Verificación/Confirmacion de cuenta',
        text: `UpTasks - Confirma tu cuenta`,
        html: `
            <h1>Bienvenido ${user.name}</h1>
            <p>Hola: ${user.name}, haz creado tu cuenta en UpTasks, ya casi esta todo listo, solo debes confirmar tu cuenta.</p>
            <p>Verifica el siguiente enlace:</p>
            <a href="localhost:5173/auth/confirm-account/${user._id as string}">Confirmar cuenta</a>
            <p>E ingresa el codigo: <b>${confirmationCodeAuth.code}</b></p>
            <p>Este token expirara en: 1 Hora</p>
          `,
      });
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userModel.findOne({
        email: signInDto.email
      });
      if (!user) throw new UnauthorizedException('Credenciales Invalidas - Email.');
      if (!user.isConfirmed) throw new BadRequestException('El usuario no se encuentra confirmado debe confirmar la cuenta.');
      if (!user.isActive) throw new BadRequestException('El usuario se encuentra inactivo, por favor hable con el administrador');
      if (!BcryptUtils.compareHash(signInDto.password, user.password)) throw new UnauthorizedException('Credenciales Invalidas - Password');
      return user;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async confirmAccount (confirmAccountDto: ConfirmAccountDto, userId: string) {
    try {
      const user = await this.userModel.findOne({
        _id: userId
      });
      if (!user) throw new BadRequestException('El usuario no existe.');
      if (user.isConfirmed) throw new BadRequestException('El usuario ya se encuentra confirmado.');
      if (!user.isActive) throw new BadRequestException('El usuario se encuentra inactivo, por favor hable con el administrador');

      const confirmationAuthCode = await this.confirmationAuthCodeModel.findOne({
        user: user._id,
        code: confirmAccountDto.code,
      });
      if (!confirmationAuthCode) throw new BadRequestException('El codigo de confirmacion no se encuentra, por ende no se puede confirmar la cuenta');

      user.isConfirmed = true;

      await Promise.allSettled([
        user.save(),
        confirmationAuthCode.deleteOne()
      ]);
      return user;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }
}
