import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { BarChart, LineChart } from "@mui/x-charts";
import { fetchUsers } from "../../services/UserService";
import { fetchArticles } from "../../services/ArticleService";
import { fetchPosts } from "../../services/PostService";

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function ReportsPage() {
  const reportRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [posts, setPosts] = useState([]);

  const loadReportsData = async () => {
    try {
      const [usersResponse, articlesResponse, postsResponse] =
        await Promise.all([fetchUsers(), fetchArticles(), fetchPosts()]);

      setUsers(usersResponse.data.users || []);
      setArticles(articlesResponse.data.articles || []);
      setPosts(postsResponse.data.posts || []);
    } catch (error) {
      console.error("Failed to load reports data:", error);
    }
  };

  useEffect(() => {
    loadReportsData();
  }, []);

  const monthlyData = useMemo(() => {
    const userCounts = Array(12).fill(0);
    const articleCounts = Array(12).fill(0);
    const discussionCounts = Array(12).fill(0);
    const replyCounts = Array(12).fill(0);

    users.forEach((user) => {
      const month = new Date(user.createdAt).getMonth();
      if (!Number.isNaN(month)) userCounts[month] += 1;
    });

    articles.forEach((article) => {
      const month = new Date(article.createdAt).getMonth();
      if (!Number.isNaN(month)) articleCounts[month] += 1;
    });

    posts.forEach((post) => {
      const month = new Date(post.createdAt).getMonth();
      if (!Number.isNaN(month)) discussionCounts[month] += 1;

      post.replies?.forEach((reply) => {
        const replyMonth = new Date(reply.createdAt).getMonth();
        if (!Number.isNaN(replyMonth)) replyCounts[replyMonth] += 1;
      });
    });

    return {
      userCounts,
      articleCounts,
      discussionCounts,
      replyCounts,
    };
  }, [users, articles, posts]);

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
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: "#f4f4f5",
              fontFamily: "Outfit, Poppins, sans-serif",
              mb: 1,
            }}
          >
            Reports
          </Typography>

          <Typography
            sx={{
              color: "#a1a1aa",
              fontSize: "1rem",
              fontWeight: 500,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Visual reports for users, articles, discussions, and replies.
          </Typography>
        </Box>

        <Button
          onClick={handlePrint}
          startIcon={<PrintOutlinedIcon />}
          sx={{
            borderRadius: "999px",
            border: "1px solid #8b5cf6",
            px: 2.5,
            py: 1,
            color: "#f4f4f5",
            bgcolor: "#8b5cf6",
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "Poppins, sans-serif",
            "&:hover": {
              bgcolor: "#7c3aed",
              borderColor: "#7c3aed",
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
              border: "1px solid #27272a",
              bgcolor: "#18181b",
              minHeight: 520,
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#f4f4f5",
                  fontFamily: "Outfit, Poppins, sans-serif",
                  mb: 1,
                }}
              >
                User Growth
              </Typography>

              <Typography
                sx={{
                  color: "#a1a1aa",
                  fontSize: 14,
                  fontFamily: "Poppins, sans-serif",
                  mb: 3,
                }}
              >
                This chart shows monthly registered users from the database.
              </Typography>

              <Box className="print-chart" sx={{ height: 400 }}>
                <LineChart
                  height={380}
                  margin={{ top: 20, right: 30, bottom: 50, left: 55 }}
                  xAxis={[
                    {
                      data: monthLabels,
                      scaleType: "point",
                    },
                  ]}
                  series={[
                    {
                      data: monthlyData.userCounts,
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
              border: "1px solid #27272a",
              bgcolor: "#18181b",
              minHeight: 520,
              boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                component="h2"
                sx={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#f4f4f5",
                  fontFamily: "Outfit, Poppins, sans-serif",
                  mb: 1,
                }}
              >
                Platform Activity
              </Typography>

              <Typography
                sx={{
                  color: "#a1a1aa",
                  fontSize: 14,
                  fontFamily: "Poppins, sans-serif",
                  mb: 3,
                }}
              >
                This chart displays monthly articles, discussions, and replies.
              </Typography>

              <Box className="print-chart" sx={{ height: 400 }}>
                <BarChart
                  height={380}
                  margin={{ top: 20, right: 30, bottom: 50, left: 55 }}
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
                      data: monthlyData.discussionCounts,
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
        </Box>
      </Box>
    </Box>
  );
}

export default ReportsPage;