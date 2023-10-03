import { IsEmail, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  password?: string;
}