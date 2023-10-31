import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AbstractListDto } from 'src/common/dto/abstract.list-dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { Auth } from 'src/domain/auth/auth.guards';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';
import { ChatCreateDto } from './dto/chat.create-dto';
import { ChatFilterDto } from './dto/chat.filter-dto';
import { ChatUpdateDto } from './dto/chat.update-dto';

@Resolver('Chat')
export class ChatResolver {
  constructor(private readonly service: ChatService) {}

  @Query('chat')
  async findOne(@Args('filter') filter: ChatFilterDto): Promise<Chat> {
    return await this.service.findOne(filter);
  }

  @Query('chats')
  async findAndCount(
    @Args('filter') filter: ChatFilterDto,
    @Args('pagination') pagination: Pagination,
  ): Promise<AbstractListDto<Chat>> {
    return new AbstractListDto<Chat>(
      await this.service.findAndCount(filter, pagination),
    );
  }

  @Mutation('userCreate')
  async create(@Args('dto') dto: ChatCreateDto): Promise<Chat> {
    return await this.service.create(dto);
  }

  @Mutation('userUpdate')
  async update(
    @Auth() user: number,
    @Args('dto') dto: ChatUpdateDto,
    @Args('id') id: number,
  ): Promise<Chat> {
    // this.canActivate(user, id);
    return await this.service.update(dto, id);
  }

  @Mutation('chatDelete')
  async delete(@Auth() user: number, @Args('id') id: number): Promise<boolean> {
    // this.canActivate(user, id);
    return await this.service.delete(id);
  }

  // private async canActivate(user: number, id: number) {
  //   await this.service.findOne({ id: id }).then((chat) => {
  //     if (chat.ownerId !== user) {
  //       throw new UnauthorizedException();
  //     }
  //     return true;
  //   });
  // }
}
