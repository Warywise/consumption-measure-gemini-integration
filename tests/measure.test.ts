import request from 'supertest';
import app from '../src/app';

describe('- Measure Endpoints [SUCCESS]', () => {
  it('1. should upload a measure', async () => {
    const res = await request(app).post('/upload').send({
      /* "image": "base64",
        "customer_code": "string",
        "measure_datetime": "datetime",
        "measure_type": "WATER" ou "GAS" */
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('image_url');
    expect(res.body).toHaveProperty('measure_value');
    expect(res.body).toHaveProperty('measure_uuid');
  });

  it('2. should confirm a measure', async () => {
    const res = await request(app).put('/confirm').send({
      /* "measure_uuid": "string",
        "confirmed_value": integer */
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success');
  });

  it('3. should list all customer measures', async () => {
    // TODO
    const customer_code = 'string';

    const res = await request(app).get(`/${customer_code}/list`).send();

    expect(res.statusCode).toEqual(200);
    /* Expected response:
      “customer_code”: string,
      “measures”: [
        {
          “measure_uuid”: string,
          “measure_datetime”: datetime,
          “measure_type”: string,
          “has_confirmed”:boolean,
          “image_url”: string
        },
        {
          “measure_uuid”: string,
          “measure_datetime”: datetime,
          “measure_type”: string,
          “has_confirmed”:boolean,
          “image_url”: string
        }
      ] */
  });
});
