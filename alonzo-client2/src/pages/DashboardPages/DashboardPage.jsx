import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const stats = [
  { label: "Total Users", value: "120" },
  { label: "Active Listings", value: "48" },
  { label: "Completed Trades", value: "32" },
  { label: "Pending Reports", value: "6" },
];

function DashboardPage() {
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
        Dashboard Overview
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
        Quick summary of user activity and exchange performance.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {stats.map((item) => (
          <Card
            key={item.label}
            sx={{
              minHeight: 150,
              borderRadius: "28px",
              border: "2px solid #e4e4e7",
              borderTop: "6px solid #8b5cf6",
              boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#52525b",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "3.6rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  mt: 1.5,
                  color: "#18181b",
                  letterSpacing: "-0.04em",
                  fontFamily: "Outfit, Poppins, sans-serif",
                }}
              >
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

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
              Monthly Activity
            </Typography>

            <Box sx={{ height: 400 }}>
              <BarChart
                height={380}
                margin={{ top: 20, right: 20, bottom: 50, left: 45 }}
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Jan", "Feb", "Mar", "Apr", "May"],
                  },
                ]}
                series={[
                  { data: [18, 26, 35, 30, 44], label: "Listings" },
                  { data: [10, 18, 24, 22, 31], label: "Trades" },
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
              Category Summary
            </Typography>

            <Box sx={{ height: 400 }}>
              <PieChart
                height={380}
                margin={{ top: 30, right: 40, bottom: 20, left: 40 }}
                series={[
                  {
                    outerRadius: 125,
                    data: [
                      { id: 0, value: 35, label: "Uniforms" },
                      { id: 1, value: 25, label: "Books" },
                      { id: 2, value: 20, label: "Supplies" },
                      { id: 3, value: 20, label: "Others" },
                    ],
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: {
                      vertical: "top",
                      horizontal: "middle",
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Card
        sx={{
          mt: 3,
          borderRadius: "30px",
          border: "2px solid #e4e4e7",
          minHeight: 520,
          boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>

          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 800,
              color: "#18181b",
              fontFamily: "Outfit, Poppins, sans-serif",
              pl: 2,
              pt: 1,
              mb: 1,
            }}
          >
            Location Map
          </Typography>
          <Box
            sx={{
              height: 500,
              width: "100%",
            }}
          >
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  National University-Manila <br />
                  551 F Jhocson St, Sampaloc, Manila
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;