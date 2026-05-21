import { useEffect, useMemo, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchUsers } from "../../services/UserService";
import { fetchArticles } from "../../services/ArticleService";
import { fetchPosts } from "../../services/PostService";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [posts, setPosts] = useState([]);

  const loadDashboardData = async () => {
    try {
      const [usersResponse, articlesResponse, postsResponse] =
        await Promise.all([fetchUsers(), fetchArticles(), fetchPosts()]);

      setUsers(usersResponse.data.users || []);
      setArticles(articlesResponse.data.articles || []);
      setPosts(postsResponse.data.posts || []);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalReplies = useMemo(() => {
    return posts.reduce((total, post) => total + (post.replies?.length || 0), 0);
  }, [posts]);

  const activeUsers = useMemo(() => {
    return users.filter((user) => user.isActive).length;
  }, [users]);

  const stats = [
    { label: "Total Users", value: users.length },
    { label: "Articles Published", value: articles.length },
    { label: "Discussions Posted", value: posts.length },
    { label: "Replies Shared", value: totalReplies },
  ];

  const monthlyData = useMemo(() => {
    const articleCounts = Array(12).fill(0);
    const postCounts = Array(12).fill(0);
    const replyCounts = Array(12).fill(0);

    articles.forEach((article) => {
      const month = new Date(article.createdAt).getMonth();
      articleCounts[month] += 1;
    });

    posts.forEach((post) => {
      const postMonth = new Date(post.createdAt).getMonth();
      postCounts[postMonth] += 1;

      post.replies?.forEach((reply) => {
        const replyMonth = new Date(reply.createdAt).getMonth();
        replyCounts[replyMonth] += 1;
      });
    });

    return {
      articleCounts,
      postCounts,
      replyCounts,
    };
  }, [articles, posts]);

  const pieData = [
    { id: 0, value: articles.length, label: "Articles" },
    { id: 1, value: posts.length, label: "Discussions" },
    { id: 2, value: totalReplies, label: "Replies" },
    { id: 3, value: activeUsers, label: "Active Users" },
  ];

  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: "2.2rem", md: "3.2rem" },
          fontWeight: 900,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "#f4f4f5",
          fontFamily: "Outfit, Poppins, sans-serif",
          mb: 1,
        }}
      >
        Dashboard Overview
      </Typography>

      <Typography
        sx={{
          color: "#a1a1aa",
          fontSize: "1rem",
          fontWeight: 500,
          fontFamily: "Poppins, sans-serif",
          mb: 4,
        }}
      >
        Quick summary of platform activity, articles, discussions, and users.
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
              border: "1px solid #27272a",
              bgcolor: "#18181b",
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
              transition: "0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                borderColor: "rgba(167, 139, 250, 0.5)",
                bgcolor: "#1d1d22",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#a1a1aa",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {item.label}
              </Typography>

              <Typography
                sx={{
                  fontSize: "3.6rem",
                  fontWeight: 900,
                  lineHeight: 1,
                  mt: 1.5,
                  color: "#f4f4f5",
                  letterSpacing: "-0.06em",
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
            border: "1px solid #27272a",
            bgcolor: "#18181b",
            minHeight: 520,
            boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                color: "#f4f4f5",
                fontFamily: "Outfit, Poppins, sans-serif",
                mb: 1,
              }}
            >
              Monthly Activity
            </Typography>

            <Typography
              sx={{
                color: "#a1a1aa",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                fontFamily: "Poppins, sans-serif",
                mb: 3,
              }}
            >
              Displays current platform activity based on articles,
              discussions, and replies from the database.
            </Typography>

            <Box sx={{ height: 400 }}>
              <BarChart
                height={380}
                margin={{ top: 20, right: 20, bottom: 50, left: 45 }}
                xAxis={[
                  {
                    scaleType: "band",
                    data: monthLabels,
                  },
                ]}
                series={[
                  {
                    data: monthlyData.articleCounts,
                    label: "Articles",
                  },
                  {
                    data: monthlyData.postCounts,
                    label: "Discussions",
                  },
                  {
                    data: monthlyData.replyCounts,
                    label: "Replies",
                  },
                ]}
              />
            </Box>
          </CardContent>
        </Card>

        <Card
          sx={{
            borderRadius: "30px",
            border: "1px solid #27272a",
            bgcolor: "#18181b",
            minHeight: 520,
            boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                color: "#f4f4f5",
                fontFamily: "Outfit, Poppins, sans-serif",
                mb: 1,
              }}
            >
              Platform Summary
            </Typography>

            <Typography
              sx={{
                color: "#a1a1aa",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                fontFamily: "Poppins, sans-serif",
                mb: 3,
              }}
            >
              Visual breakdown of current content and engagement distribution
              across the platform.
            </Typography>

            <Box sx={{ height: 400 }}>
              <PieChart
                height={380}
                margin={{ top: 30, right: 40, bottom: 20, left: 40 }}
                series={[
                  {
                    outerRadius: 125,
                    data: pieData,
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
          border: "1px solid #27272a",
          bgcolor: "#18181b",
          minHeight: 520,
          boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              px: 4,
              pt: 4,
              pb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                color: "#f4f4f5",
                fontFamily: "Outfit, Poppins, sans-serif",
              }}
            >
              Location Map
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: "#a1a1aa",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                fontFamily: "Poppins, sans-serif",
                maxWidth: 700,
              }}
            >
              Work in progress. Future updates will include live user activity,
              regional engagement tracking, and interactive community insights.
            </Typography>
          </Box>

          <Box
            sx={{
              height: 500,
              width: "100%",
              position: "relative",
              filter: "saturate(0.75) brightness(0.9)",
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

            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 999,
                px: 2,
                py: 1,
                borderRadius: "999px",
                border: "1px solid rgba(167, 139, 250, 0.4)",
                bgcolor: "rgba(17,17,19,0.82)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  color: "#c4b5fd",
                  textTransform: "uppercase",
                }}
              >
                Work in Progress
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;