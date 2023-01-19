import Product from "../domain/entity/product.entity";
import Address from "../domain/value-object/address.value-object";
import { FindInvoiceUseCaseOutputDTO } from "../usecase/find-invoice/find-invoice.usecase.dto";

export interface FindInvoiceUseCaseInputDTO {
    id: string;
}

export interface FindInvoiceUseCaseOutputDto {
    id: string;
    name: string;
    document: string;
    address: {
      street: string;
      number: string;
      complement: string;
      city: string;
      state: string;
      zipCode: string;
    };
    items: {
      id: string;
      name: string;
      price: number;
    }[];
    total: number;
    createdAt: Date;
}

export interface GenerateInvoiceUseCaseInputDto {
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
}

export default interface InvoiceFacadeInterface {
    generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto>;
    find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO>;
}