import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase {

    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDTO) : Promise<FindInvoiceUseCaseOutputDTO> {
        var result = await this._invoiceRepository.find(input.id);

        return {
            id: result.id,
            name: result.name,
            document: result.document,
            address: result.address,
            items: result.items,
            total: result.items.length,
            createdAt: result.createdAt
        }
    }
}