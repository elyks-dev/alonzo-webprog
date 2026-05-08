import { useRef } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { BarChart, LineChart } from "@mui/x-charts";

function ReportsPage() {
  const reportRef = useRef(null);

  const handlePrint = () => {
    const style = document.createElement("style");

    style.innerHTML = `
      @page {
        size: A4 portrait;
        margin: 10mm;
      }

      @media print {
        html,
        body {
          width: 210mm;
          height: 297mm;
          overflow: hidden;
        }

        body * {
          visibility: hidden;
        }

        #print-area,
        #print-area * {
          visibility: visible;
        }

        #print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding: 0;
        }

        .reports-grid {
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
        }

        .print-section {
          width: 100% !important;
          height: 340px !important;
          min-height: 340px !important;
          max-height: 340px !important;
          overflow: hidden !important;
          box-shadow: none !important;
          border-radius: 18px !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        .print-section .MuiCardContent-root {
          padding: 14px !important;
        }

        .print-section h2 {
          font-size: 20px !important;
          margin-bottom: 2px !important;
        }

        .print-section p {
          font-size: 11px !important;
          margin-bottom: 4px !important;
        }

        .print-chart {
          height: 220px !important;
        }

        .print-chart svg {
          width: 100% !important;
          height: 220px !important;
        }

        button {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    window.print();

    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "2.2rem", md: "3.2rem" },
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#18181b",
              fontFamily: "Outfit, Poppins, sans-serif",
              mb: 1,
            }}
          >
            Reports
          </Typography>

          <Typography
            sx={{
              color: "#52525b",
              fontSize: "1rem",
              fontWeight: 500,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Visual reports for listings, users, and exchange activity.
          </Typography>
        </Box>

        <Button
          onClick={handlePrint}
          startIcon={<PrintOutlinedIcon />}
          sx={{
            borderRadius: "999px",
            border: "2px solid #18181b",
            px: 2.5,
            py: 1,
            color: "#18181b",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "Poppins, sans-serif",
            "&:hover": {
              bgcolor: "#18181b",
              color: "#ffffff",
            },
          }}
        >
          Print Report
        </Button>
      </Box>

      <Box ref={reportRef} id="print-area">
        <Box
          className="reports-grid"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1fr 1fr",
            },
            gap: 3,
          }}
        >
          <Card
            className="print-section"
            sx={{
              borderRadius: "30px",
              border: "2px solid #e4e4e7",
              minHeight: 520,
              boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#18181b",
                  fontFamily: "Outfit, Poppins, sans-serif",
                  mb: 1,
                }}
              >
                User Growth
              </Typography>

              <Typography
                sx={{
                  color: "#52525b",
                  fontSize: 14,
                  fontFamily: "Poppins, sans-serif",
                  mb: 3,
                }}
              >
                This chart shows the increase of registered users from January
                to June.
              </Typography>

              <Box className="print-chart" sx={{ height: 400 }}>
                <LineChart
                  height={380}
                  margin={{ top: 20, right: 30, bottom: 50, left: 55 }}
                  xAxis={[
                    {
                      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                      scaleType: "point",
                    },
                  ]}
                  series={[
                    {
                      data: [20, 35, 48, 60, 85, 120],
                      label: "Users",
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>

          <Card
            className="print-section"
            sx={{
              borderRadius: "30px",
              border: "2px solid #e4e4e7",
              minHeight: 520,
              boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#18181b",
                  fontFamily: "Outfit, Poppins, sans-serif",
                  mb: 1,
                }}
              >
                Listings Per Category
              </Typography>

              <Typography
                sx={{
                  color: "#52525b",
                  fontSize: 14,
                  fontFamily: "Poppins, sans-serif",
                  mb: 3,
                }}
              >
                This chart displays the number of listings posted under each
                item category.
              </Typography>

              <Box className="print-chart" sx={{ height: 400 }}>
                <BarChart
                  height={380}
                  margin={{ top: 20, right: 30, bottom: 50, left: 55 }}
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["Books", "Uniforms", "Supplies", "Others"],
                    },
                  ]}
                  series={[
                    {
                      data: [18, 26, 15, 10],
                      label: "Listings",
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportsPage;