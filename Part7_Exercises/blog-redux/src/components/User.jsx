import { Container, Typography } from "@mui/material";

const User = ({ user }) => {
  if (!user) return null;
  return (
    <Container style={{ padding: "1rem" }}>
      <Typography variant="h4">{user.name}</Typography>
      <Container style={{ padding: "1rem" }}>
        <Typography variant="h6">Added blogs</Typography>
        <ul>
          {user.blogs ? (
            user.blogs.map((blog) => (
              <li key={blog.id}>
                <Typography variant="body1">{blog.title}</Typography>
              </li>
            ))
          ) : (
            <span>No blog added by ${user.name}</span>
          )}
        </ul>
      </Container>
    </Container>
  );
};

export default User;
