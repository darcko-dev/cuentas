'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Plus, PieChart, Wallet, CreditCard, TrendingUp, Filter, Calendar, Coffee, ShoppingBag } from 'lucide-react'

export function Page() {
  const [filter, setFilter] = useState('all')

  const totalBalance = 12500.75
  const debtBalance = 3000.00
  const creditCardBalance = 1500.50
  
  const transactions = [
    { id: 1, description: 'Netflix', amount: -15.99, date: '15 Jun', category: 'Suscripción', type: 'recurring' },
    { id: 2, description: 'Salario', amount: 3000.00, date: '14 Jun', category: 'Ingresos', type: 'recurring' },
    { id: 3, description: 'Alquiler', amount: -1000.00, date: '13 Jun', category: 'Vivienda', type: 'recurring' },
    { id: 4, description: 'Cena en restaurante', amount: -45.00, date: '12 Jun', category: 'Comida', type: 'casual' },
    { id: 5, description: 'Compras supermercado', amount: -80.00, date: '11 Jun', category: 'Alimentación', type: 'casual' },
  ]

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true
    return transaction.type === filter
  })

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      <main className="flex-grow p-4 pt-8 pb-20 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Money Manager</h1>
            <p className="text-sm text-gray-400">Bienvenido, Usuario</p>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <Card className="bg-gray-900 mb-6 rounded-xl shadow-lg border border-gray-800">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-300">Balance Total</h2>
            <p className="text-4xl font-bold text-white">${totalBalance.toFixed(2)}</p>
            <div className="mt-4 flex items-center text-sm text-gray-400">
              <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
              <span>+2.5% desde el mes pasado</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
            <CardContent className="p-4">
              <Wallet className="h-6 w-6 mb-2 text-red-400" />
              <h3 className="text-sm font-semibold mb-1 text-gray-300">Deudas</h3>
              <p className="text-2xl font-bold text-white">${debtBalance.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
            <CardContent className="p-4">
              <CreditCard className="h-6 w-6 mb-2 text-yellow-400" />
              <h3 className="text-sm font-semibold mb-1 text-gray-300">Tarjetas de Crédito</h3>
              <p className="text-2xl font-bold text-white">${creditCardBalance.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-white">Transacciones Recientes</h3>
          <div className="flex justify-between items-center mb-4">
            <Select onValueChange={setFilter} defaultValue="all">
              <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="recurring">Pagos Recurrentes</SelectItem>
                <SelectItem value="casual">Gastos Casuales</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="bg-gray-900 border-gray-700 text-white">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <Card className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
            <CardContent className="p-0">
              <ScrollArea className="h-[300px]">
                <ul className="divide-y divide-gray-800">
                  {filteredTransactions.map((transaction) => (
                    <li key={transaction.id} className="flex items-center p-4 hover:bg-gray-800 transition-colors duration-200">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${transaction.description}&backgroundColor=${transaction.amount >= 0 ? '4F46E5' : 'DC2626'}`} alt={transaction.description} />
                        <AvatarFallback>{transaction.description[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <p className="font-medium text-white">{transaction.description}</p>
                        <p className="text-sm text-gray-400">{transaction.category}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount >= 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                      {transaction.type === 'recurring' && (
                        <Calendar className="h-4 w-4 ml-2 text-blue-400" />
                      )}
                      {transaction.type === 'casual' && (
                        <Coffee className="h-4 w-4 ml-2 text-yellow-400" />
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="expenses" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-900 rounded-lg p-1 border border-gray-800">
            <TabsTrigger value="expenses" className="rounded-md data-[state=active]:bg-gray-800 data-[state=active]:text-white">Gastos</TabsTrigger>
            <TabsTrigger value="budget" className="rounded-md data-[state=active]:bg-gray-800 data-[state=active]:text-white">Presupuesto</TabsTrigger>
          </TabsList>
          <TabsContent value="expenses">
            <Card className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold mb-4 text-white">Distribución de Gastos</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Alimentación</span>
                    <span className="text-white">30%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Vivienda</span>
                    <span className="text-white">40%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Entretenimiento</span>
                    <span className="text-white">15%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="budget">
            <Card className="bg-gray-900 rounded-xl shadow-md border border-gray-800">
              <CardContent className="p-4">
                <h4 className="text-lg font-semibold mb-4 text-white">Presupuesto Mensual</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Alimentación</span>
                    <span className="text-white">$500 / $600</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Vivienda</span>
                    <span className="text-white">$1000 / $1000</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Entretenimiento</span>
                    <span className="text-white">$150 / $200</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-around items-center shadow-lg border-t border-gray-800">
        <Button variant="ghost" size="icon" aria-label="Inicio" className="flex flex-col items-center text-gray-400 hover:text-white">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Inicio</span>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Nueva transacción" className="flex flex-col items-center text-gray-400 hover:text-white">
          <Plus className="h-6 w-6" />
          <span className="text-xs mt-1">Agregar</span>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Estadísticas" className="flex flex-col items-center text-gray-400 hover:text-white">
          <PieChart className="h-6 w-6" />
          <span className="text-xs mt-1">Estadísticas</span>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Presupuesto" className="flex flex-col items-center text-gray-400 hover:text-white">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Presupuesto</span>
        </Button>
      </footer>
    </div>
  )
}