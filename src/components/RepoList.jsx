import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?page=${page}&per_page=5`
        );
        const sortedRepos = response.data.sort((a, b) => b.size - a.size);
        setRepos(sortedRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username, page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h2>Top 5 repositorios con más participación de {username}</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - Tamaño: {repo.size}
          </li>
        ))}
      </ul>
      <div>
        <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
          Anterior
        </Button>
        <Button variant="contained" color="secondary" onClick={handleNextPage}>Siguiente</Button>
      </div>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
