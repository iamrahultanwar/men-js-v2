// my-dashboard-component.jsx
import { ApiClient } from "admin-bro";
import { Box } from "@admin-bro/design-system";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const api = new ApiClient();

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    api.getDashboard().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Box variant="grey">
      <Box variant="white">some: {data.some}</Box>
    </Box>
  );
};

export default Dashboard;
