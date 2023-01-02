import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
    tableName: "invoice-product-model",
    timestamps: false,
})

export default class InvoiceProductModel extends Model {
    
    @PrimaryKey
    @Column({ allowNull: false })
    id?: string;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    id_invoice: string;
    
    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    price: number;
}