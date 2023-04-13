const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

 it('código de estado 200', async () => {
		const {statusCode,body:cafes} = await request(server).get('/cafes').send();
		// const status = response.statusCode;
		// const body = response.body;
		// console.log(body.length);
		expect(statusCode).toBe(200);
		expect(cafes).toBeInstanceOf(Object);
		expect(cafes.length).toBeGreaterThanOrEqual(1);
	  });



	  it('debería devolver el estado 400 cuando el café no existe', async () => {
		const jwt = 'Token';
		const idEliminar = 100;
		const {statusCode}= await request(server)
		  .delete(`/cafes/${idEliminar}`)
		  .set("Authorization", jwt)
		  .send();
	
		expect(statusCode).toBe(404);
	  });
	
	  it('debe crear un nuevo café y devolver el estado 201', async () => {
		const id = Math.floor(Math.random() * 999);
		const cafe = { id, nombre: "Nuevo cafe" };
		const response = await request(server).post('/cafes').send(cafe);
		
		expect(response.status).toBe(201);
		expect(response.body).toContainEqual(cafe);
	  });
	
	  it('debería retornar 400 cuando se actualiza un café enviando diferentes  ids', async () => {
		const id = 2
		const payload = {
		  id: 3,
		  nombre: "Americano"
		}
		const response = await request(server).put(`/cafes/${id}`).send(payload);
		expect(response.status).toBe(400);
	  });

});




describe('Extra tests', () => {
  
	it('debe encontrar un café por id y devolver el estado 200', async () => {
	  const response = await request(server).get('/cafes/1').send();
	  const status = response.statusCode;
	  expect(status).toBe(200);
	  expect(response.body).toBeInstanceOf(Object);
	  expect(response.body).not.toBeInstanceOf(Array)
	});
  
	it('debe devolver el estado 400 cuando no se encuentra  un café', async () => {
	  const response = await request(server).get('/cafes/500').send();
	  const status = response.statusCode;
	  expect(status).not.toBe(200);
	  expect(status).toBe(404);
	});
  
	it('debe devolver el estado 400 cuando se agrega un café existente', async () => {
	  const id = 1
	  const cafe = { id, nombre: "Nuevo cafe" };
	  const response = await request(server).post('/cafes').send(cafe);
	  
	  expect(response.status).toBe(400);
	});
  
})
