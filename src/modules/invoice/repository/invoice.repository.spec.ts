import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice.entity";
import Product from "../domain/entity/product.entity";
import Address from "../domain/value-object/address.value-object";
import InvoiceModel from "./invoice.model";
import InvoiceProductModel from "./invoice.product.model";
import InvoiceRepository from "./invoice.repository";

describe("InvoiceRepository test", () => {
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
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Document 1",
            address: new Address({
                street: "Avenida E",
                number: "996",
                complement: "",
                city: "Orlândia",
                state: "SP",
                zipCode: "14620000",
            }),
            items: [new Product({
                id: new Id("1"),
                name: "Product 1",
                price: 200.00
            })]
        });

        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            include: [
                { 
                    model: InvoiceProductModel, 
                    where: { id: "1" } 
                }    
            ]
        });
        
        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.id).toBe(invoice.id.id);
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);    
        expect(invoiceDb.street).toBe(invoice.address.street);    
        expect(invoiceDb.number).toBe(invoice.address.number);    
        expect(invoiceDb.complement).toBe(invoice.address.complement);    
        expect(invoiceDb.city).toBe(invoice.address.city);    
        expect(invoiceDb.state).toBe(invoice.address.state);    
        expect(invoiceDb.zipCode).toBe(invoice.address.zipCode);    
        expect(invoiceDb.items).toHaveLength(1);   
    });
});