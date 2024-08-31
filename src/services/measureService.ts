// src/services/measureService.ts
import { MeasureType, Prisma } from '@prisma/client';
import geminiService from './geminiService';
import measuresModel from '../models/measuresModel';
import customersModel from '../models/customersModel';

export interface CreateMeasurePayload {
  customer_code: string;
  measure_datetime: Date;
  measure_type: MeasureType;
  image: string;
}

export interface ConfirmMeasurePayload {
  measure_uuid: string;
  confirmed_value: number;
}

export interface ListMeasuresPayload {
  customer_code: string;
  measure_type?: MeasureType;
}

class MeasureService {
  async createMeasure(data: CreateMeasurePayload) {
    const { measure_type, customer_code, image, measure_datetime } = data;
    const existingMeasure = await measuresModel.findByCustomer(
      customer_code,
      {
        measure_type,
        get_last: true,
      },
    );

    if (existingMeasure.length) {
      console.log('- existingMeasure', existingMeasure);
      return {
        status_code: 409,
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      };
    }

    // Obter o valor da medida usando o GeminiService
    const { measure_value, image_url } =
      await geminiService.processImage(image);

    const customer = await customersModel.find(customer_code);

    const payload = {
      measure_datetime,
      measure_type,
      measure_value,
      image_url,
      has_confirmed: false,
    } as Prisma.MeasureCreateInput;

    payload.customer = customer
      ? { connect: { id: customer.id } }
      : { create: { customer_code } };

    const newMeasure = await measuresModel.create(payload);

    return {
      status_code: 200,
      data: newMeasure,
    };
  }

  async confirmMeasure({
    measure_uuid,
    confirmed_value,
  }: ConfirmMeasurePayload) {
    const measure = await measuresModel.findByUuid(measure_uuid);

    if (!measure) {
      return {
        status_code: 404,
        error_code: 'MEASURE_NOT_FOUND',
        // error_description não faz sentido, pois a leitura não foi encontrada mas a doc do desafio pede tal valor
        error_description: 'Leitura do mês já realizada',
      };
    }

    if (measure.has_confirmed) {
      return {
        status_code: 409,
        error_code: 'CONFIRMATION_DUPLICATE',
        // error_description não faz sentido, pois a leitura já foi confirmada mas a doc do desafio pede tal valor
        error_description: 'Leitura do mês já realizada',
      };
    }

    await measuresModel.update(measure_uuid, {
      measure_value: confirmed_value,
      has_confirmed: true,
    });

    return {
      status_code: 200,
      data: { success: true },
    };
  }

  async listMeasures({ customer_code, measure_type }: ListMeasuresPayload) {
    const measures = await measuresModel.findByCustomer(customer_code, {
      measure_type,
    });

    if (!measures.length) {
      return {
        status_code: 404,
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      };
    }

    return {
      status_code: 200,
      data: {
        customer_code,
        measures,
      },
    };
  }
}

export default new MeasureService();
