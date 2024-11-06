"use client"

import React, { useState } from 'react'
import { Home, TrendingUp, Activity, FileText, DollarSign, Search, Moon, User, ArrowRight, ExternalLink, PieChart, Briefcase, BarChart3, Scissors, Users, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const NavItem = ({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) => (
  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${active ? 'border-b-2 border-teal-600' : ''}`}>
    {icon}
    <span className="text-gray-700">{text}</span>
  </button>
)

const FeatureCard = ({ icon, title, description, grey = false }: { icon: React.ReactNode; title: string; description: string; grey?: boolean }) => (
  <Card className={`${grey ? 'bg-gray-100 shadow-none border-0' : 'bg-white hover:shadow-lg'} transition-shadow duration-300`}>
    <CardContent className="p-6">
      <div className="mb-4 text-teal-600">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </CardContent>
  </Card>
)

const HelpCard = ({ title, description, icon }: { title: string; description: string; icon?: React.ReactNode }) => (
  <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 cursor-pointer group">
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    {icon || <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-teal-600" />}
  </div>
)

const CalendarDay = ({ day, isAvailable, isSelected, onClick }: { day: number; isAvailable: boolean; isSelected: boolean; onClick: () => void }) => (
  <button
    className={`w-12 h-12 rounded-full flex items-center justify-center ${
      isSelected
        ? 'bg-teal-500 text-white'
        : isAvailable
        ? 'bg-white text-gray-700 hover:bg-teal-100'
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
    }`}
    onClick={onClick}
    disabled={!isAvailable}
  >
    {day}
  </button>
)

const TimeSlot = ({ time, isAvailable, isSelected, onClick }: { time: string; isAvailable: boolean; isSelected: boolean; onClick: () => void }) => (
  <button
    className={`py-3 px-4 rounded-lg text-center ${
      isSelected
        ? 'bg-teal-500 text-white'
        : isAvailable
        ? 'bg-white text-gray-700 hover:bg-teal-100'
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
    }`}
    onClick={onClick}
    disabled={!isAvailable}
  >
    {time}
  </button>
)

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const handleBookConsultation = () => {
    if (selectedDate && selectedTime) {
      alert(`Consultation booked for May ${selectedDate}, ${selectedTime}`)
      setSelectedDate(null)
      setSelectedTime(null)
    } else {
      alert('Please select a date and time for your consultation')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <span className="text-2xl font-bold text-teal-600">ImiovaDemo</span>
              <nav className="hidden md:flex space-x-2">
                <NavItem icon={<Home className="w-5 h-5" />} text="Home" active />
                <NavItem icon={<TrendingUp className="w-5 h-5" />} text="Strategies" />
                <NavItem icon={<Activity className="w-5 h-5" />} text="Portfolio" />
                <NavItem icon={<FileText className="w-5 h-5" />} text="Tax" />
                <NavItem icon={<DollarSign className="w-5 h-5" />} text="Calculators" />
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search strategies or tools"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 rounded-full"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Moon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Where do you want to start?</h2>
              <p className="text-gray-600 mb-8">
                Explore tax-efficient strategies or transfer your existing investments to optimize your portfolio.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <FeatureCard
                  icon={<PieChart className="w-12 h-12" />}
                  title="Explore Tax-Efficient Strategies"
                  description="Discover ways to minimize your tax burden and maximize your investment returns."
                />
                <FeatureCard
                  icon={<Briefcase className="w-12 h-12" />}
                  title="Transfer Your Investments"
                  description="Move your existing investments to our tax-optimized platform."
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6">Optimize Your Investments</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<BarChart3 className="w-10 h-10" />}
                  title="Tax-Efficient Asset Allocation"
                  description="Optimize your portfolio's asset mix across different account types."
                  grey
                />
                <FeatureCard
                  icon={<Scissors className="w-10 h-10" />}
                  title="Tax-Loss Harvesting"
                  description="Minimize your tax liability through strategic selling."
                  grey
                />
                <FeatureCard
                  icon={<Users className="w-10 h-10" />}
                  title="Income Splitting Strategies"
                  description="Reduce overall taxes by splitting investment income with family members."
                  grey
                />
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">How can we help?</h2>
              <div className="space-y-2">
                <HelpCard
                  title="Compare Tax-Efficient Accounts"
                  description="Find the right account type for your tax situation and goals."
                />
                <HelpCard
                  title="Tax-Efficient Investing 101"
                  description="Learn the fundamentals of minimizing taxes on your investments."
                />
                <HelpCard
                  title="Tax Planning Resources"
                  description="Access guides and tools for optimizing your tax strategy."
                />
              </div>
            </section>

            <section className="bg-teal-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Book a Tax Consultation</h2>
              <p className="text-gray-600 text-sm mb-4">
                Get personalized advice from our tax experts to optimize your investment strategy.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Schedule Now <Calendar className="w-4 h-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold mb-4">Book a Consultation</DialogTitle>
                  </DialogHeader>
                  <div className="flex-grow overflow-auto">
                    <div className="grid grid-cols-2 gap-8 h-full">
                      <div>
                        <h4 className="text-lg font-medium mb-4">Select a Date</h4>
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <CalendarDay
                              key={day}
                              day={day}
                              isAvailable={day > 15}
                              isSelected={selectedDate === day}
                              onClick={() => setSelectedDate(day)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-4">Select a Time</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
                            <TimeSlot
                              key={time}
                              time={time}
                              isAvailable={true}
                              isSelected={selectedTime === time}
                              onClick={() => setSelectedTime(time)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button onClick={handleBookConsultation} className="w-full bg-teal-500 hover:bg-teal-600 text-white">Book Consultation</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tax-Efficient ETF Watchlist</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Monitor tax-efficient ETFs and stay updated on potential investment opportunities.
              </p>
              <Button variant="outline" className="w-full justify-between">
                Create Watchlist <ArrowRight className="w-4 h-4" />
              </Button>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
