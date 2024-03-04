"use client";

import React, { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState<number | string>('');
  const [technischInputValue, setTechnischInputValue] = useState<number | string>('');
  const [qualitatInputValue, setQualitatInputValue] = useState<number | string>('');
  const [rüstenInputValue, setRüstenInputValue] = useState<number | string>('');
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(100); // Initialize slider value to 100 (corresponds to 100%)
  const [tableValues, setTableValues] = useState<{ technisch: string | number, qualitat: string | number, rüsten: string | number }>({
    technisch: '',
    qualitat: '',
    rüsten: ''
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTechnischInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechnischInputValue(e.target.value);
  };

  const handleQualitatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQualitatInputValue(e.target.value);
  };

  const handleRüstenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRüstenInputValue(e.target.value);
  };

  const handleCalculate = () => {
    const inputNumber = parseFloat(inputValue as string);
    const totalPieces108Percent = 1600; // Total pieces produced in 7.5 hours for 108%
    const piecesPerMinute108Percent = totalPieces108Percent / (7.5 * 60); // Average pieces produced per minute for 108%

    const selectedPercentage = sliderValue / 100; // Get the selected percentage from the slider and convert it to a fraction

    // Calculate the target number of pieces based on the selected percentage
    const targetPieces = totalPieces108Percent * (selectedPercentage / 1.08); // Adjust for the selected percentage

    const piecesRemaining = targetPieces - inputNumber;
    const piecesPerMinute = piecesPerMinute108Percent; // Use the pieces per minute for 108%
    const minutesRemaining = Math.ceil(piecesRemaining / piecesPerMinute); // Round up to nearest whole number

    if (inputNumber < targetPieces) {
      setRemainingTime(minutesRemaining);
    } else {
      alert('You have already reached the maximum production for 7.5 hours.');
      setRemainingTime(0);
    }
  };







  const handleAddToTable = () => {
    // Set the input values to the table
    setTableValues({
      technisch: technischInputValue,
      qualitat: qualitatInputValue,
      rüsten: rüstenInputValue
    });
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="container mx-5 w-full md:w-1/2 shadow-lg shadow-black rounded-lg bg-black">
        <h1 className='text-3xl text-center mt-4 text-white'>Leistungsgradrechner</h1>
        <h1 className="text-sm italic text-center mt-2 px-2 text-white">(Wartezeiten um {sliderValue}% in 7,5 Stunden zu erreichen)</h1>

         {/* Slider */}
         <div className="flex justify-center mt-4 accent-green-500 cursor-pointer">
          <input
            type="range"
            min={95}
            max={108}
            value={sliderValue}
            onChange={handleSliderChange}
            className="w-64"
          />
          <span className="text-white ml-2">{sliderValue}%</span>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex flex-col mx-5">
            <div className="flex items-center mb-2">
              <label htmlFor="technischInput" className="text-white mr-2" style={{ width: '120px' }}>Techn. (geplant)</label>
              <input
                id="technischInput"
                type="number"
                className="border border-gray-300 text-black rounded-md px-2 py-1 text-right"
                placeholder="min"
                value={technischInputValue}
                onChange={handleTechnischInputChange}
              />
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="qualitatInput" className="text-white mr-2" style={{ width: '120px' }}>Qualität</label>
              <input
                id="qualitatInput"
                type="number"
                className="border border-gray-300 text-black rounded-md px-2 py-1 text-right"
                placeholder="min"
                value={qualitatInputValue}
                onChange={handleQualitatInputChange}
              />
            </div>

            <div className="flex items-center mb-2">
              <label htmlFor="rüstenInput" className="text-white mr-2" style={{ width: '120px' }}>Rüsten</label>
              <input
                id="rüstenInput"
                type="number"
                className="border border-gray-300 text-black rounded-md px-2 py-1 text-right"
                placeholder="min"
                value={rüstenInputValue}
                onChange={handleRüstenInputChange}
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="stuckzahlInput" className="text-white mr-2" style={{ width: '120px' }}>Stückzahl</label>
              <input
                id="stuckzahlInput"
                type="number"
                className="border border-gray-300 text-black rounded-md px-2 py-1 text-right"
                placeholder="****"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Button to trigger the calculate function and add the input values to the table */}
        <div className="mt-4 flex justify-center">
          <div className="flex mx-5 w-full md:w-1/3">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => {
                handleCalculate();
                handleAddToTable();
              }}
            >
              Berechnen
            </button>
          </div>
        </div>

        <h2 className='text-center mt-4 mb-2 text-white'>Wartezeiten</h2>

        {/* Centered Table with 2 columns and 4 rows */}
        <div className="mt-2 mb-4 flex justify-center">
          <table className="border border-white">
            <thead>
              <tr>
                <th className="border border-white"></th>
                <th className="border border-white px-2 text-white">Wartezeit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white px-2 text-white">Technisch (ungepl.)</td>
                <td className="border border-white font-bold text-right px-2 text-green-500">
                  {remainingTime !== null ? `${remainingTime - (tableValues.technisch ? parseFloat(tableValues.technisch as string) : 0) - (tableValues.qualitat ? parseFloat(tableValues.qualitat as string) : 0) - (tableValues.rüsten ? parseFloat(tableValues.rüsten as string) : 0)} min` : null}
                </td>
              </tr>
              <tr>
                <td className="border border-white px-2 text-white">Technisch (geplant)</td>
                <td className="border border-white text-right px-2 text-green-500 italic">{tableValues.technisch ? `${tableValues.technisch} min` : null}</td>
              </tr>
              <tr>
                <td className="border border-white px-2 text-white">Qualität</td>
                <td className="border border-white text-right px-2 text-green-500 italic">{tableValues.qualitat ? `${tableValues.qualitat} min` : null}</td>
              </tr>
              <tr>
                <td className="border border-white px-2 text-white">Rüsten</td>
                <td className="border border-white text-right px-2 text-green-500 italic">{tableValues.rüsten ? `${tableValues.rüsten} min` : null}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Conclution */}
        {remainingTime !== null && (
          <div className="text-center my-4 text-white">
            {remainingTime > 0 ? (
              <p>Wartezeit gesammt um {sliderValue}% in 7,5 Stunden zu erreichen: <br /> <span className='font-bold'>{remainingTime} Minuten</span></p>
            ) : (
              <p>You have already reached or exceeded {sliderValue}% in 7,5 hours.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
