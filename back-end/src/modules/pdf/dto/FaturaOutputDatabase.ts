export interface FaturaOutputDatabase {

    faturaId: string;

    numeroCliente: number;
    
    mesReferencia: string;
    
    energiaEletrica_qtd: number;
    
    energiaEletrica_preco_Unitario: number;
    
    energiaEletrica_valor: number;
    
    energiaSCEEE_qtd: number;
    
    energiaSCEEE_preco_Unitario: number;
    
    energiaSCEEE_valor: number;
    
    energiaCompensada_qtd: number;
    
    energiaCompensada_preco_Unitario: number;
    
    energiaCompensada_valor: number;

    pathUrl: string;
    
    contribIlumPublicaMunicipal_valor: number;

}