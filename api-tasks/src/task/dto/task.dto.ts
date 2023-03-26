import { IsNotEmpty, IsBoolean, IsString, MinLength } from "class-validator"

export class DTask {

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly description: string

  @IsNotEmpty()
  @IsBoolean()
  readonly done: boolean
}