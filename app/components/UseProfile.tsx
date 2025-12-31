import { UserProfile } from "@/types/user";
import { useState, useEffect } from "react";

type UserProfileResult = {
  data: UserProfile | null;
  loading: boolean;
};

export const useProfile = (): UserProfileResult => {
  const [data, setData] = useState<UserProfile | null>(null);
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
