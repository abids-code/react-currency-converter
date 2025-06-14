import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'
import { useState } from 'react'
import Header from './components/Header/Header'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("bdt")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [gradient, setGradient] = useState('from-blue-500 to-purple-600')

  const gradients = [
    'from-rose-400 to-fuchsia-500'
  ]

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
    }
  }

  return (
    <>
      <Header />
      <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br ${gradient} transition-all duration-1000`}>
        <div className='text-center py-10 space-y-4 px-4'>
          <h2 className='text-3xl font-bold text-white'>Convert Any Currency Instantly with Real-Time Rates</h2>
          <p className='text-white/80 font-light max-w-xl mx-auto'>
            Easily convert between currencies from around the world using up-to-date exchange rates. Whether you're planning a trip, shopping internationally, or managing finances, get accurate conversions in seconds.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-start gap-6 px-4 pb-10 w-full max-w-6xl">
          {/* Main Card */}
          <div className="w-full md:w-[450px] border border-gray-200 rounded-2xl p-6 backdrop-blur-md bg-white/70 shadow-xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-2">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>

              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border border-blue-600 rounded-md bg-blue-600 text-white px-3 py-1 shadow"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>

              <div className="w-full mt-2 mb-4">
                <InputBox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>

              <button type="submit" className="w-full uppercase hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-all duration-300">
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>

          {/* Summary Card */}
          <div className="w-full md:w-[450px] border border-gray-200 rounded-2xl p-6 bg-white/70 backdrop-blur-md shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Conversion Summary</h3>
            <p className="text-gray-800 text-lg">
              {amount} {from.toUpperCase()} = <strong className="text-blue-700">{convertedAmount} {to.toUpperCase()}</strong>
            </p>
            <p className="text-gray-500 text-sm mt-2">Exchange rates are updated in real-time from a trusted API.</p>
            <div className="mt-4 text-sm text-gray-600">
              Base currency: <strong>{from.toUpperCase()}</strong><br />
              Target currency: <strong>{to.toUpperCase()}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;