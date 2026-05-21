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
  fetchMyArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";
import constants from "../../constants";

const emptyForm = {
  name: "",
  title: "",
  images: [],
  existingImages: [],
  content: "",
};

const getImageUrl = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;

  const baseURL = constants.HOST.replace("/api", "");
  return `${baseURL}${image}`;
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const textFieldSx = {
  "& .MuiInputLabel-root": {
    color: "#a1a1aa",
    backgroundColor: "#18181b",
    px: 0.8,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#c4b5fd",
  },
  "& .MuiOutlinedInput-root": {
    color: "#f4f4f5",
    borderRadius: "18px",
    bgcolor: "#111113",
    "& fieldset": { borderColor: "#3f3f46" },
    "&:hover fieldset": { borderColor: "#71717a" },
    "&.Mui-focused fieldset": { borderColor: "#a78bfa" },
  },
  "& .MuiInputBase-input": {
    color: "#f4f4f5",
  },
  "& .MuiFormHelperText-root": {
    color: "#a1a1aa",
  },
};

const dataGridSx = {
  border: "none",
  fontFamily: "Poppins, sans-serif",
  color: "#e4e4e7",
  fontSize: 15,
  bgcolor: "#18181b",

  "& .MuiDataGrid-main": {
    bgcolor: "#18181b",
  },
  "& .MuiDataGrid-container--top [role=row]": {
    bgcolor: "#111113",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: "1px solid #3f3f46",
    bgcolor: "#111113",
  },
  "& .MuiDataGrid-columnHeader": {
    bgcolor: "#111113",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 900,
    color: "#c4b5fd",
    fontFamily: "Outfit, Poppins, sans-serif",
  },
  "& .MuiDataGrid-columnSeparator": {
    color: "#3f3f46",
  },
  "& .MuiDataGrid-virtualScroller": {
    bgcolor: "#18181b",
  },
  "& .MuiDataGrid-row": {
    bgcolor: "#18181b",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #27272a",
    color: "#e4e4e7",
    bgcolor: "#18181b",
  },
  "& .MuiDataGrid-row:hover": {
    bgcolor: "rgba(139, 92, 246, 0.08)",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #3f3f46",
    color: "#a1a1aa",
    bgcolor: "#111113",
  },
  "& .MuiTablePagination-root": {
    color: "#a1a1aa",
  },
  "& .MuiDataGrid-overlay": {
    bgcolor: "#18181b",
  },
  "& .MuiDataGrid-filler": {
    backgroundColor: "#18181b",
  },
};

