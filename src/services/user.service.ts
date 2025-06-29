import axios from "src/lib/axios";
import { User } from "src/types/user";

export async function getUserById(id: number): Promise<User> {
  const res = await axios.get(`/users/${id}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = res.data;
  return safeUser;
}
