export const measureDocs = {
  '/upload': {
    post: {
      summary: 'Faz o upload de uma nova medição',
      tags: ['Medições'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                image: { type: 'string', description: 'Imagem em base64 do medidor' },
                customer_code: { type: 'string', description: 'Código do cliente' },
                measure_datetime: { type: 'string', format: 'date-time', description: 'Data e hora da medição' },
                measure_type: { type: 'string', enum: ['WATER', 'GAS'], description: 'Tipo de medição (Água ou Gás)' },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Operação realizada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  image_url: { type: 'string' },
                  measure_value: { type: 'integer' },
                  measure_uuid: { type: 'string' },
                },
              },
            },
          },
        },
        400: { description: 'Dados fornecidos inválidos' },
        409: { description: 'Já existe uma leitura para este tipo no mês atual' },
      },
    },
  },
  '/confirm': {
    patch: {
      summary: 'Confirma ou corrige uma medição existente',
      tags: ['Medições'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                measure_uuid: { type: 'string', description: 'UUID da medição' },
                confirmed_value: { type: 'integer', description: 'Valor confirmado da medição' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'Operação realizada com sucesso' },
        400: { description: 'Dados fornecidos inválidos' },
        404: { description: 'Leitura não encontrada' },
        409: { description: 'Leitura já confirmada' },
      },
    },
  },
  '/{customer_code}/list': {
    get: {
      summary: 'Lista todas as medições de um cliente',
      tags: ['Medições'],
      parameters: [
        {
          in: 'path',
          name: 'customer_code',
          schema: { type: 'string' },
          required: true,
          description: 'Código do cliente',
        },
        {
          in: 'query',
          name: 'measure_type',
          schema: { type: 'string', enum: ['WATER', 'GAS'] },
          required: false,
          description: 'Filtrar por tipo de medição',
        },
      ],
      responses: {
        200: {
          description: 'Lista de medições',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_code: { type: 'string' },
                  measures: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        measure_uuid: { type: 'string' },
                        measure_datetime: { type: 'string', format: 'date-time' },
                        measure_type: { type: 'string' },
                        has_confirmed: { type: 'boolean' },
                        image_url: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: 'Parâmetro measure_type inválido' },
        404: { description: 'Nenhuma leitura encontrada' },
      },
    },
  },
};
