import AddClienteUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};

describe("Add Client Usecase unit test", () => {

    it("should add a client", async() => {

        const repository = MockRepository();
        const usecase = new AddClienteUseCase(repository);

        const input = {
            name: "Client 1",
            email: "x@x.com",
            document: "document 1",
            street: "rua 1",
            number: "111",
            complement: "casa x",
            city: "Orlândia",
            state: "SP",
            zipCode: "1462-000",
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);    
    });

});