function DashArticleListPage() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const loadArticles = async () => {
    try {
      const { data } = await fetchMyArticles();

      const articlesFromDB = data.articles.map((article, index) => ({
        id: article._id,
        displayId: index + 1,
        ...article,
        contentText: article.content.join("\n\n"),
      }));

      setRows(articlesFromDB);
    } catch (error) {
      console.error("Failed to fetch my articles:", error);
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
    if (!form.content.trim()) newErrors.content = "Content is required.";

    const totalImages = form.existingImages.length + form.images.length;

    if (totalImages === 0) {
      newErrors.images = "At least one image is required.";
    }

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
      images: [],
      existingImages: article.images || (article.image ? [article.image] : []),
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

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setForm((prevForm) => ({
      ...prevForm,
      images: [...prevForm.images, ...selectedFiles],
    }));

    event.target.value = "";
  };

  const handleRemoveExistingImage = (imageToRemove) => {
    setForm((prevForm) => ({
      ...prevForm,
      existingImages: prevForm.existingImages.filter(
        (image) => image !== imageToRemove
      ),
    }));
  };

  const handleRemoveNewImage = (indexToRemove) => {
    setForm((prevForm) => ({
      ...prevForm,
      images: prevForm.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const formData = new FormData();

      formData.append("name", form.name.trim() || slugify(form.title));
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("keptImages", JSON.stringify(form.existingImages));

      form.images.forEach((image) => {
        formData.append("images", image);
      });

      if (editingArticle) {
        await updateArticle(editingArticle.id, formData);
      } else {
        await createArticle(formData);
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
    {
      field: "title",
      headerName: "Article Title",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleOpenEdit(params.row)}
            sx={{
              minWidth: 76,
              height: 34,
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: 11,
              borderWidth: "2px",
              color: "#c4b5fd",
              borderColor: "#8b5cf6",
              "&:hover": {
                borderColor: "#c4b5fd",
                bgcolor: "rgba(139, 92, 246, 0.12)",
              },
            }}
          >
            EDIT
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => handleDelete(params.row)}
            sx={{
              minWidth: 86,
              height: 34,
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
          fontWeight: 900,
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "#f4f4f5",
          fontFamily: "Outfit, Poppins, sans-serif",
          mb: 1,
        }}
      >
        My Articles
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
        Manage the articles you created.
      </Typography>

      <Card
        sx={{
          borderRadius: "30px",
          border: "1px solid #27272a",
          bgcolor: "#18181b",
          boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
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
              label="Search my articles"
              placeholder="Search by title"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              sx={textFieldSx}
            />

            <Button
              variant="contained"
              onClick={handleOpenAdd}
              sx={{
                borderRadius: "999px",
                px: 3,
                py: 1.5,
                fontWeight: 900,
                bgcolor: "#8b5cf6",
                whiteSpace: "nowrap",
                "&:hover": {
                  bgcolor: "#7c3aed",
                },
              }}
            >
              Add Article
            </Button>
          </Box>

          <Box
            sx={{
              height: 520,
              width: "100%",
            }}
          >
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[5]}
              disableColumnMenu
              disableRowSelectionOnClick
              hideFooter
              sx={dataGridSx}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              borderRadius: "28px",
              bgcolor: "#18181b",
              color: "#f4f4f5",
              border: "1px solid #27272a",
              boxShadow: "0 24px 80px rgba(0,0,0,0.65)",
            },
          },
          backdrop: {
            sx: {
              bgcolor: "rgba(0,0,0,0.72)",
              backdropFilter: "blur(6px)",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 900,
            fontFamily: "Outfit, Poppins, sans-serif",
            color: "#f4f4f5",
            borderBottom: "1px solid #27272a",
            pb: 2,
          }}
        >
          {editingArticle ? "Edit Article" : "Add Article"}
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {errors.form && (
            <Typography sx={{ color: "#f87171", mb: 2 }}>
              {errors.form}
            </Typography>
          )}

          <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
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
              sx={textFieldSx}
            />

            <TextField
              label="Slug"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              helperText="This is used in the article URL."
              sx={textFieldSx}
            />

            <Box
              sx={{
                border: "1px dashed #3f3f46",
                borderRadius: "20px",
                bgcolor: "#111113",
                p: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#c4b5fd",
                  fontSize: 13,
                  fontWeight: 800,
                  mb: 1,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Upload Images
              </Typography>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={{
                  width: "100%",
                  color: "#d4d4d8",
                }}
              />

              {errors.images && (
                <Typography sx={{ color: "#f87171", mt: 1, fontSize: 13 }}>
                  {errors.images}
                </Typography>
              )}

              {form.existingImages.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      color: "#a1a1aa",
                      mb: 1,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    Current Images
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(120px, 1fr))",
                      gap: 1.5,
                    }}
                  >
                    {form.existingImages.map((image) => (
                      <Box
                        key={image}
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "16px",
                          border: "1px solid #27272a",
                          bgcolor: "#18181b",
                        }}
                      >
                        <img
                          src={getImageUrl(image)}
                          alt="Current article"
                          style={{
                            width: "100%",
                            height: "90px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />

                        <Button
                          onClick={() => handleRemoveExistingImage(image)}
                          sx={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            minWidth: 0,
                            width: 28,
                            height: 28,
                            borderRadius: "999px",
                            bgcolor: "#ef4444",
                            color: "#fff",
                            fontWeight: 900,
                            "&:hover": {
                              bgcolor: "#dc2626",
                            },
                          }}
                        >
                          ×
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {form.images.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      color: "#a1a1aa",
                      mb: 1,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    New Images Selected
                  </Typography>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(120px, 1fr))",
                      gap: 1.5,
                    }}
                  >
                    {form.images.map((image, index) => (
                      <Box
                        key={`${image.name}-${index}`}
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "16px",
                          border: "1px solid #27272a",
                          bgcolor: "#18181b",
                        }}
                      >
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Selected article"
                          style={{
                            width: "100%",
                            height: "90px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />

                        <Button
                          onClick={() => handleRemoveNewImage(index)}
                          sx={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            minWidth: 0,
                            width: 28,
                            height: 28,
                            borderRadius: "999px",
                            bgcolor: "#ef4444",
                            color: "#fff",
                            fontWeight: 900,
                            "&:hover": {
                              bgcolor: "#dc2626",
                            },
                          }}
                        >
                          ×
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            <TextField
              label="Content"
              value={form.content}
              error={Boolean(errors.content)}
              helperText={
                errors.content || "Write each paragraph on a separate line."
              }
              onChange={(event) =>
                setForm({ ...form, content: event.target.value })
              }
              multiline
              minRows={8}
              sx={textFieldSx}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            borderTop: "1px solid #27272a",
          }}
        >
          <Button onClick={handleClose} sx={{ color: "#a1a1aa" }}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              borderRadius: "999px",
              bgcolor: "#8b5cf6",
              fontWeight: 900,
              px: 3,
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