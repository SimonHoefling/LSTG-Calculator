"use client";

import React, { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState<number | string>('');
  const [technischInputValue, setTechnischInputValue] = useState<number | string>('');
  const [qualitatInputValue, setQualitatInputValue] = useState<number | string>('');
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [tableValues, setTableValues] = useState<{ technisch: string | number, qualitat: string | number }>({
    technisch: '',
    qualitat: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleTechnischInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechnischInputValue(e.target.value);
  };

  const handleQualitatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQualitatInputValue(e.target.value);
  };

  const handleCalculate = () => {
    const inputNumber = parseFloat(inputValue as string);
    const totalPieces = 1570.37; // Total pieces produced in 8 hours
    const targetPieces = totalPieces * 1.06; // Target number of pieces (106% of production)

    if (inputNumber <= totalPieces) {
      const piecesRemaining = targetPieces - inputNumber;
      const piecesPerMinute = totalPieces / (8 * 60); // Average pieces produced per minute
      const minutesRemaining = Math.ceil(piecesRemaining / piecesPerMinute); // Round up to nearest whole number
      setRemainingTime(minutesRemaining);
    } else {
      alert('You have already exceeded 106% in 8 hours.');
      setRemainingTime(0);
    }
  };

  const handleAddToTable = () => {
    // Set the input values to the table
    setTableValues({
      technisch: technischInputValue,
      qualitat: qualitatInputValue
    });
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="container mx-5 w-full md:w-1/2 shadow-lg shadow-black rounded-lg bg-black">
        <h1 className='text-3xl text-center mt-2 text-white'>Leistungsgradrechner</h1>
        <h1 className="text-md italic text-center mt-2 px-2 text-white">(Wartezeiten um 106% in 8 Stunden zu erreichen)</h1>

        <div className="mt-4 flex justify-center">
          <div className="flex flex-col mx-5">
            <input
              type="number"
              className="border border-gray-300 text-black rounded-md px-3 py-2 mb-2"
              placeholder="Techn. (geplant) min"
              value={technischInputValue}
              onChange={handleTechnischInputChange}
            />
            <input
              type="number"
              className="border border-gray-300 text-black rounded-md px-3 py-2"
              placeholder="Qualität min"
              value={qualitatInputValue}
              onChange={handleQualitatInputChange}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex mx-5">
            <input
              type="number"
              className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
              placeholder="Stückzahl"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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

        {/* Centered Table with 2 columns and 3 rows */}
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
                <td className="border border-white font-bold text-right px-2 text-white">
                  {remainingTime !== null ? `${remainingTime - (tableValues.technisch ? parseFloat(tableValues.technisch as string) : 0) - (tableValues.qualitat ? parseFloat(tableValues.qualitat as string) : 0)} min` : null}
                </td>
              </tr>
              <tr>
                <td className="border border-white px-2 text-white">Technisch (geplant)</td>
                <td className="border border-white font-bold text-right px-2 text-white">{tableValues.technisch ? `${tableValues.technisch} min` : null}</td>
              </tr>
              <tr>
                <td className="border border-white px-2 text-white">Qualität</td>
                <td className="border border-white font-bold text-right px-2 text-white">{tableValues.qualitat ? `${tableValues.qualitat} min` : null}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {remainingTime !== null && (
          <div className="text-center my-4 text-white">
            {remainingTime > 0 ? (
              <p>Wartezeit gesammt um 106% in 8 Stunden zu erreichen: <br /> <span className='font-bold'>{remainingTime} Minuten</span></p>
            ) : (
              <p>You have already reached or exceeded 106% in 8 hours.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
