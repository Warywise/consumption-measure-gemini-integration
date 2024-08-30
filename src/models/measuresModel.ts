import {
  MeasureType,
  Prisma,
  PrismaClient as PrismaClientType,
} from '@prisma/client';
import PrismaClient from './prismaClient';

class MeasuresModel {
  protected prisma: PrismaClientType;

  constructor() {
    this.prisma = PrismaClient;
  }

  async create(data: Prisma.MeasureCreateInput) {
    return this.prisma.measure.create({ data });
  }

  async findByUuid(measure_uuid: string) {
    return this.prisma.measure.findFirst({
      where: { measure_uuid },
    });
  }

  async findByCustomer(
    customer_code: string,
    params: {
      measure_type?: MeasureType;
      get_last?: boolean;
    } = {},
  ) {
    const { measure_type, get_last } = params;
    const where: { [key: string]: any } = {
      customer: {
        customer_code,
      },
    };

    if (measure_type) {
      where.measure_type = measure_type;
    }

    if (get_last) {
      where.measure_datetime = {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      };
    }

    return this.prisma.measure.findMany({ where });
  }

  async update(measure_uuid: string, data: Prisma.MeasureUpdateInput) {
    return this.prisma.measure.update({
      where: { measure_uuid },
      data,
    });
  }

  async delete(measure_uuid: string) {
    return this.prisma.measure.delete({
      where: { measure_uuid },
    });
  }
}

export default new MeasuresModel();
