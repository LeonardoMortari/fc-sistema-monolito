import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceProductModel from "../repository/invoice.product.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("InvoidFacade test", () => {

    let sequelize: Sequelize;

    beforeEach(async() => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        
        await sequelize.addModels([InvoiceModel, InvoiceProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should generate a invoice", async() => {

        const facade = InvoiceFacadeFactory.create();

        const invoice = {
            name: "Product 1",
            document: "Document 1",
            street: "Rua 01",
            number: "999",
            complement: "",
            city: "Orlândia",
            state: "SP",
            zipCode: "14620000",
            items: [{
                id: "1",
                name: "Item 01",
                price: 500
            }]
        };

        var invoiceGenerated = await facade.generate(invoice);
        
        expect(invoice).toBeDefined();
        expect(invoice.name).toBe(invoiceGenerated.name);
        expect(invoice.document).toBe(invoiceGenerated.document);    
        expect(invoice.street).toBe(invoiceGenerated.street);    
        expect(invoice.number).toBe(invoiceGenerated.number);    
        expect(invoice.complement).toBe(invoiceGenerated.complement);    
        expect(invoice.city).toBe(invoiceGenerated.city);    
        expect(invoice.state).toBe(invoiceGenerated.state);    
        expect(invoice.zipCode).toBe(invoiceGenerated.zipCode);    
        expect(invoice.items).toHaveLength(1);  
    });

    it("should find a invoice", async() => {
        
        const facade = InvoiceFacadeFactory.create();

        const invoice = {
            name: "Product 2",
            document: "Document 2",
            street: "Rua 02",
            number: "643",
            complement: "",
            city: "Orlândia",
            state: "SP",
            zipCode: "14620000",
            items: [{
                id: "1",
                name: "Item 01",
                price: 500
            }]
        };

        var invoiceGenerated = await facade.generate(invoice);

        var input =  {
            id: invoiceGenerated.id
        }

        var invoiceDb = await facade.find(input);
    
        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);    
        expect(invoiceDb.address.street).toBe(invoice.street);    
        expect(invoiceDb.address.number).toBe(invoice.number);    
        expect(invoiceDb.address.complement).toBe(invoice.complement);    
        expect(invoiceDb.address.city).toBe(invoice.city);    
        expect(invoiceDb.address.state).toBe(invoice.state);    
        expect(invoiceDb.address.zipCode).toBe(invoice.zipCode);    
        expect(invoiceDb.items).toHaveLength(1); 
    });
});