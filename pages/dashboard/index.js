/* These Code Is Not Well Organized! */

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
  const [saveNumber, setSaveNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState("");
  const [filteredContacts, setFilteredContacts] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactsLoading, setIsContactsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [contactId, setContactId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    function sortArrayOfObjectsByName(arr) {
      if (!arr) {
        return [];
      }
      arr.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      return arr;
    }

    const getContacts = async (token, secretkey) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/getcontacts`,
        {
          method: "POST",
          body: JSON.stringify({
            token,
            secretkey,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const response = await res.json();
      if (response.success) {
        // alert(JSON.stringify(response.contacts),null,3)
        const sortedContacts = sortArrayOfObjectsByName(response.contacts);
        setContacts(sortedContacts);
        setFilteredContacts(sortedContacts);
        setIsLoading(false);
        setIsContactsLoading(false);
      } else {
        const sortedContacts = sortArrayOfObjectsByName(response.contacts);
        setContacts(sortedContacts);
        setFilteredContacts(sortedContacts);
        setIsError(false);
        setIsContactsLoading(false);
      }
    };

    // Check user is logged in or not
    if (localStorage.getItem("user_data")) {
      let user_data = localStorage.getItem("user_data");
      user_data = JSON.parse(user_data);
      if (user_data.token && user_data.secretkey) {
        getContacts(user_data.token, user_data.secretkey);
        setisLoggedIn(true);
      } else {
        toast.error("Some data has been changed in your browser!");
        localStorage.clear();
      }
    } else {
      setisLoggedIn(false);
      setTimeout(function () {
        router.push("/signin");
      }, 1000);
      return;
    }

    // getContacts();
  }, [isLoading, isContactsLoading, deleteConfirm]);

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "number") {
      setNumber(e.target.value.toString());
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };

  const save_Number = async () => {
    if (!number) {
      toast.error(
        "Number is not valid.Please type only number without any symbol!"
      );
      return;
    }
    if (name.length > 3 && number) {
      if (!localStorage.getItem("user_data")) {
        toast.error("You are not logged in");
        return;
      }
      try {
        let user_data = localStorage.getItem("user_data");
        user_data = JSON.parse(user_data);
        if (!user_data.secretkey) {
          toast.error("Oops! something went wrong");
          return;
        }
        // setIsLoading(true);
        setIsSaving(true);
        setIsContactsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/savecontact`,
          {
            method: "POST",
            body: JSON.stringify({
              name,
              number,
              address,
              email,
              token: user_data.token,
              secretkey: user_data.secretkey,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        const response = await res.json();
        if (response.success) {
          setName("");
          setNumber("");
          setAddress("");
          setEmail("");
          toast.success(response.message);
          setIsLoading(false);
          setSaveNumber(false);
          setIsContactsLoading(false);
          setIsSaving(false);
        } else {
          toast.error(response.message);
          setIsLoading(false);
          setIsContactsLoading(false);
          setIsSaving(false);
        }
      } catch (e) {
        toast.error(e.message);
        setIsLoading(false);
        setIsContactsLoading(false);
        setIsSaving(false);
      }
    } else {
      toast.error("Form data is not valid!");
      setIsLoading(false);
      setIsContactsLoading(false);
      setIsSaving(false);
    }
  };

  const searchNumber = (e) => {
    let searchValue = e.target.value;
    setSearchText(searchValue);
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().startsWith(searchValue.toLowerCase())
    );
    if (filteredContacts.length == 0) {
      setFilteredContacts(filteredContacts);
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
      setFilteredContacts(filteredContacts);
    }
    // alert(JSON.stringify(filteredContacts,null,3))
  };

  const copyNumber = async (number) => {
    try {
      await window.navigator.clipboard.writeText(number);
      toast.success("Number (" + number.toString() + ") copied successful");
    } catch (e) {
      toast.error("Copy functionality is not supported in your browser!");
    }
  };

  const editContact = (id) => {
    setShouldUpdate(true);
    const [obj] = contacts.filter((cnt) => cnt.id == id);
    setName(obj.name);
    setNumber(obj.number);
    setAddress(obj.address);
    setEmail(obj.email);
    setSaveNumber(!saveNumber);
    setContactId(id);
    // Let's update
  };

  const updateContact = async () => {
    if (name.length < 3 || number.length < 7) {
      toast.error("Please enter valid name and phone number! ");
      return;
    }
    if (!localStorage.getItem("user_data")) {
      toast.error("Looks like your are not logged in!");
      localStorage.clear();
      router.push("/");
      return;
    }
    try {
      let user_data = localStorage.getItem("user_data");
      user_data = JSON.parse(user_data);
      // alert(user_data.token)
      setIsUpdating(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/update`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          number,
          address,
          email,
          token: user_data.token,
          contactId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await res.json();
      if (response.success) {
        setIsContactsLoading(true);
        setSaveNumber(!saveNumber);
        setShouldUpdate(false);
        toast.success(response.message);
        setIsUpdating(false);
      } else {
        toast.error(response.message);
        setIsUpdating(false);
      }
    } catch (e) {
      toast.error(e.message);
      setIsUpdating(false);
    }
  };

  const deleteContact = (id) => {
    setDeleteConfirm(true);
    setContactId(id);
  };

  const doDeleteContact = async () => {
    if (!localStorage.getItem("user_data")) {
      toast.error("Looks like your are not logged in!");
      localStorage.clear();
      router.push("/");
      return;
    }
    try {
      let user_data = localStorage.getItem("user_data");
      user_data = JSON.parse(user_data);
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/delete`, {
        method: "DELETE",
        body: JSON.stringify({
          token: user_data.token,
          id: contactId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const response = await res.json();
      if (response.success) {
        // toast.success(JSON.stringify(response.message,null,3))
        toast.success(response.message);
        setIsContactsLoading(true);
        setDeleteConfirm(!deleteConfirm);
      } else {
        // toast.error(JSON.stringify(response.message,null,3);
        toast.error("Looks like your are not logged in!");
        localStorage.clear();
        router.push("/");
        return;
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const logout = () => {
    if (localStorage.getItem("user_data")) {
      localStorage.clear();
      toast.success("Log out successful");
      router.push("/");
    }
  };

  return (
    <div className="">
      <ToastContainer />
      {isLoggedIn && !isLoading ? (
        <div className="">
          <div className="bg-gray-800 p-4">
            <div class="flex justify-between">
              <h2 className="text-2xl text-center text-white font-bold ">
                Phone-Book
              </h2>
              <div class="flex items-center space-x-2">
                <button class="text-3xl text-white">
                  <Link href="/myaccount">
                    {/*<Icon icon="mdi:user-circle" color="white" />*/}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-user"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Link>
                </button>
                <button
                  onClick={logout}
                  class="bg-white text-black rounded px-2 py-1 "
                >
                  Logout
                </button>
              </div>
            </div>
            <div class="relative">
              <p class="absolute top-[19px] left-2 text-xl">
                <Icon color="#999" icon="material-symbols:search" />
              </p>
              <input
                onChange={searchNumber}
                className="mt-2 px-2 pl-8 h-10 w-full border border-1 border-gray-300 rounded focus:outline-none text-md"
                type="text"
                name="search"
                id="search"
                value={searchText}
                placeholder="Search name"
              />
            </div>
            <button
              onClick={() => {
                setShouldUpdate(false);
                setName("");
                setNumber("");
                setAddress("");
                setEmail("");
                setSaveNumber(!saveNumber);
              }}
              className="w-full h-10 mt-3 border border-1 border-white px-3 py-1 rounded text-white"
            >
              Add New Contact
            </button>
          </div>
          {/*Form To Save Number*/}
          {saveNumber && (
            <div className="px-4 bg-gray-800 mb-5 rounded">
              <div class="relative">
                <p class="absolute left-1 top-2 text-2xl">
                  <Icon color="#555" icon="material-symbols:person" />
                </p>
                <input
                  onChange={handleChange}
                  className="px-2 pl-7 h-10 w-full border border-1 border-black rounded focus:outline-none"
                  type="text"
                  name="name"
                  id=""
                  value={name}
                  placeholder="Contact Name"
                />
              </div>
              <div class="relative">
                <p class="absolute left-1 top-4 text-2xl">
                  <Icon
                    icon="material-symbols:phone-enabled-sharp"
                    color="#555"
                  />
                </p>
                <input
                  onChange={handleChange}
                  className="mt-2 px-2 pl-7 h-10 w-full border border-1 border-black rounded focus:outline-none"
                  type="number"
                  name="number"
                  id=""
                  value={number}
                  placeholder="Contact Number"
                />
              </div>
              <div class="relative">
                <p class="absolute left-1 top-4 text-2xl">
                  <Icon icon="mdi:address-marker" color="#555" />
                </p>
                <input
                  onChange={handleChange}
                  className="mt-2 px-2 pl-7 h-10 w-full border border-1 border-black rounded focus:outline-none"
                  type="text"
                  name="address"
                  id=""
                  value={address}
                  placeholder="Contact Address"
                />
              </div>
              <div class="relative">
                <p class="absolute left-1 top-4 text-2xl">
                  <Icon
                    icon="material-symbols:mark-email-unread-rounded"
                    color="#555"
                  />
                </p>
                <input
                  onChange={handleChange}
                  className="mt-2 px-2 pl-7 h-10 w-full border border-1 border-black rounded focus:outline-none"
                  type="email"
                  name="email"
                  id=""
                  value={email}
                  placeholder="Contact Email"
                />
              </div>
              {shouldUpdate ? (
                <button
                  disabled={isUpdating}
                  onClick={updateContact}
                  className="relative w-full my-4 h-10 border border-1 border-white px-3 py-1 rounded text-white disabled:bg-gray-100 disabled:text-black"
                >
                  Update
                  <p class="absolute top-3 right-[120px]">
                    <Icon icon="mdi:content-save-move" color="#f8f8f8" />
                  </p>
                </button>
              ) : (
                <button
                  disabled={isSaving}
                  onClick={save_Number}
                  className="relative w-full my-4 h-10 border border-1 border-white px-3 py-1 rounded text-white disabled:bg-gray-100 disabled:text-black"
                >
                  Save
                  <p class="absolute top-3 right-[120px]">
                    <Icon icon="mdi:content-save-move" color="#f8f8f8" />
                  </p>
                </button>
              )}
            </div>
          )}
          {/*Cart To Display Number*/}
          <div className="mt-10 m-5 border border-2 border-gray-200 py-4 rounded h-[400px] overflow-y-auto">
            {/*Show Deletion Confirm*/}
            {deleteConfirm && (
              <div class="absolute bg-gray-900 opacity-[0.98] z-20 top-0 left-0 right-0 bottom-0 h-[100vh] w-full">
                <div class="top-0 left-4 right-4 absolute rounded-b bg-white opacity-[1] text-black p-3">
                  <h2 class="font-bold text-4xl">Alert!</h2>
                  <p class="mb-3">
                    Are you sure you want to delete this contact?
                  </p>
                  <button
                    onClick={doDeleteContact}
                    class="bg-red-600 text-white rounded px-2 py-1"
                  >
                    Im Sure
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(false)}
                    class="ml-2 bg-indigo-600 text-white rounded px-2 py-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {/*Show Number Not Found Message*/}
            {/*isNotFound && <p className="text-center text-red-500 text-sm font-bold my-3">Number not found!</p>*/}
            {isError && (
              <p className="text-center text-red-500 text-sm font-bold my-3">
                Oops!something went wrong
              </p>
            )}
            {!isContactsLoading &&
              !isLoading &&
              filteredContacts.length == 0 && (
                <p className="text-center text-red-500 text-sm font-bold my-3">
                  No contact found!
                </p>
              )}
            {isContactsLoading && (
              <img
                className="h-10 w-10 mx-auto my-3"
                src="/loading2.gif"
                alt=""
              />
            )}
            {filteredContacts && filteredContacts.length > 0
              ? filteredContacts.map((contact) => {
                  return (
                    !isContactsLoading && (
                      <div className="relative m-4 bg-gray-800 text-white px-3 py-2 rounded">
                        {/*<span className="text-black absolute right-2 top-2 bg-slate-100 text-black px-2 rounded text-sm" onClick={()=>copyNumber(contact.number)}>Copy</span>*/}
                        {/*<p class="absolute left-2 top-2 text-2xl"><Icon icon="ic:baseline-perm-contact-calendar" /></p>*/}
                        <div class="flex justify-center items-center">
                          {/*<span class="text-2xl bg-white p-1 rounded-t-full rounded-b-full"><Icon color="black" icon="material-symbols:contacts" /></span>*/}
                        </div>
                        <div className="my-3">
                          <h2 className="text-2xl font-bold">
                            {contact.name.slice(0, 1).toUpperCase()}
                            {contact.name.slice(1, contact.name.length)}
                          </h2>
                          <div class="mt-2 mb-4">
                            <p className="font-light flex items-center space-x-1">
                              <Icon icon="mdi:telephone" color="white" />{" "}
                              <span>{contact.number}</span>
                            </p>
                            <p className="font-light flex items-center space-x-1">
                              <Icon icon="mdi:email" color="white" />{" "}
                              <span>
                                {contact.email ? contact.email : "Not found!"}
                              </span>
                            </p>
                            <p className="font-light flex items-center space-x-1">
                              <Icon icon="ic:baseline-home" color="white" />{" "}
                              <span>
                                {contact.address
                                  ? contact.address
                                  : "Not found!"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div class="my-2 flex justify-evenly">
                          <p class="text-md">
                            <Icon
                              onClick={() => copyNumber(contact.number)}
                              icon="material-symbols:content-copy-outline-rounded"
                            />
                          </p>
                          <p class="text-md">
                            <Icon
                              onClick={() => editContact(contact.id)}
                              icon="material-symbols:edit-square-outline-rounded"
                            />
                          </p>
                          <p class="text-md">
                            <Icon
                              onClick={() => deleteContact(contact.id)}
                              icon="material-symbols:delete-outline-rounded"
                            />
                          </p>
                          <Link class="text-md" href={`tel:${contact.number}`}>
                            <Icon icon="material-symbols:add-call-sharp" />
                          </Link>
                        </div>
                      </div>
                    )
                  );
                })
              : isLoading &&
                !isNotFound &&
                !isError && (
                  <img
                    className="h-10 w-10 mx-auto my-3"
                    src="/loading2.gif"
                    alt=""
                  />
                )}
          </div>
          <Link
            class="text-sm underline text-center block"
            href="https://t.me/fhrabbi"
          >
            Report a problem
          </Link>
        </div>
      ) : (
        <img className="h-10 w-10 mx-auto my-3" src="/loading2.gif" alt="" />
      )}
    </div>
  );
};

export default Home;
