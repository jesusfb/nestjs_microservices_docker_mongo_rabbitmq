import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { IsEmail, IsString } from "class-validator"

export class UserDataTransferObject {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string
}