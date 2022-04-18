import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from './users.model';
import {InjectModel} from '@nestjs/sequelize';
import {CreateUserDto} from './dto/create-user.dto';
import {MailService} from '../mail/mail.service';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private mailService: MailService,
    ) {
    }

    async createUser(dto: CreateUserDto) {
        const candidate = await this.userRepository.findOne({
            where: {email: dto.email},
            include: {all: true},
        });
        if (candidate) {
            throw new HttpException(
                'Пользователь с таким email существует',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const activationLink = uuid.v4();
        const userLink: string =
            process.env.API_URL + '/ecosystem/auth/activate/' + activationLink;
        const user = await this.userRepository.create({
            ...dto,
            password: hashPassword,
            activationLink,
        });
        await this.mailService.sendActivationMail(user.email, userLink);
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }
}
