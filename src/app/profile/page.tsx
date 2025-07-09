import { auth } from "@/auth";
import { getMyProfile } from "@/lib/actions/user-action";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NextImage from "next/image";
import { EditForm } from "./component";
import { UserSchema } from "@/lib/zod";

const Profile = async () => {
  const session = await auth();
  const user = await getMyProfile(session?.user?.email);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md rounded-2xl shadow-lg ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Profile Not Found</CardTitle>
            <CardDescription className="text-sm mt-2">
              User profile not found. Please log in or create an account.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const zodUser: UserSchema = {
    email: user.email ?? "",
    name: user.name ?? "",
    password: user.password ?? undefined,
    image: user.image ?? undefined,
    emailVerified: user.emailVerified ?? undefined,
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-lg ">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="flex text-2xl font-semibold ">
              <NextImage
                src={
                  user?.image ??
                  `https://ui-avatars.com/api/?name=${
                    user?.name ?? user?.email![0]
                  }`
                }
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer mr-2"
                width={32}
                height={32}
              />
              Profile
            </CardTitle>
            {user && <EditForm user={zodUser} />}
          </div>
          <CardDescription className="text-sm  mt-2">
            {user?.email ?? "Email not available"}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4 space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm ">Name</label>
            <p className="text-lg font-medium ">
              {user?.name ?? "No name available"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
