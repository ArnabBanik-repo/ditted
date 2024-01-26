import { auth } from "@/auth";
import Profile from "@/components/profile";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      {
        session?.user ? <div>Signed In</div> : <div>Not Signed In</div>
      }
      <Profile />
    </div>
  );
}
