import Invoice from "../domain/entity/invoice.entity";
import Product from "../domain/entity/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceModel from "./invoice.model";
import InvoiceProductModel from "./invoice.product.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<GenerateInvoiceUseCaseOutputDto> {
        try {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            }))
        }, {
            include: [{ model: InvoiceProductModel}]
        });
        

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ( {
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: 350
        }
    } catch(error) {
        console.log(error);
    }
    }

    async find(id: string):Promise<Invoice> {
        return null;        
    }
}