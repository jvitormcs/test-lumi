export interface JsonOutputPdf {

    numeroCliente: number;

    mesReferencia: string;

    energiaEletrica: {
        qtd: number;
        preco_Unitario: number;
        valor: number;
    }

    energiaSCEEE: {
        qtd: number;
        preco_Unitario: number;
        valor: number;
    }

    energiaCompensada: {
        qtd: number;
        preco_Unitario: number;
        valor: number;
    }

    contribIlumPublicaMunicipal:{
        valor: number;
    }


}