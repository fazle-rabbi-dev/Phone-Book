import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FeatureCard from "@/components/FeatureCard"

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      let token = localStorage.getItem("user_data");
      router.push("/dashboard");
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div class="my-2 mx-4 md:mx-20">
      {isLoading ? (
        <div>
          <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
          {/*<h3 class="text-center">Redirecting ...</h3>*/}
        </div>
      ) : (
        <div class="">
          <div class="">
            <div className="mx-4 text-center">
              <h1 class="font-bold mb-2 text-4xl">
                Your Private Phone Book
              </h1>
              <p className="text-gray-600">
                Experience the future of secure contact management. We use your
                unique secret key to encrypt and protect your phone numbers,
                ensuring 100% privacy.
              </p>
            </div>

            <div class="my-6">
              {/*Signup & Signin Button*/}
              <div class="flex justify-center gap-4 items-center">
                <button
                  onClick={() => router.push("/signin")}
                  class="inline-flex items-center rounded-full bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                >
                  Sign in
                </button>
                <button
                  onClick={() => router.push("/signup")}
                  class="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-base font-semibold leading-7 text-black hover:bg-gray-200 border-[1px] border-gray-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {cardData.map(data => <FeatureCard data={data} />)}
        </div>
      )}
    </div>
  );
};

export default Home;

const cardData = [
  {
    emoji: "💡",
    title: "Contact Management",
    details:
      "You can easily manage your contacts, including adding, editing, and deleting contact.",
  },
  {
    emoji: "🔎",
    title: "Search",
    details:
      "You will be able to search for contacts by name.A search bar is available on the user dashboard.",
  },
  {
    emoji: "🔐",
    title: "Forgot Password",
    details:
      "If you forget your password, you will be able to easily reset it. A Forgot Password button available in sign in page, which takes you to the password reset page.",
  },
  {
    emoji: "🛠️",
    title: "Data Encryption",
    details:
      "Phone-Book encrypts all contact data before storing it in the database. This means that the data is converted into a code that is unreadable without the secret key.",
  },
];
