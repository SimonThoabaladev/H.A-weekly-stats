import React, { useState } from 'react';

const BarcodeGenerator = () => {
  const [barcodeText, setBarcodeText] = useState('');
  const [generatedBarcode, setGeneratedBarcode] = useState('');
  const [coverEdges, setCoverEdges] = useState(false);
  const [generateHover, setGenerateHover] = useState(false);
  const [printHover, setPrintHover] = useState(false);

  const generateBarcode = () => {
    if (barcodeText) {
      // Simple barcode generation simulation
      setGeneratedBarcode(barcodeText);
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <h1 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '8px'
      }}>
        Barcode Generator
      </h1>
      
      <h2 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '8px'
      }}>
        Barcode Generator
      </h2>
      
      <p style={{
        color: '#7f8c8d',
        fontSize: '14px',
        marginBottom: '24px'
      }}>
        Create and print product barcodes.
      </p>

      <div style={{
        height: '1px',
        backgroundColor: '#e1e8ed',
        margin: '24px 0'
      }}></div>

      {/* Form Section */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e1e8ed',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '16px'
        }}>
          Project Color / Text
        </h3>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#2c3e50',
            fontSize: '14px'
          }}>
            Enter product code or text.
          </label>
          <input
            type="text"
            placeholder="Enter product code or text"
            value={barcodeText}
            onChange={(e) => setBarcodeText(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e1e8ed'
        }}>
          <input 
            type="checkbox" 
            id="coverEdges"
            checked={coverEdges}
            onChange={(e) => setCoverEdges(e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              accentColor: '#3498db'
            }}
          />
          <label 
            htmlFor="coverEdges"
            style={{
              fontSize: '14px',
              color: '#2c3e50',
              fontWeight: '500'
            }}
          >
            Coverage threads
          </label>
        </div>

        <button 
          onClick={generateBarcode}
          onMouseEnter={() => setGenerateHover(true)}
          onMouseLeave={() => setGenerateHover(false)}
          style={{
            backgroundColor: generateHover ? '#2980b9' : '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'background-color 0.2s'
          }}
        >
          Generate Barcode
        </button>
      </div>

      {/* Generated Barcode Preview */}
      {generatedBarcode && (
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e1e8ed'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#2c3e50',
            marginBottom: '16px'
          }}>
            Generated Barcode:
          </h3>
          
          <div style={{
            background: '#f8f9fa',
            padding: '30px 20px',
            border: '1px solid #e1e8ed',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '20px',
            fontFamily: 'monospace',
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '2px',
            color: '#2c3e50'
          }}>
            {generatedBarcode}
          </div>
          
          <button 
            onMouseEnter={() => setPrintHover(true)}
            onMouseLeave={() => setPrintHover(false)}
            style={{
              backgroundColor: printHover ? '#219a52' : '#27ae60',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%',
              transition: 'background-color 0.2s'
            }}
          >
            Print Barcode
          </button>
        </div>
      )}

      {/* Footer Section (matching your screenshot layout) */}
      <div style={{
        marginTop: '40px',
        paddingTop: '20px',
        borderTop: '1px solid #e1e8ed'
      }}>
        <div style={{
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '4px'
        }}>
          Tumelo Molumo · 1st
        </div>
        <div style={{
          color: '#7f8c8d',
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          Full-Stack Developer | Automating Business Operation...
        </div>
        <div style={{
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '4px'
        }}>
          I Built a Full-Stack POS System from Scratch!
        </div>
        <div style={{
          color: '#7f8c8d',
          fontSize: '14px'
        }}>
          I'm excited to share a project I've been working on: ... more
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;