import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";

const emptyForm = {
  name: "",
  title: "",
  image: "",
  content: "",
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

function DashArticleListPage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const loadArticles = async () => {
    try {
      const { data } = await fetchArticles();

      const articlesFromDB = data.articles.map((article, index) => ({
        id: article._id,
        displayId: index + 1,
        ...article,
        contentText: article.content.join("\n\n"),
      }));

      setRows(articlesFromDB);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const searchText = search.toLowerCase();

      return (
        row.title.toLowerCase().includes(searchText) ||
        row.name.toLowerCase().includes(searchText)
      );
    });
  }, [rows, search]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.image.trim()) newErrors.image = "Image URL is required.";
    if (!form.content.trim()) newErrors.content = "Content is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setForm(emptyForm);
    setErrors({});
    setOpen(true);
  };

  const handleOpenEdit = (article) => {
    setEditingArticle(article);
    setForm({
      name: article.name,
      title: article.title,
      image: article.image,
      content: article.contentText,
    });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingArticle(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        name: form.name.trim() || slugify(form.title),
        title: form.title,
        image: form.image,
        content: form.content
          .split("\n")
          .map((paragraph) => paragraph.trim())
          .filter(Boolean),
      };

      if (editingArticle) {
        await updateArticle(editingArticle.id, payload);
      } else {
        await createArticle(payload);
      }

      await loadArticles();
      handleClose();
    } catch (error) {
      console.error("Failed to save article:", error);
      setErrors({
        form:
          error.response?.data?.message ||
          "Failed to save article. Please try again.",
      });
    }
  };

  const handleDelete = async (article) => {
    try {
      await deleteArticle(article.id);
      await loadArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  const columns = [
    { field: "displayId", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", flex: 1.4 },
    { field: "name", headerName: "Slug", flex: 1.2 },
    {
      field: "actions",
      headerName: "Actions",
      width: 210,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleOpenEdit(params.row)}
            sx={{
              minWidth: 70,
              height: 32,
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: 11,
              borderWidth: "2px",
            }}
          >
            EDIT
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => handleDelete(params.row)}
            sx={{
              minWidth: 80,
              height: 32,
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: 11,
              bgcolor: "#ef4444",
              "&:hover": {
                bgcolor: "#dc2626",
              },
            }}
          >
            DELETE
          </Button>
        </Box>
      ),
    },
  ];

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
        Articles
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
        Manage articles shown on the public article list page.
      </Typography>

      <Card
        sx={{
          borderRadius: "30px",
          border: "2px solid #e4e4e7",
          boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              mb: 3,
            }}
          >
            <TextField
              fullWidth
              label="Search articles"
              placeholder="Search by title or slug"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <Button
              variant="contained"
              onClick={handleOpenAdd}
              sx={{
                borderRadius: "999px",
                px: 3,
                fontWeight: 800,
                bgcolor: "#8b5cf6",
                "&:hover": {
                  bgcolor: "#7c3aed",
                },
              }}
            >
              Add Article
            </Button>
          </Box>

          <Box sx={{ height: 520, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[5]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              sx={{
                border: "none",
                fontFamily: "Poppins, sans-serif",
                color: "#27272a",
                fontSize: 15,

                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: "2px solid #e4e4e7",
                },

                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: 800,
                  color: "#4c1d95",
                  fontFamily: "Outfit, Poppins, sans-serif",
                },

                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e4e4e7",
                },

                "& .MuiDataGrid-row:hover": {
                  bgcolor: "#faf5ff",
                },

                "& .MuiDataGrid-footerContainer": {
                  borderTop: "2px solid #e4e4e7",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle
          sx={{
            fontWeight: 800,
            fontFamily: "Outfit, Poppins, sans-serif",
          }}
        >
          {editingArticle ? "Edit Article" : "Add Article"}
        </DialogTitle>

        <DialogContent>
          {errors.form && (
            <Typography sx={{ color: "#ef4444", mb: 2 }}>
              {errors.form}
            </Typography>
          )}

          <Box
            sx={{
              display: "grid",
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              label="Title"
              value={form.title}
              error={Boolean(errors.title)}
              helperText={errors.title}
              onChange={(event) =>
                setForm({
                  ...form,
                  title: event.target.value,
                  name: slugify(event.target.value),
                })
              }
            />

            <TextField
              label="Slug"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              helperText="This is used in the article URL."
            />

            <TextField
              label="Image URL"
              value={form.image}
              error={Boolean(errors.image)}
              helperText={errors.image}
              onChange={(event) =>
                setForm({ ...form, image: event.target.value })
              }
            />

            <TextField
              label="Content"
              value={form.content}
              error={Boolean(errors.content)}
              helperText={
                errors.content ||
                "Write each paragraph on a separate line."
              }
              onChange={(event) =>
                setForm({ ...form, content: event.target.value })
              }
              multiline
              minRows={8}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              bgcolor: "#8b5cf6",
              "&:hover": {
                bgcolor: "#7c3aed",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DashArticleListPage;