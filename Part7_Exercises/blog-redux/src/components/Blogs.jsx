import { useSelector } from "react-redux";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs);

  const sortedBlogs = [...blogs].sort((a, b) => (a.likes < b.likes ? 1 : -1));

  return (
    <Container style={{ padding: "1rem" }}>
      <div style={{ padding: "1rem" }}>
        <BlogForm />
      </div>
      <Grid2 container spacing={12}>
        {sortedBlogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none" }}>
            <Box sx={{ width: 275 }}>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {blog.author}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Link>
        ))}
      </Grid2>
      {/* <TableContainer component={Paper} style={{ padding: "1rem" }}>
        <Typography variant="h3">Blogs</Typography>
        <Table>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Container>
  );
};

export default Blogs;
