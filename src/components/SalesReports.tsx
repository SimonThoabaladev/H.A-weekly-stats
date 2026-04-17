import React from 'react';

const SalesReports = () => {
  const salesData = [
    { id: 1, name: "Banana Tag", barcode: "1000000000007", unitsSold: 8, revenue: 143.50, profit: 12.00 },
    { id: 2, name: "Battery AA (4 Pack)", barcode: "1300041000014", unitsSold: 6, revenue: 141.00, profit: 33.00 },
    { id: 3, name: "Apple Tig", barcode: "1000000000006", unitsSold: 5, revenue: 80.00, profit: 12.72 },
    { id: 4, name: "Milk 1L", barcode: "1200041000011", unitsSold: 4, revenue: 42.00, profit: 14.00 },
    { id: 5, name: "Rice 1kg", barcode: "1500041000009", unitsSold: 3, revenue: 46.80, profit: 15.60 },
    { id: 6, name: "Bread Loaf", barcode: "1200041000010", unitsSold: 2, revenue: 28.40, profit: 4.40 },
    { id: 7, name: "Eggs (12)", barcode: "1200041000030", unitsSold: 1, revenue: 24.80, profit: 4.80 }
  ];

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
        Sales Reports
      </h1>
      <p style={{ 
        color: '#7f8c8d', 
        fontSize: '14px', 
        marginBottom: '24px' 
      }}>
        Business analytics and performance insights
      </p>

      {/* Overview Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#2c3e50', 
          marginBottom: '16px' 
        }}>
          Overview
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px', 
          marginBottom: '24px' 
        }}>
          {/* Today Revenue Card */}
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e1e8ed',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '14px', 
              color: '#7f8c8d', 
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Today Revenue
            </h3>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#27ae60', 
              marginBottom: '8px' 
            }}>
              M143.50
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#7f8c8d' 
            }}>
              11 total transactions
            </div>
          </div>

          {/* Daily Average Card */}
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e1e8ed',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '14px', 
              color: '#7f8c8d', 
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Daily Average
            </h3>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#3498db', 
              marginBottom: '8px' 
            }}>
              M20.50
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#7f8c8d' 
            }}>
              Over last 7 days
            </div>
          </div>

          {/* Top Product Card */}
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e1e8ed',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '14px', 
              color: '#7f8c8d', 
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Top Product
            </h3>
            <div style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              color: '#2c3e50', 
              marginBottom: '8px' 
            }}>
              Banana Hg
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#7f8c8d' 
            }}>
              (8 units sold)
            </div>
          </div>
        </div>

        {/* Revenue Trend Chart */}
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
            marginBottom: '20px' 
          }}>
            Revenue Trend (Last 7 Days)
          </h3>
          <div style={{ 
            height: '200px', 
            background: '#f8f9fa', 
            border: '1px solid #e1e8ed', 
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-around',
            padding: '20px'
          }}>
            {/* Chart Bars */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-end', 
              gap: '12px', 
              height: '100%', 
              width: '100%' 
            }}>
              <div style={{ 
                flex: 1, 
                background: '#3498db', 
                height: '60px', 
                borderRadius: '4px 4px 0 0' 
              }}></div>
              <div style={{ 
                flex: 1, 
                background: '#3498db', 
                height: '45px', 
                borderRadius: '4px 4px 0 0' 
              }}></div>
              <div style={{ 
                flex: 1, 
                background: '#3498db', 
                height: '30px', 
                borderRadius: '4px 4px 0 0' 
              }}></div>
              <div style={{ 
                flex: 1, 
                background: '#3498db', 
                height: '55px', 
                borderRadius: '4px 4px 0 0' 
              }}></div>
              <div style={{ 
                flex: 1, 
                background: '#3498db', 
                height: '40px', 
                borderRadius: '4px 4px 0 0' 
              }}></div>
              <div style={{ 
                flex: 1, 
                background: '#3498db', 
                height: '20px', 
                borderRadius: '4px 4px 0 0' 
              }}></div>
              <div style={{ 
                flex: 1, 
                background: '#3498db', 
                height: '35px', 
                borderRadius: '4px 4px 0 0' 
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Performance Table */}
      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e1e8ed'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#2c3e50', 
          marginBottom: '8px' 
        }}>
          Product Performance
        </h2>
        <p style={{ 
          color: '#7f8c8d', 
          fontSize: '14px', 
          marginBottom: '20px' 
        }}>
          Detailed analysis of your best selling products
        </p>
        
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#f8f9fa',
              borderBottom: '2px solid #e1e8ed'
            }}>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                RANK
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                PRODUCT
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                BARCODE
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                UNITS SOLD
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                REVENUE
              </th>
              <th style={{ 
                padding: '16px', 
                textAlign: 'left', 
                fontWeight: '600',
                color: '#2c3e50',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                PROFIT
              </th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((product, index) => (
              <tr key={product.id} style={{ 
                borderBottom: '1px solid #e1e8ed',
                backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa'
              }}>
                <td style={{ 
                  padding: '16px', 
                  fontWeight: '500',
                  color: '#2c3e50'
                }}>
                  {index + 1}
                </td>
                <td style={{ 
                  padding: '16px', 
                  fontWeight: '500',
                  color: '#2c3e50'
                }}>
                  {product.name}
                </td>
                <td style={{ 
                  padding: '16px', 
                  color: '#7f8c8d',
                  fontFamily: 'monospace'
                }}>
                  {product.barcode}
                </td>
                <td style={{ 
                  padding: '16px', 
                  color: '#2c3e50',
                  textAlign: 'center'
                }}>
                  {product.unitsSold}
                </td>
                <td style={{ 
                  padding: '16px', 
                  color: '#27ae60',
                  fontWeight: '500'
                }}>
                  M{product.revenue.toFixed(2)}
                </td>
                <td style={{ 
                  padding: '16px', 
                  color: '#3498db',
                  fontWeight: '500'
                }}>
                  M{product.profit.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
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

export default SalesReports;