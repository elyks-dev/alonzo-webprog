import { useRef } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { BarChart, LineChart } from "@mui/x-charts";

function ReportsPage() {
  const reportRef = useRef(null);

  const handlePrint = () => {
    const printContent = reportRef.current;

    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Reports Summary</title>
          <style>
            @page {
              size: A4;
              margin: 18mm;
            }

            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              font-family: Poppins, Arial, sans-serif;
              color: #18181b;
              background: #ffffff;
            }

            .print-wrapper {
              padding: 20px;
            }

            .print-header {
              margin-bottom: 24px;
              border-bottom: 2px solid #18181b;
              padding-bottom: 16px;
            }

            .print-label {
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 0.24em;
              text-transform: uppercase;
              color: #71717a;
              margin-bottom: 6px;
            }

            .print-title {
              font-size: 34px;
              font-weight: 800;
              margin: 0;
              font-family: Outfit, Poppins, Arial, sans-serif;
            }

            .print-description {
              margin-top: 8px;
              font-size: 14px;
              color: #52525b;
              line-height: 1.6;
            }

            .print-section {
              border: 2px solid #e4e4e7;
              border-radius: 22px;
              padding: 20px;
              margin-bottom: 20px;
              page-break-inside: avoid;
            }

            .print-section h2 {
              font-size: 22px;
              margin: 0 0 8px;
              font-family: Outfit, Poppins, Arial, sans-serif;
            }

            .print-section p {
              font-size: 13px;
              color: #52525b;
              margin: 0 0 18px;
              line-height: 1.6;
            }

            .print-chart {
              width: 100%;
              overflow: hidden;
            }

            svg {
              max-width: 100%;
            }
          </style>
        </head>

        <body>
          <div class="print-wrapper">
            <div class="print-header">
              <div class="print-label">Alonzo Creatives</div>
              <h1 class="print-title">Reports Summary</h1>
              <div class="print-description">
                Visual reports for listings, users, and exchange activity.
              </div>
            </div>

            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
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

      <Box ref={reportRef}>
        <Box
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