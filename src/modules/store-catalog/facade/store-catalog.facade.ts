import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import StoreCatalogFacadeInterface, { FindAllStorageCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.interface";

export interface UseCaseProps {
    findUseCase: FindProductUseCase;
    findAllUseCase: FindAllProductsUseCase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    
    private _findUseCase: FindProductUseCase;
    private _findAllUseCase: FindAllProductsUseCase;

    constructor(useCaseProps: UseCaseProps) {
        this._findUseCase = useCaseProps.findUseCase;
        this._findAllUseCase = useCaseProps.findAllUseCase;
    }
    
    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUseCase.execute(id);
    }

    async findAll(): Promise<FindAllStorageCatalogFacadeOutputDto> {
        return await this._findAllUseCase.execute();
    }
}