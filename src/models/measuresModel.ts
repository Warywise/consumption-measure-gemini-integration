import {
  Measure,
  MeasureType,
  PrismaClient as PrismaClientType,
} from '@prisma/client';
import PrismaClient from './prismaClient';

class MeasuresModel {
  protected prisma: PrismaClientType;

  constructor() {
    this.prisma = PrismaClient;
  }

  async create(data: Measure) {
    return this.prisma.measure.create({ data });
  }

  async find(customer_code: string, measure_type?: MeasureType) {
    return this.prisma.measure.findMany({
      where: {
        ...(measure_type ? { measure_type } : {}),
        customer: {
          customer_code,
        },
      },
    });
  }

  async update(measure_uuid: string, data: Partial<Measure>) {
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
