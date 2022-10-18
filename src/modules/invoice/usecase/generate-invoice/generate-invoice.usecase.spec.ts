import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/entity/product.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn(),
    }
}

describe("should generate invoice use case test", () => {

    it("should generate invoice", async() => {
        const repository = MockRepository();
        const useCase = new GenerateInvoiceUseCase(repository);

        const input = {
            name: "invoice_1",
            document: "12345678",
            street: "Rua 01",
            number: "989",
            complement: "",
            city: "Orlândia",
            state: "SP",
            zipCode: "14620000",
            items: [ 
                {
                    id: "1",
                    name: "Product 1",
                    price: 200
                }
            ],
        }

        var result = await useCase.execute(input);
    });

});