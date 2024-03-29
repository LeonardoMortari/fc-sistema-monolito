import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async() => {
    const client = new Client({
        id: new Id("1"),
        name: "Client 1",
        email: "x@x.com",
        document: "document 1",
        street: "rua 1",
        number: "111",
        complement: "casa x",
        city: "Orlândia",
        state: "SP",
        zipCode: "1462-000"
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1" }});

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.document).toBe(client.document);
    expect(clientDb.street).toBe(client.street);
    expect(clientDb.number).toBe(client.number);
    expect(clientDb.complement).toBe(client.complement);
    expect(clientDb.city).toBe(client.city);
    expect(clientDb.state).toBe(client.state);
    expect(clientDb.zipCode).toBe(client.zipCode);
  });

  it("should find a client", async() => {
    const client = await ClientModel.create({
        id: "1",
        name: "Cliente 1",
        email: "x@x.com",
        document: "document 1",
        street: "rua 1",
        number: "111",
        complement: "casa x",
        city: "Orlândia",
        state: "SP",
        zipCode: "1462-000",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.street).toEqual(client.street);
    expect(result.number).toEqual(client.number);
    expect(result.complement).toEqual(client.complement);
    expect(result.city).toEqual(client.city);
    expect(result.state).toEqual(client.state);
    expect(result.zipCode).toEqual(client.zipCode);    
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });
});