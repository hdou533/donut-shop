import { useState, useEffect } from "react";
import { UserProfile } from "../types/user";

export const useProfile = (): UserProfile => {
  const [data, setData] = useState<UserProfile["data"]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((res) => {
      res.json().then((data) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);

  return { loading, data };
};
