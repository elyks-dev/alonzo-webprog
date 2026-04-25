import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";

function ReportsPage() {
  return (
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
          mb: 4,
        }}
      >
        Visual reports for listings, users, and exchange activity.
      </Typography>

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
          sx={{
            borderRadius: "30px",
            border: "2px solid #e4e4e7",
            minHeight: 520,
            boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 800,
                color: "#18181b",
                fontFamily: "Outfit, Poppins, sans-serif",
                mb: 3,
              }}
            >
              User Growth
            </Typography>

            <Box sx={{ height: 400 }}>
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
          sx={{
            borderRadius: "30px",
            border: "2px solid #e4e4e7",
            minHeight: 520,
            boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 800,
                color: "#18181b",
                fontFamily: "Outfit, Poppins, sans-serif",
                mb: 3,
              }}
            >
              Listings Per Category
            </Typography>

            <Box sx={{ height: 400 }}>
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
  );
}

export default ReportsPage;
