"use client";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  async function signIn() {
    const { data: _data, error: _error } = await authClient.signIn.magicLink({
      email: "test@example.com", // required
      name: "my-name",
      callbackURL: "/dashboard",
      newUserCallbackURL: "/welcome",
      errorCallbackURL: "/error",
      metadata: { inviteId: "123" },
    });
  }
  async function linkDiscord() {
    await authClient.linkSocial({
      provider: "discord",
    });
  }
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch: _refetch, //refetch the session
  } = authClient.useSession();

  if (isPending) return <h1>loading..</h1>;
  if (error) return <h1>error</h1>;

  return (
    <>
      <h1>{JSON.stringify(session?.user)}</h1>
      <button type="button" className="border" onClick={signIn}>
        signin
      </button>
      <button type="button" className="border" onClick={linkDiscord}>
        link discord
      </button>
    </>
  );
}
