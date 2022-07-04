import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { ZuAppResponse } from '../common/helpers/response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
         private readonly usersRepo: Repository<User>
    ){}
    
    findOne(id: string){
        const user = this.usersRepo.findOne({where :{id}})
        if(!user){
            throw new NotFoundException(
                ZuAppResponse.NotFoundRequest("Not found",'User not found')
           )
        }
        return user
    }

    async findByEmail(email: string){
        const user = await  this.usersRepo.findOne({where:{email: email}})
        if(!user) { 
            throw new NotFoundException(
                 ZuAppResponse.NotFoundRequest("Not found",' not found', "404")
            )
        }
        return user
    }

    async update(id: string, attrs: Partial<User>){
        const user = await this.usersRepo.findOne({where :{id}})
        if (!user){
            throw new NotFoundException(
                ZuAppResponse.NotFoundRequest('user not found')
            )
        }
        Object.assign(user, attrs)
        const updatedUser = this.usersRepo.save(user)
        return updatedUser
    }


}
