import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "src/common/decorators/password-match.decorator";

export class ChangePasswordDto{

    @IsString()
    @IsNotEmpty({message: 'Please input your current password'})
    @ApiProperty()
    oldPassword: string

    @IsString()
    @ApiProperty()
    @IsNotEmpty({message: 'Please input your new password'})
    @MinLength(8, 
        {message: 'Password is too short. Minimal length is $constraint1 characters, but actual is $value'}
    )
    @MaxLength(20, 
        { message: 'password is too long. Maximal length is $constraint1 characters, but actual is $value'}
    )
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
        {message: 'password must contain the following: a capital letter, a number and a special character'}
    )
    newPassword: string;

    @IsString()
    @IsNotEmpty({message: 'Please confirm your password'})
    @Match('newPassword', {message: "New password and confirm password do not match"})
    @ApiProperty()
    newPasswordConfirm: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty({message: 'Please input your signin access token'})
    accessToken: string
 }