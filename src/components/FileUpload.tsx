import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet } from 'lucide-react';
import Papa from 'papaparse';
import type { Contact } from '../types';

interface FileUploadProps {
  onDataLoaded: (contacts: Contact[]) => void;
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        onDataLoaded(results.data as Contact[]);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      }
    });
  }, [onDataLoaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div className="text-center">
      <FileSpreadsheet className="mx-auto h-16 w-16 text-blue-600 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact List Analytics</h2>
      <p className="text-gray-600 mb-8">Upload your CSV file to visualize and analyze your contact data</p>
      
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-12 cursor-pointer transition-all
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-lg text-blue-500 font-medium">Drop your CSV file here...</p>
        ) : (
          <div>
            <p className="text-lg text-gray-600 font-medium">Drag & drop your contact list CSV here</p>
            <p className="text-sm text-gray-400 mt-2">or click to select a file</p>
          </div>
        )}
      </div>
    </div>
  );
}