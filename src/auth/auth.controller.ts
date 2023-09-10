import {Controller,Post,Get, Body} from '@nestjs/common'
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';


@Controller('auth')

export class AuthController{
    constructor(private readonly authService :AuthService){}

   @Post("signup")
     signup(@Body() dto:AuthDto){
    return  this.authService.signup(dto)
   }

   @Post("signin")
    signin(@Body() dto:AuthDto) {
    return  this.authService.signin(dto)
   };

   @Get()
   signout(){
    return this.authService.signout()
   }
}