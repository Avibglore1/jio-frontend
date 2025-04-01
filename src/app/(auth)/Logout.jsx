import axios from "axios";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {}, { withCredentials: true });
    localStorage.removeItem("token");
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
