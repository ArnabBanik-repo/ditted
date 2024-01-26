import { Button, Input, divider } from "@nextui-org/react";
import * as actions from '@/app/actions'

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Ditted</h1>
      <div className="flex gap-4 items-center justify-end">
        <form action={actions.signIn}>
          <Button type="submit" className="bg-gray-300 text-black">
            Sign in with Github
          </Button>
        </form>
        <form action={actions.signOut}>
          <Button type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}

