import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice.entity";
import Product from "../domain/entity/product.entity";
import Address from "../domain/value-object/address.value-object";
import InvoiceGateway from "../gateway/invoice.gateway";
import { FindInvoiceUseCaseOutputDTO } from "../usecase/find-invoice/find-invoice.usecase.dto";
import { GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceModel from "./invoice.model";
import InvoiceProductModel from "./invoice.product.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<GenerateInvoiceUseCaseOutputDto> {
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
            })),
            total: invoice.total
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
            total: invoice.total
        }
    }

    async find(id: string):Promise<FindInvoiceUseCaseOutputDTO> {
        
        var invoice = await InvoiceModel.findOne({
            include: [
                { 
                    model: InvoiceProductModel
                }    
            ]
        });

        return {
            id: invoice.id,
            name: invoice.name,
            document: invoice.document,
            address: {
                street: invoice.street,
                number: invoice.number,
                complement: invoice.complement,
                city: invoice.city,
                state: invoice.state,
                zipCode: invoice.zipCode
            },
            items: invoice.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
            total: 0,
            createdAt: invoice.createdAt
        }
    }
}