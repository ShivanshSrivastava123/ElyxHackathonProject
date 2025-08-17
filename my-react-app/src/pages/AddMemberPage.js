import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

export default function AddMemberPage({ onMemberAdded }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setError('');
    setFileName(file.name);

    try {
      // 1. Read the file
      const fileReader = new FileReader();
      fileReader.onload = async function() {
        try {
          console.log("Step 1: File has been read by FileReader."); // DEBUG LOG 1

          const typedarray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            fullText += textContent.items.map(item => item.str).join(' ') + '\n';
          }
          
          console.log("Step 2: PDF text extracted. Length:", fullText.length); // DEBUG LOG 2
          if (fullText.length === 0) {
              setError("Failed to extract any text from the PDF.");
              setIsLoading(false);
              return;
          }

          // 2. Send text to your backend
          console.log("Step 3: Sending fetch request to the backend..."); // DEBUG LOG 3
          const response = await fetch('http://localhost:3001/api/members', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: fullText }),
          });

          console.log("Step 4: Received response from backend. Status:", response.status); // DEBUG LOG 4

          if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || `Server responded with status ${response.status}`);
          }

          const newMember = await response.json();
          console.log("Step 5: Successfully parsed JSON from backend.", newMember); // DEBUG LOG 5
          
          // 3. Notify the parent App component
          onMemberAdded(newMember._id); 

        } catch (err) {
            console.error("An error occurred inside the FileReader onload function:", err);
            setError(err.message);
            setIsLoading(false);
        }
      };

      fileReader.onerror = function() {
          console.error("FileReader failed to read the file.");
          setError("Failed to read the file.");
          setIsLoading(false);
      };

      fileReader.readAsArrayBuffer(file);

    } catch (err) {
      console.error("An error occurred in the handleFileChange function:", err);
      setError(err.message);
      setIsLoading(false);
    } 
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Add New Member</h1>
      <p className="text-slate-400 mb-6">Upload a PDF chat log to create a new member profile using the AI processor.</p>

      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <label htmlFor="pdf-upload" className="block text-sm font-medium text-slate-300 mb-2">
          Member Chat Log PDF
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isLoading}
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
        />
        {isLoading && <p className="text-sm text-amber-400 mt-3">Processing "{fileName}"... This may take a moment.</p>}
        {error && <p className="text-sm text-rose-400 mt-3">Error: {error}</p>}
      </div>
    </div>
  );
}