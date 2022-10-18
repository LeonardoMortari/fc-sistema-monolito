import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/entity/invoice.entity";
import Product from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address.value-object";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const props = {
            name: input.name,
            document: input.document,
            address: new Address({
                street: input.street,
                number: input.number,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
                complement: input.complement
            }),
            items:  this.pushProducts(input)
        }

        const invoice = new Invoice(props);

        var result = await this._invoiceRepository.generate(invoice);

        return result;
    }

    public pushProducts(input: GenerateInvoiceUseCaseInputDto) : Product[] {

        var products = Array<Product>();

        input.items.forEach((product) => {
            const productProps = {
                id: new Id(product.id),
                name: product.name,
                price: product.price
            };

            products.push(new Product(productProps))
        });

        return products;
    }
}