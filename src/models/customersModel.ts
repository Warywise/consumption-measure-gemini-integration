import {
  Customer,
  PrismaClient as PrismaClientType,
} from '@prisma/client';
import PrismaClient from './prismaClient';

class CustomersModel {
  protected prisma: PrismaClientType;

  constructor() {
    this.prisma = PrismaClient;
  }

  async create(data: Customer) {
    return this.prisma.customer.create({ data });
  }

  async find(code: string) {
    return this.prisma.customer.findFirst({
      where: { OR: [{ id: code }, { customer_code: code }] },
    });
  }

  async update(
    { id, customer_code }: { id?: string; customer_code?: string },
    data: Partial<Customer>,
  ) {
    const where = id ? { id } : { customer_code };

    return this.prisma.customer.update({ where, data });
  }

  async delete(id: string) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}

export default new CustomersModel();
