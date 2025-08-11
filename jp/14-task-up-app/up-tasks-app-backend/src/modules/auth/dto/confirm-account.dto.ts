import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmAccountDto {
  @IsString()
  @IsNotEmpty()
  public readonly code: string;
}
