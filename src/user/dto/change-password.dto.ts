import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString} from "class-validator";
import { Match } from "src/common/decorators/password-match.decorator";

export class ChangePasswordDto{
    @IsString()
    @IsNotEmpty({message: 'Please input your current password'})
    @ApiProperty()
    oldPassword: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty({message: 'Please input your new password'})
    newPassword: string;
 }