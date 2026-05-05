import { useMemo, useState } from "react";
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
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../assets/users.json";

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
  const [rows, setRows] = useState(
    usersSeed.map((user, index) => ({
      id: index + 1,
      ...user,
    }))
  );

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

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

    if (form.password.length < 8) {
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
    setForm(user);
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    setForm(emptyForm);
    setErrors({});
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingUser) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === editingUser.id
            ? {
                ...form,
                id: editingUser.id,
                age: Number(form.age),
              }
            : row
        )
      );
    } else {
      setRows((prevRows) => [
        ...prevRows,
        {
          ...form,
          id: prevRows.length ? Math.max(...prevRows.map((row) => row.id)) + 1 : 1,
          age: Number(form.age),
        },
      ]);
    }

    handleClose();
  };

  const handleToggleStatus = (user) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === user.id ? { ...row, isActive: !row.isActive } : row
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
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
      width: 190,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleOpenEdit(params.row)}
            sx={{
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: 11,
            }}
          >
            Edit
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => handleToggleStatus(params.row)}
            sx={{
              borderRadius: "999px",
              fontWeight: 800,
              fontSize: 11,
              bgcolor: params.row.isActive ? "#ef4444" : "#22c55e",
              "&:hover": {
                bgcolor: params.row.isActive ? "#dc2626" : "#16a34a",
              },
            }}
          >
            {params.row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
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
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ mb: 3 }}
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
          </Stack>

          <Box sx={{ height: 520, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              checkboxSelection
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

                "& .MuiCheckbox-root.Mui-checked": {
                  color: "#8b5cf6",
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
              helperText={errors.password}
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