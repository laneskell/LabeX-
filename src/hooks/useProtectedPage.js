import { useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

export const useProtectedPage = () => {
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      history.push("/login");
    }
  }, [history]);
};

// Não solicitar senha se ja estiver logado

export const useProtectedLog = () => {
  const history = useHistory();

  useLayoutEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      history.push("/login");
    } else {
      history.push("/admin/trips/list");
    }
  }, [history]);
};
