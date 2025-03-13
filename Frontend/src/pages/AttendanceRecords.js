import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceRecords } from "../redux/slices/attendanceSlice";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";

const AttendanceRecords = () => {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.records);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchAttendanceRecords({ startDate: "", endDate: "" }));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchAttendanceRecords({ startDate, endDate }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRecords = records.filter((record) =>
    record.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        ATTENDANCE RECORDS
      </Typography>

      {/* Date Range & Search Field in One Row */}
      <Box display="flex" gap={2} mb={2} alignItems="center">
        <TextField
          label="From"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="To"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Filter
        </Button>

        {/* Push Search Field to Extreme Right */}
        <Box flexGrow={1} />

        <TextField
          label="Search User"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Photo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRecords
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((record, index) => (
                    <TableRow key={record._id}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{record.user.name}</TableCell>
                      <TableCell>
                        {new Date(record.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Avatar
                          src={record.user.imageUrl}
                          alt={record.user.name}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredRecords.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default AttendanceRecords;
