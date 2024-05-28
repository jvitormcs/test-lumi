'use client'

import EnergyChart from "@/components/EnergyChart";
import ValueChart from "@/components/ValueChart";
import invoiceAPI from "@/services/invoiceAPI";
import { Select } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

  const [numberClient, setNumberClient] = useState<string[]>([])
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [consumeEnergy, setConsumeEnergy] = useState<number>(0)
  const [compensatedEnergy, setCompensatedEnergy] = useState<number>(0)
  const [totalValueWithoutGD, setTotalValueWithoutGD] = useState<number>(0)
  const [economyGD, setEconomyGD] = useState<number>(0)


  const handleGetNumberClient = async () => {
    const res = await invoiceAPI.getNumberClient()
    setNumberClient(res.data)
  }

  const [invoice, setInvoice] = useState<invoice[]>([])

  useEffect(() => {
    handleGetNumberClient()
  }, [])

  const handleGetAllInvoices = async (numeroCliente: string, ) => {
    const res = await invoiceAPI.getAllInvoices(numeroCliente)
    setInvoice(res.data)
    const data = res.data
    let consumeEnergyCreate = 0
    let consumeCompensatedCreate = 0
    let totalValueWithoutGDCreate = 0
    let economyGDCreate = 0
    
    data?.map((invoice:invoice) => {
        consumeEnergyCreate += (Number(invoice.energiaEletrica_qtd) + Number(invoice.energiaSCEEE_qtd))
        consumeCompensatedCreate += Number(invoice.energiaCompensada_qtd)
        totalValueWithoutGDCreate += Number(invoice.energiaEletrica_valor) + Number(invoice.energiaSCEEE_valor) + Number(invoice.contribIlumPublicaMunicipal_valor)
        economyGDCreate += Number(invoice.energiaCompensada_valor)
      }

    )
    setConsumeEnergy(consumeEnergyCreate)
    setCompensatedEnergy(consumeCompensatedCreate)
    setTotalValueWithoutGD(totalValueWithoutGDCreate)
    setEconomyGD(economyGDCreate)
  }


useEffect(() => {
  if(selectedClient){
    handleGetAllInvoices(selectedClient)
  }
}, [selectedClient])


  return (
 <main className="min-h-screen h-full w-full bg-waikaiwa-gray-950 pb-8">
<div className="w-full flex flex-col gap-3 justify-end items-end pr-4 py-5">


<Select className={'w-1/6 h-10 text-waikaiwa-gray-600'} value={selectedClient} onChange={e => setSelectedClient(e.target.value)} >
 <option value="">Selecione um cliente</option> 
{numberClient.map((client) => (
  <option key={client} value={client}>{client}</option>
))}

</Select>

</div>
    <div className="w-full flex flex-wrap justify-evenly pt-4 ">
      <div className="w-[20%] bg-waikaiwa-gray-600 h-20 rounded-md text-waikaiwa-gray-50 flex flex-col items-center justify-center ">
        <h4>Consumo de Energia Elétrica </h4>
        <p>{consumeEnergy.toFixed(2)} <small>kWh</small></p>
      </div>
      <div className="w-[20%] bg-waikaiwa-gray-600 h-20 rounded-md text-waikaiwa-gray-50 flex flex-col items-center justify-center ">
        <h4>Energia Compensada </h4>
        <p>{compensatedEnergy?.toFixed(2)} <small>kWh</small></p>
      </div>
      <div className="w-[20%] bg-waikaiwa-gray-600 h-20 rounded-md text-waikaiwa-gray-50 flex flex-col items-center justify-center ">
        <h4>Valor Total sem GD</h4>
        <p><small>R$</small> {totalValueWithoutGD?.toFixed(2)}</p>
      </div>
      <div className="w-[20%] bg-waikaiwa-gray-600 h-20 rounded-md text-waikaiwa-gray-50 flex flex-col items-center justify-center ">
        <h4>Economia GD</h4>
        <p><small>R$</small> {economyGD?.toFixed(2)}</p>
      </div>
    </div>

    <div className="flex justify-end pr-8">
      <Link className="text-lg" href={'/faturas'}>Faturas</Link>
    </div>

    <div className="flex w-full flex-col justify-center items-center mt-10 gap-4">
      <h3>Energia (kWh)</h3>
      <EnergyChart data={invoice} />
    </div>

    <div className="flex w-full flex-col justify-center items-center mt-10 gap-4">
      <h3>Valores Monetários (R$)</h3>
      <ValueChart data={invoice} />

    </div>

 </main>
  );
}
