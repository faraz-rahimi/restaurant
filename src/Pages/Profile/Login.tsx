import { Link, useNavigate } from "react-router-dom";
import api from "../../API/users.ts";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.get("/");
      const allUsers = response.data;

      const ValidUser = allUsers.find(
        (u: { id: string; username: string; password: string }) =>
          u.username === username && u.password === password,
      );

      if (ValidUser) {
        localStorage.setItem("userId", ValidUser.id);
        toast.success(t("Login.success"));
        navigate("/");
      } else {
        toast.error(t("Login.error"));
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(t("Login.failedMsg"));
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-orange-500/30 bg-zinc-950 p-8 shadow-2xl shadow-orange-950/30 sm:p-10">
          <h1 className="mb-8 text-center text-3xl font-bold tracking-tight text-orange-500">
            {t("Login.title")}
          </h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <label
              className="block text-sm font-medium text-zinc-200"
              htmlFor="username"
            >
              {t("Login.username")}
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              required
            />
            <label
              className="block text-sm font-medium text-zinc-200"
              htmlFor="password"
            >
              {t("Login.password")}
            </label>
            <input
              className="mt-2 w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
            <button
              className="w-full rounded-lg bg-orange-500 px-4 py-3 font-semibold text-black transition hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
              type="submit"
            >
              {t("Login.title")}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-zinc-400">
            <span className="me-2">{t("Login.sentence")}</span>
            <Link
              className="font-medium text-orange-500 underline-offset-4 hover:text-orange-400 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              to="/signUp"
            >
              {t("Login.submit")}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
