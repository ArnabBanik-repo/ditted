'use client'

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  return (
    <div>
      {session.data?.user ? <div>Signed In from client </div> : <div>Not signed in from client</div>}
    </div>
  )
}
