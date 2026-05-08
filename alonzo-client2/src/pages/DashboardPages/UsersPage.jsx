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
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchUsers,
  createUser,
  updateUser,
} from "../../services/UserService";

const emptyForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "male",
  contactNumber: "",
  email: "",
  role: "viewer",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

function UsersPage() {
  const type = localStorage.getItem("type");

  if (type === "editor") {
    return (
      <Box sx={{ p: 5 }}>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#ef4444",
          }}
        >
          Access Denied
        </Typography>

        <Typography sx={{ mt: 1, color: "#52525b" }}>
          Editors are not allowed to access this page.
        </Typography>
      </Box>
    );
  }

  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers();

      const usersFromDB = data.users.map((user, index) => ({
        id: user._id,
        displayId: index + 1,
        ...user,
        role: user.type,
        password: "",
      }));

      setRows(usersFromDB);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        row.firstName.toLowerCase().includes(searchText) ||
        row.lastName.toLowerCase().includes(searchText) ||
        row.email.toLowerCase().includes(searchText) ||
        row.username.toLowerCase().includes(searchText);

      const matchesRole = roleFilter === "all" || row.role === roleFilter;
      const matchesGender =
        genderFilter === "all" || row.gender === genderFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && row.isActive) ||
        (statusFilter === "inactive" && !row.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [rows, search, roleFilter, genderFilter, statusFilter]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.username.trim()) newErrors.username = "Username is required.";

    if (form.username.includes(" ")) {
      newErrors.username = "Username must not contain spaces.";
    }

    if (!/^\d+$/.test(String(form.age))) {
      newErrors.age = "Age must be a number only.";
    }

    if (!/^\d{11}$/.test(String(form.contactNumber))) {
      newErrors.contactNumber = "Contact number must be 11 digits.";
    }

    if (!editingUser && form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (editingUser && form.password && form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setErrors({});
    setOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setForm({
      ...user,
      password: "",
    });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        age: String(form.age),
        gender: form.gender,
        contactNumber: form.contactNumber,
        email: form.email,
        type: form.role,
        username: form.username,
        address: form.address,
        isActive: form.isActive,
      };

      if (form.password) {
        payload.password = form.password;
      }

      if (editingUser) {
        await updateUser(editingUser.id, payload);
      } else {
        await createUser(payload);
      }

      await loadUsers();
      handleClose();
    } catch (error) {
      console.error("Failed to save user:", error);
      setErrors({
        form:
          error.response?.data?.message ||
          "Failed to save user. Please try again.",
      });
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await updateUser(user.id, {
        isActive: !user.isActive,
      });

      await loadUsers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const columns = [
    { field: "displayId", headerName: "ID", width: 90 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.3 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      valueGetter: (_, row) => labelize(row.role),
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      valueGetter: (_, row) => labelize(row.gender),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (_, row) => (row.isActive ? "Active" : "Inactive"),
    },
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
            onClick={() => handleToggleStatus(params.row)}
            sx={{
              minWidth: 90,
              height: 32,
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: 11,
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
              bgcolor: params.row.isActive ? "#ef4444" : "#22c55e",
              "&:hover": {
                bgcolor: params.row.isActive ? "#dc2626" : "#16a34a",
              },
            }}
          >
            {params.row.isActive ? "DISABLE" : "ACTIVATE"}
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
        Users
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
        List of registered users in the exchange platform.
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
              label="Search users"
              placeholder="Search by name, email, or username"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                value={genderFilter}
                onChange={(event) => setGenderFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>

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
              Add User
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
          {editingUser ? "Edit User" : "Add User"}
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
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              label="First Name"
              value={form.firstName}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
              onChange={(event) =>
                setForm({ ...form, firstName: event.target.value })
              }
            />

            <TextField
              label="Last Name"
              value={form.lastName}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
              onChange={(event) =>
                setForm({ ...form, lastName: event.target.value })
              }
            />

            <TextField
              label="Age"
              value={form.age}
              error={Boolean(errors.age)}
              helperText={errors.age}
              onChange={(event) =>
                setForm({ ...form, age: event.target.value })
              }
            />

            <FormControl>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                value={form.gender}
                onChange={(event) =>
                  setForm({ ...form, gender: event.target.value })
                }
              >
                {genders.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {labelize(gender)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Contact Number"
              value={form.contactNumber}
              error={Boolean(errors.contactNumber)}
              helperText={errors.contactNumber}
              onChange={(event) =>
                setForm({ ...form, contactNumber: event.target.value })
              }
            />

            <TextField
              label="Email"
              value={form.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />

            <FormControl>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={form.role}
                onChange={(event) =>
                  setForm({ ...form, role: event.target.value })
                }
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {labelize(role)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Username"
              value={form.username}
              error={Boolean(errors.username)}
              helperText={errors.username}
              onChange={(event) =>
                setForm({ ...form, username: event.target.value })
              }
            />

            <TextField
              label="Password"
              type="password"
              value={form.password}
              error={Boolean(errors.password)}
              helperText={
                editingUser
                  ? errors.password || "Leave blank to keep current password."
                  : errors.password
              }
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
            />

            <TextField
              label="Address"
              value={form.address}
              onChange={(event) =>
                setForm({ ...form, address: event.target.value })
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={form.isActive}
                  onChange={(event) =>
                    setForm({ ...form, isActive: event.target.checked })
                  }
                />
              }
              label={form.isActive ? "Active" : "Inactive"}
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

export default UsersPage;