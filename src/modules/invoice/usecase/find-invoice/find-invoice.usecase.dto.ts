import Product from "../../domain/entity/product.entity";
import Address from "../../domain/value-object/address.value-object";

export interface FindInvoiceUseCaseInputDTO {
    id: string;
}

export interface FindInvoidUseCaseOutputDTO {
    id: string;
    name: string;
    document: string;
    address: Address;
    items: Product[];
    total: number;
    createdAt: Date;
}