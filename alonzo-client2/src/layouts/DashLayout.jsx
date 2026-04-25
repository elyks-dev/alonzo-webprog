import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const drawerWidth = 240;

const dashboardLinks = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    label: "Reports",
    path: "/dashboard/reports",
    icon: <BarChartOutlinedIcon />,
  },
  {
    label: "Users",
    path: "/dashboard/users",
    icon: <PeopleAltOutlinedIcon />,
  },
];

const DashLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", bgcolor: "#fafafa" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1201,
          bgcolor: "#18181b",
          color: "#ffffff",
          borderBottom: "2px solid #27272a",
        }}
      >
        <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={() => navigate("/")}
              sx={{
                color: "#ffffff",
                border: "1px solid #3f3f46",
                "&:hover": {
                  bgcolor: "#27272a",
                },
              }}
            >
              <ArrowBackRoundedIcon fontSize="small" />
            </IconButton>

            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#a1a1aa",
                }}
              >
                ALONZO CREATIVES
              </Typography>

              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Admin Dashboard
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            component={Link}
            to="/"
            sx={{
              borderRadius: "999px",
              border: "2px solid #ffffff",
              px: 2.5,
              py: 0.8,
              color: "#ffffff",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              "&:hover": {
                bgcolor: "#ffffff",
                color: "#18181b",
              },
            }}
          >
            Main Site
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#ffffff",
            borderRight: "2px solid #18181b",
          },
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />

        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: "24px",
              border: "2px solid #e4e4e7",
              bgcolor: "#fafafa",
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#71717a",
              }}
            >
              Navigation
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 14,
                color: "#18181b",
                fontWeight: 700,
              }}
            >
              Manage blog activity
            </Typography>
          </Box>

          <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {dashboardLinks.map((item) => {
              const selected = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.label}
                  component={Link}
                  to={item.path}
                  selected={selected}
                  sx={{
                    borderRadius: "18px",
                    border: selected
                      ? "2px solid #8b5cf6"
                      : "2px solid transparent",
                    bgcolor: selected ? "#f3e8ff !important" : "transparent",
                    color: selected ? "#7c3aed" : "#52525b",
                    px: 2,
                    py: 1.2,
                    transition: "0.2s ease",
                    "&:hover": {
                      bgcolor: "#f4f4f5",
                      borderColor: "#d4d4d8",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ minHeight: 72 }} />

        <Box
          sx={{
            px: { xs: 2, sm: 3, lg: 4 },
            py: 3,
          }}
        >
          <Box
            sx={{
              border: "2px solid #18181b",
              bgcolor: "#ffffff",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(24, 24, 27, 0.08)",
            }}
          >
            <Box
              sx={{
                px: { xs: 2, sm: 3 },
                py: 2,
                borderBottom: "2px solid #18181b",
                bgcolor: "#fafafa",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#71717a",
                }}
              >
                Dashboard Panel
              </Typography>
            </Box>

            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;
