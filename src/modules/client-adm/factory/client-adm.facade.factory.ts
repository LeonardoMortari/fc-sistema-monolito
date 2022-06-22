import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClienteUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    
    static create() {
        const repository = new ClientRepository();
        const findUsecase = new FindClientUseCase(repository);
        const addUsecase = new AddClienteUseCase(repository);
        const facade = new ClientAdmFacade({
            addUsecase: addUsecase,
            findUsecase: findUsecase,
        });

        return facade;
    }

}