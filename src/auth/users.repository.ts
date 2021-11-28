import {
  ConflictException,
    HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { error } from 'console';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<String> {
    
    const { username, password } = authCredentialsDto; 

    //Bcrypt creates a different salt for each different username
    const salt = await bcrypt.genSalt();
    //Bcrypt creates a new hashed password using the salt and the password before sending to the database
    const hashedPassword =  await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    }); 
    try {
        await this.save(user);
        return "Successfully created an account";
      } catch (error) {
        if (error.code === '23505') {
          // duplicate username
          return 'Username already exists';
        } else {
          return 'Error occurred';
        }
      }
  }
}
