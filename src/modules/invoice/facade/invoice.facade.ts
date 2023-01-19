import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindInvoiceUseCaseInputDTO } from "../usecase/find-invoice/find-invoice.usecase.dto";
import { GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceFacadeInterface, { FindInvoiceUseCaseOutputDto, GenerateInvoiceUseCaseInputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUseCase: UseCaseInterface,
    generateUseCase: UseCaseInterface,
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    
    private _findUseCase: UseCaseInterface;
    private _generateUseCase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findUseCase = usecaseProps.findUseCase;
        this._generateUseCase = usecaseProps.generateUseCase;
    }
    
    async generate(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        return await this._generateUseCase.execute(input);
    }
    
    async find(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDto> {
        return await this._findUseCase.execute(input);
    }
    
}