import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '@/database';
import { BlockUsersDto, DeleteUsersDto, UnblockUsersDto } from './dto';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getAll() {
    return await this.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        lastLogin: true,
        status: true,
      },
    });
  }

  async getUser(id: number) {
    const result = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        lastLogin: true,
        status: true,
      },
    });

    if (!result) throw new NotFoundException('User was not found');
    return result;
  }

  async blockUsers(dto: BlockUsersDto) {
    await this.db.user.updateMany({
      where: { id: { in: dto.blockIds } },
      data: {
        status: 'BLOCKED',
      },
    });

    return 'Users blocked successfully';
  }

  async unblockUsers(dto: UnblockUsersDto) {
    await this.db.user.updateMany({
      where: { id: { in: dto.unblockIds } },
      data: {
        status: 'ACTIVE',
      },
    });

    return 'Users unblocked successfully';
  }

  async deleteUsers(dto: DeleteUsersDto) {
    await this.db.user.deleteMany({
      where: { id: { in: dto.deleteIds } },
    });

    return 'Users deleted successfully';
  }
}
