export interface FindStoreCatalogFacadeInputDto {
    id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface FindAllStorageCatalogFacadeOutputDto {
    products: {
        id: string;
        name: string;
        description: string;
        salesPrice: number;
    }[];
}

export default interface StoreCatalogFacadeInterface {
    find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
    findAll(): Promise<FindAllStorageCatalogFacadeOutputDto>;
}