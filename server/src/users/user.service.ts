import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/database';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getAll() {
    const result = await this.db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        lastLogin: true,
        status: true,
      },
    });
    return result;
  }

  async getUser(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }
}
