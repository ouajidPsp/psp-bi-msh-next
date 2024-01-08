"use client";
import Button from "@/components/Button";
import React, { useRef } from "react";
import { useStateContext } from "@/Contexts/ThemeContext";
import Image from "next/image";
import getPatient from "../../../../../../server/patient/get_patient";
import { useFormik } from "formik";
import updatePatient from "../../../../../../server/patient/update_patient";
import toast from "react-hot-toast";
import { ProgramEnum } from "@prisma/client";
import { useRouter } from "next/navigation";

const PatientProfile = ({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof getPatient>>>;
}) => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { currentColor } = useStateContext();
  const formik = useFormik({
    initialValues: {
      ...data,
      image: null as never as File,
      birthDate: data.birthDate?.toISOString().slice(0, 10),
    },
    onSubmit: async (values) => {
      const formadata = new FormData();

      formadata.append("firstName", values.firstName);
      formadata.append("lastName", values.lastName);
      formadata.append("birthDate", values.birthDate?.toString() ?? "");
      formadata.append("address", values.address ?? "");
      formadata.append("notes", values.notes ?? "");
      formadata.append("program", values.program ?? "");
      formadata.append("id", values.id ?? "");
      formadata.append("image", values.image);

      const res = await updatePatient(formadata);
      if (res == false) toast.error("Erreur ! ");
      else {
        router.refresh();
        toast.success("Informations mises à jour !");
      }
    },
  });
  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full"
          >
            Profil
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
          >
            Paramètres
          </a>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full"
          >
            Notifications
          </a>
        </div>
      </aside>
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Public Profile
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <Image
                    key={data.image?.url}
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={
                      data.image?.url
                        ? "/" + data.image?.url
                        : "/doctordash.png"
                    }
                    alt="Bordered avatar"
                    width={500}
                    height={500}
                  />
                  <input
                    type="file"
                    ref={ref}
                    hidden
                    onChange={(e) =>
                      formik.setFieldValue("image", e.target.files?.item(0))
                    }
                  />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <Button
                      onClick={(e) => ref.current?.click()}
                      color="white"
                      bgColor={currentColor}
                      text="Changer Photo"
                      borderRadius="10px"
                      width="full"
                    />
                    <Button
                      color="white"
                      bgColor="red"
                      text="Supprimer Photo"
                      borderRadius="10px"
                      width="full"
                    />
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Prénom
                      </label>
                      <input
                        type="text"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your first name"
                        onChange={formik.handleChange}
                        name="firstName"
                        value={formik.values.firstName}
                        disabled={formik.isSubmitting}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Nom
                      </label>
                      <input
                        type="text"
                        defaultValue={data.lastName}
                        id="last_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your last name"
                        onChange={formik.handleChange}
                        name="lastName"
                        value={formik.values.lastName}
                        disabled={formik.isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Adresse
                    </label>
                    <input
                      type="text"
                      id="profession"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      onChange={formik.handleChange}
                      name="address"
                      value={formik.values.address ?? ""}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Date de naissance
                    </label>
                    <input
                      type="date"
                      id="profession"
                      defaultValue=""
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      onChange={formik.handleChange}
                      name="birthDate"
                      value={formik.values.birthDate}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Programme
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        onChange={formik.handleChange}
                        name="program"
                        value={formik.values.program ?? ProgramEnum.PSP}
                        disabled={formik.isSubmitting}
                      >
                        {Object.values(ProgramEnum).map((e) => (
                          <option value={e}>{e}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Notes
                    </label>
                    <textarea
                      id="message"
                      defaultValue={data.notes ?? ""}
                      rows={4}
                      className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                      onChange={formik.handleChange}
                      name="notes"
                      value={formik.values.notes ?? ""}
                      disabled={formik.isSubmitting}
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      color="white"
                      bgColor={currentColor}
                      text="Sauvegarder"
                      borderRadius="10px"
                      disabled={formik.isSubmitting}
                      width="full"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientProfile;
