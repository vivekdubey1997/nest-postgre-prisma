import { IsEmail, IsNotEmpty,Length,IsString } from 'class-validator';


export class AuthDto {
  @IsEmail()
  public email: string;


  @IsString()
  @IsNotEmpty()
  @Length(3,20,{message:'Password Has to be at least 3 to 20 character'})
 public password: string;
}