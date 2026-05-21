import { useState } from "react";
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
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const drawerWidth = 250;

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
  {
    label: "Articles",
    path: "/dashboard/articles",
    icon: <ArticleOutlinedIcon />,
  },
];

const DashLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("type");

    navigate("/signin");
  };

  const drawerContent = (
    <>
      <Toolbar sx={{ minHeight: 76 }} />

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            mb: 2,
            p: 2,
            borderRadius: "24px",
            border: "1px solid #27272a",
            bgcolor: "#18181b",
            boxShadow: "0 14px 30px rgba(0,0,0,0.18)",
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#a78bfa",
            }}
          >
            Navigation
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
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: "18px",
                  border: selected
                    ? "1px solid rgba(167, 139, 250, 0.6)"
                    : "1px solid transparent",
                  bgcolor: selected
                    ? "rgba(139, 92, 246, 0.14) !important"
                    : "transparent",
                  color: selected ? "#c4b5fd" : "#a1a1aa",
                  px: 2,
                  py: 1.25,
                  transition: "0.2s ease",
                  "&:hover": {
                    bgcolor: "rgba(139, 92, 246, 0.08)",
                    borderColor: "rgba(167, 139, 250, 0.35)",
                    color: "#f4f4f5",
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
                    fontWeight: 900,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid #27272a",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          
          <Button
            onClick={handleLogout}
            sx={{
              borderRadius: "16px",
              border: "1px solid #ef4444",
              bgcolor: "#ef4444",
              px: 2,
              py: 1.2,
              color: "#ffffff",
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              justifyContent: "flex-start",
              "&:hover": {
                bgcolor: "#dc2626",
                borderColor: "#dc2626",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#111113",
        color: "#f4f4f5",
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1201,
          bgcolor: "rgba(17, 17, 19, 0.9)",
          color: "#ffffff",
          borderBottom: "1px solid #27272a",
          backdropFilter: "blur(18px)",
        }}
      >
        <Toolbar sx={{ minHeight: 76, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "#ffffff",
                border: "1px solid #3f3f46",
                bgcolor: "#18181b",
                "&:hover": {
                  bgcolor: "#27272a",
                  borderColor: "#8b5cf6",
                },
              }}
            >
              <MenuRoundedIcon fontSize="small" />
            </IconButton>

            <IconButton
              onClick={() => navigate("/")}
              sx={{
                color: "#ffffff",
                border: "1px solid #3f3f46",
                bgcolor: "#18181b",
                "&:hover": {
                  bgcolor: "#27272a",
                  borderColor: "#8b5cf6",
                },
              }}
            >
              <ArrowBackRoundedIcon fontSize="small" />
            </IconButton>

            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#a78bfa",
                }}
              >
                AlonzoTech
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 16, sm: 20 },
                  fontWeight: 900,
                  lineHeight: 1.2,
                  color: "#f4f4f5",
                }}
              >
                User Dashboard
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1.5 }}>

            <Button
              onClick={handleLogout}
              sx={{
                borderRadius: "999px",
                border: "1px solid #ef4444",
                px: 2.5,
                py: 0.8,
                color: "#ffffff",
                bgcolor: "#ef4444",
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                "&:hover": {
                  bgcolor: "#dc2626",
                  borderColor: "#dc2626",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#151517",
            borderRight: "1px solid #27272a",
            color: "#f4f4f5",
          },
        }}
      >
        <IconButton
          onClick={() => setMobileOpen(false)}
          sx={{
            position: "absolute",
            top: 18,
            right: 14,
            color: "#ffffff",
            border: "1px solid #3f3f46",
            bgcolor: "#18181b",
            zIndex: 10,
            "&:hover": {
              bgcolor: "#27272a",
            },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>

        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#151517",
            borderRight: "1px solid #27272a",
            color: "#f4f4f5",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          bgcolor: "#111113",
        }}
      >
        <Toolbar sx={{ minHeight: 76 }} />

        <Box
          sx={{
            px: { xs: 1.5, sm: 3, lg: 4 },
            py: { xs: 2, sm: 3 },
          }}
        >
          <Box
            sx={{
              border: "1px solid #27272a",
              bgcolor: "#151517",
              borderRadius: { xs: "22px", sm: "30px" },
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
            }}
          >
            <Box
              sx={{
                px: { xs: 2, sm: 3 },
                py: 2,
                borderBottom: "1px solid #27272a",
                bgcolor: "#18181b",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#a78bfa",
                }}
              >
                Dashboard Panel
              </Typography>
            </Box>

            <Box sx={{ p: { xs: 1.5, sm: 3 } }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashLayout;