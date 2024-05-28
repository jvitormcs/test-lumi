import { AllowNull, Column, CreatedAt, DataType, Default, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    freezeTableName: true,
    timestamps: true,
})
class Fatura extends Model {

    @Column({ type: DataType.UUID, primaryKey: true, defaultValue: DataType.UUIDV4})
    faturaId!: string;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.STRING)
    numeroCliente!: number;

    @AllowNull(false)
    @Default("")
    @Column(DataType.STRING)
    mesReferencia!: string;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaEletrica_qtd!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaEletrica_preco_Unitario!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaEletrica_valor!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaSCEEE_qtd!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaSCEEE_preco_Unitario!: number;
    
    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaSCEEE_valor!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaCompensada_qtd!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaCompensada_preco_Unitario!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    energiaCompensada_valor!: number;

    @AllowNull(false)
    @Default(0)
    @Column(DataType.DECIMAL)
    contribIlumPublicaMunicipal_valor!: number;
    
    @AllowNull(false)
    @Default('')
    @Column(DataType.STRING)
    pathUrl!: string;
}

export default Fatura;