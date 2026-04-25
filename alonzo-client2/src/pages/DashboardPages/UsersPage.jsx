import { Box, Card, CardContent, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    firstName: "Kyle",
    lastName: "Alonzo",
    course: "BSIT",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Lmao",
    lastName: "Dela Cruz",
    course: "BSCS",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Patrick",
    lastName: "Jane",
    course: "BSIT",
    status: "Pending",
  },
  {
    id: 4,
    firstName: "Red",
    lastName: "John",
    course: "BSIS",
    status: "Active",
  },
  {
    id: 5,
    firstName: "Ralph",
    lastName: "Wreckit",
    course: "BSIT",
    status: "Inactive",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "course", headerName: "Course", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];

function UsersPage() {
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
          <Box sx={{ height: 520, width: "100%" }}>
            <DataGrid
              rows={rows}
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
    </Box>
  );
}

export default UsersPage;
