import Link from "next/link";
import AISearch from "./ai-search";
import ThemSwitch from "./theme-switch";

import { auth, signOut } from "@/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Image } from "@imagekit/next";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bookmarks } from "./bookmarks";
import NextImage from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-16 flex items-center bg-background/70 backdrop-blur border-b">
      <Link href={"/"} className="ml-4 flex items-center gap-2">
        <NextImage
          src="/logo.png"
          alt="Carido Logo"
          className="h-10 w-auto dark:invert"
          width={40}
          height={40}
        />
        Carido
      </Link>

      <AISearch />

      <HeaderAuth />

      <ThemSwitch />
    </header>
  );
};

export default Header;

const logout = async () => {
  "use server";
  await signOut();
};

const HeaderAuth = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="flex items-center gap-4 mx-2">
      {user ? (
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center gap-2">
              <NextImage
                src={
                  user.image ??
                  `https://ui-avatars.com/api/?name=${user.name ?? user.email![0]}`
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                width={32}
                height={32}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full px-0  py-2">
            <p className="p-2 font-bold">My Profile</p>
            <Separator />

            <Bookmarks />
            <form action={logout}>
              <button
                className="flex w-full cursor-pointer hover:bg-muted items-center gap-1 p-1"
                type="submit"
              >
                <LogOutIcon className="h-4 w-4" />
                Logout
              </button>
            </form>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href="/api/auth/signin" className="btn btn-primary">
          <Button className="cursor-pointer">Login</Button>
        </Link>
      )}
    </div>
  );
};
