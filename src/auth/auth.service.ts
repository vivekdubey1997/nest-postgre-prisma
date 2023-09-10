import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt/dist";
@Injectable()

export class AuthService{
   
  constructor(private prisma:PrismaService,private jwt:JwtService){}

    async signup(dto:AuthDto){
    
     const {email,password} = dto;
    
     const foundUser = await this.prisma.user.findUnique({where:{email}})
     if(foundUser){
          throw new  BadRequestException('Email already exist')
     }
     const hashedPassword = await this.hashPassword(password)
     await    this.prisma.user.create({
          data:{
               email,
               hashedPassword,
          }
     })
     return 'this is signup'
    }

    async hashPassword(password:string){
     const saltOrRounds = 10;
     const hashPassword = await bcrypt.hash(password, saltOrRounds);
     return hashPassword
    }

    async signin(dto:AuthDto){
     const {email,password} = dto;
     const foundUser = await this.prisma.user.findUnique({where:{email}})
     if(!foundUser){
          throw new BadRequestException('wrong credentials')
     }
     const isMatch = await this.comparePassword({password,
          hash:foundUser.hashedPassword})
       if(!isMatch){
          throw new BadRequestException('wrong creadentials')
       }   

       //jwt 
         return 'you signedin'
    }

    async comparePassword(args:{password:string,hash:string}){
     return await bcrypt.compare(args.password,args.hash)
    }

    signout(){
     return 'this is signin'
}
}