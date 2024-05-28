'use client'

import Fatura from "@/components/fatura"
import invoiceAPI from "@/services/invoiceAPI"
import { Select } from "@headlessui/react"
import { useEffect, useState } from "react"

const Faturas = () => {

    const [numberClient, setNumberClient] = useState<string[]>([])
    const handleGetNumberClient = async () => {
        const res = await invoiceAPI.getNumberClient()
        setNumberClient(res.data)
      }
    
  const [invoice, setInvoice] = useState<invoice[]>([])

  useEffect(() => {
    handleGetNumberClient()
  }, [])

  const handleGetAllInvoices = async (numeroCliente?: string, mesReferencia?: string) => {
    const res = await invoiceAPI.getAllInvoices(numeroCliente, mesReferencia)
    setInvoice(res.data)
  }


  const [selectedYearMonth, setSelectedYearMonth] = useState<string>("")
  const [yearMonthList, setYearMonthList] = useState<string[]>([])
  const [selectedClient, setSelectedClient] = useState<string>("")

  
  function generateMonthYearList(): string[] {
    const monthYearList: string[] = [];
    const startYear = 2023;
    const endYear = new Date().getFullYear();
    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month < 12; month++) {
            const date = new Date(year, month, 1);
            const monthName = date.toLocaleString('default', { month: 'short' }).toUpperCase();
            monthYearList.push(`${monthName.split('.').join('')}/${year}`);
        }
    }
    
    return monthYearList;
}

useEffect(() => {
  setYearMonthList(generateMonthYearList())
}, [])


useEffect(() => {
      handleGetAllInvoices(selectedClient, selectedYearMonth)
   
  }, [selectedClient, selectedYearMonth])
  



    return(
    
 <main className="min-h-screen h-full w-full bg-waikaiwa-gray-950 pb-8">
 <div className="w-full flex flex-col gap-3 justify-end items-end pr-4 py-5">
  <div className="w-full flex justify-end gap-3">
 <Select className={'w-1/6 h-10 text-waikaiwa-gray-600'} value={selectedYearMonth} onChange={e => setSelectedYearMonth(e.target.value)} >
  <option value="">Selecione um mês</option>
 
 {yearMonthList.map((yearMonth) => (
   <option key={yearMonth} value={yearMonth}>{yearMonth}</option>
 ))}
 
 </Select>
 
 <Select className={'w-1/6 h-10 text-waikaiwa-gray-600'} value={selectedClient} onChange={e => setSelectedClient(e.target.value)} >
  <option value="">Selecione um cliente</option> 
 {numberClient.map((client) => (
   <option key={client} value={client}>{client}</option>
 ))}
 
 </Select>
 </div>
 </div>
 
 <div className="flex flex-wrap justify-start items-center gap-3 ml-5">

    {
      invoice?.map((item) => (
        <Fatura key={item.faturaId} mesReferencia={item.mesReferencia} numeroCliente={item.numeroCliente} energiaEletrica_qtd={item.energiaEletrica_qtd} energiaSCEEE_qtd={item.energiaSCEEE_qtd} pathUrl={item.pathUrl} />
      )
    )
  }
  </div>
 
 
  </main>
    )
}

export default Faturas