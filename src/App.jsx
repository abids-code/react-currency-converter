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

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }


  return (
    <>
      <Header></Header>
      <div className='max-w-11/12 mx-auto bg-slate-100 shadow rounded-2xl p-2'>
        <div className='text-center py-10 space-y-4'>
          <h2 className='text-3xl font-bold'>Convert Any Currency Instantly with Real-Time Rates</h2>
          <p className='text-gray-400 font-lights w-1/3 mx-auto'>Easily convert between currencies from around the world using up-to-date exchange rates. Whether you're planning a trip, shopping internationally, or managing finances, get accurate conversions in seconds.</p>
        </div>
        <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('https://plus.unsplash.com/premium_photo-1681487767138-ddf2d67b35c1?q=80&w=2155&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        >
          <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  convert()
                }}
              >
                <div className="w-full mb-1">
                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setAmount(amount)}
                    selectCurrency={from}
                    onAmountChange={(amount) => setAmount(amount)}
                  />
                </div>
                <div className="relative w-full h-0.5">
                  <button
                    type="button"
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                    onClick={swap}
                  >
                    swap
                  </button>
                </div>
                <div className="w-full mt-1 mb-4">
                  <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setTo(currency)}
                    selectCurrency={to}
                    amountDisable
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
