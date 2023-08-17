import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

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

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};

describe("Find Client Use Case test unit", () => {

    it("should find a client", async() => {

        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(client.id.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.document).toBe(client.document);
        expect(result.street).toBe(client.street);
        expect(result.number).toBe(client.number);
        expect(result.complement).toBe(client.complement);
        expect(result.city).toBe(client.city);
        expect(result.state).toBe(client.state);
        expect(result.zipCode).toBe(client.zipCode);    
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);        
    });

});