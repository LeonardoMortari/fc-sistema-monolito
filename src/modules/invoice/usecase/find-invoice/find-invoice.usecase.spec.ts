import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address.value-object";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
    id: new Id("1"),
    name: "invoice_1",
    address: new Address({
        street: "Rua 01",
        number: "455",
        complement: "",
        city: "Orlândia",
        zipCode: "14620-000",
        state: "SP"
    }),
    document: "document_1",
    items: [new Product({
        id: new Id("1"),
        name: "Produto 1",
        price: 200
    })]
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn(),
    }
}

describe("Find Invoice Use Case test unit", () => {

    it("should find a invoice", async() => {

        const repository = MockRepository();
        const useCase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1"
        };

        const result = await useCase.execute(input);

        expect(result.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
    });
});