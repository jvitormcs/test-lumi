interface FaturaProps {
    energiaEletrica_qtd: number;
    energiaSCEEE_qtd: number;
    mesReferencia: string;
    numeroCliente: number;
    pathUrl: string;

}

const Fatura = ({ energiaEletrica_qtd, energiaSCEEE_qtd, mesReferencia, numeroCliente, pathUrl} : FaturaProps) => {

    const handleDownloadInvoice = () => {
        const fileUrl = `http://localhost:3000/${pathUrl}`;
        const a = document.createElement('a');
        a.target = '_blank';
        a.href = fileUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }

    return (
        <div onClick={handleDownloadInvoice} className="bg-waikaiwa-gray-600 w-80 rounded-md px-4 py-3 cursor-pointer" >
            <h2>Fatura</h2>
            <p>Número do Cliente: {numeroCliente}</p>
            <p>Mês de Referência: {mesReferencia}</p>
            <p>Energia Elétrica (kWh): {energiaEletrica_qtd}</p>
            <p>Energia SCEEE (kWh): {energiaSCEEE_qtd}</p>
        </div>
    )


}

export default Fatura