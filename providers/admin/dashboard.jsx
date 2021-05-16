// my-dashboard-component.jsx
import { ApiClient } from "admin-bro";
import { Box, Badge } from "@admin-bro/design-system";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const api = new ApiClient();

const Dashboard = () => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    api.getDashboard().then((response) => {
      setModels(response.data.models);
    });
  }, []);

  return (
    <Box variant="grey">
      <Box variant="white">
        {models.map((model, index) => (
          <Link
            key={index}
            to={`/admin-bro/resources/${model}`}
            style={{ textDecoration: "none", margin: "3px" }}
          >
            <Badge variant="primary" size="lg">
              {model}
            </Badge>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
