'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Plus, PieChart, Wallet, CreditCard, TrendingUp, Filter, Calendar, Coffee, ShoppingBag } from 'lucide-react'

export default function Home() {
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
              <h3 className="text-sm