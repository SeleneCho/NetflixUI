import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Field, Form, Formik } from "formik";
import type { NextPage } from "next";

const Auth: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectToHome = () => {
    const { pathname } = Router;
    if (pathname === "/login") {
      Router.push("/");
    }
  };

  const loginUser = async () => {
    const res: any = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`,
    });

    res.error ? console.log(res.error) : redirectToHome();
  };

  const formSubmit = (actions: any) => {
    actions.setSubmitting(false);

    loginUser();
  };

  const handleGithubLogin = async () => {
    const res: any = await signIn("github", {
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });
    if (res) {
      redirectToHome();
    }
  };

  const handleGoogleLogin = async () => {
    const res: any = await signIn("google", {
      redirect: false,
      callbackUrl: `${window.location.origin}`,
    });
    if (res) {
      redirectToHome();
    }
  };

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <div className="Flex">
        <Head>
          <title>Netflix</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image
          // next.conig.js 파일에 "rb.gy" 도메인 추가해 줘야 함
          src="https://rb.gy/p2hphi"
          alt=""
          layout="fill"
          className="-z-10 !hidden opacity-60 sm:!inline"
          objectFit="cover"
        />
        <Link href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
            width={150}
            height={150}
          />
        </Link>
        <div className="EntireForm relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
          <Formik
            initialValues={{}}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(_, actions) => {
              formSubmit(actions);
            }}
          >
            <Form className="">
              <h1 className="text-4xl font-semibold">Sign In</h1>
              <div className="space-y-4 my-4">
                <label className="inline-block w-full">
                  <Field name="email">
                    {() => (
                      <div className="FormControl">
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          className="input"
                        />
                      </div>
                    )}
                  </Field>
                </label>

                <label className="inline-block w-full">
                  <Field name="password">
                    {() => (
                      <div className="FormControl">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          className="input"
                        />
                      </div>
                    )}
                  </Field>
                </label>
              </div>

              <button
                className="w-full rounded bg-[#E50914] py-3 font-semibold"
                type="submit"
              >
                Sign In
              </button>
            </Form>
          </Formik>

          <p className="w-fit left-0 right-0 mx-auto">Or</p>

          <button
            className="w-full flex items-center justify-center gap-x-4 bg rounded bg-zinc-500 py-3 font-semibold"
            onClick={() => handleGithubLogin()}
          >
            <BsGithub className="h-7 w-7 " />
            <h2> Sign in with Github</h2>
          </button>
          <button
            className="w-full flex items-center justify-center gap-x-4 bg rounded bg-white text-black py-3 font-semibold"
            onClick={() => handleGoogleLogin()}
          >
            <FcGoogle className="h-7 w-7 " />
            <h2> Sign in with Google</h2>
          </button>
          <div className="text-[gray] flex flex-col items-center">
            Don't have an account?
            <button
              className="cursor-pointer text-white hover:underline"
              type="submit"
            >
              <a
                href="/signup"
                className="cursor-pointer text-white hover:underline"
              >
                Sign up now
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
