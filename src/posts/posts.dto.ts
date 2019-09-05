import { IsString } from 'class-validator';

class CreatePostDto {
  @IsString()
  public author: string;
}