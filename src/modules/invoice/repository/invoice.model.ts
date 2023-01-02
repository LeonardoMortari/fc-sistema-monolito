import { Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Product from "../domain/entity/product.entity";
import Address from "../domain/value-object/address.value-object";
import InvoiceProductModel from "./invoice.product.model";

@Table({
    tableName: "invoices",
    timestamps: false,
})

export default class InvoiceModel extends Model{
    @PrimaryKey
    @Column({ allowNull: false})
    id: string;
    
    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    document: string;

    @Column({ allowNull: false })
    street: string;
    
    @Column({ allowNull: false })
    number: string;

    @Column
    complement: string;
    
    @Column({ allowNull: false })
    city: string;
    
    @Column({ allowNull: false })
    state: string;

    @Column({ allowNull: false })
    zipCode: string;

    // @ForeignKey(() => InvoiceProductModel)
    // @Column({ allowNull: false })
    // id_invoice_product: string;

    @HasMany(() => InvoiceProductModel)
    items: InvoiceProductModel[] 
    
    @Column({ allowNull: false })
    createdAt?: Date;
    
    @Column({ allowNull: false })
    updatedAt?: Date;
}