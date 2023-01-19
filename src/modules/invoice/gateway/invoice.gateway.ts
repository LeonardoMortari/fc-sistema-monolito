import Invoice from "../domain/entity/invoice.entity";
import { FindInvoiceUseCaseOutputDTO } from "../usecase/find-invoice/find-invoice.usecase.dto";
import { GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.usecase.dto";

export default interface InvoiceGateway {
    generate(invoice: Invoice): Promise<GenerateInvoiceUseCaseOutputDto>;
    find(id: string):Promise<FindInvoiceUseCaseOutputDTO>;
}