import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './users.model';
import {MailModule} from '../mail/mail.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User]), MailModule],
})


export class UsersModule {
}
