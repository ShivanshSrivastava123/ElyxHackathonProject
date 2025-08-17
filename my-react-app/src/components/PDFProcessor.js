import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
// Import pdf.js
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// You need to set the worker source. This is crucial for it to work.
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

export default function PDFProcessor() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  // Get the setter function from your Zustand store
  const { setAllData } = useAppStore();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError('');

    try {
      // 1. Extract text from PDF
      const fileReader = new FileReader();
      fileReader.onload = async function() {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText += textContent.items.map(item => item.str).join(' ') + '\n';
        }
        
        // 2. Send text to your backend
        const response = await fetch('http://localhost:3001/api/process-pdf', { // Your backend server URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: fullText }),
        });

        if (!response.ok) {
          throw new Error('Failed to process PDF on the server.');
        }

        const structuredData = await response.json();

        // 3. Update the app state with the new data
        setAllData(structuredData);
      };
      fileReader.readAsArrayBuffer(file);

    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 my-6">
      <h3 className="font-semibold mb-2">Process New Member PDF</h3>
      <p className="text-sm text-slate-400 mb-3">Upload a chat log PDF to extract and view the member's data.</p>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={isLoading}
        className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
      />
      {isLoading && <p className="text-sm text-amber-400 mt-2">Processing... This may take a moment.</p>}
      {error && <p className="text-sm text-rose-400 mt-2">Error: {error}</p>}
    </div>
  );
}