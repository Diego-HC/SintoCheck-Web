import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { api } from "sintocheck/utils/api";
import * as yup from "yup";
import Layout from "sintocheck/components/layout";
import { useRouter } from "next/router";

interface RegisterData {
  name: string;
  phone: string;
  password: string;
  speciality?: string;
  address?: string;
}

const RegisterPage: React.FC = () => {
  const { mutateAsync: createDoctor } = api.doctor.create.useMutation();
  const router = useRouter();

  const handleSubmit = async (values: RegisterData) => {
    try {
      // Call the create doctor endpoint
      const response = await createDoctor(values);
      console.log(response);
      // redirect to login
      await router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1 className="m-6 text-2xl">Register</h1>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          password: "",
          speciality: "",
          address: "",
        }}
        validationSchema={yup.object({
          name: yup.string().required("Name is required"),
          phone: yup.string().required("Phone is required"),
          password: yup.string()
          .required('Please Enter your password')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
          speciality: yup.string(),
          address: yup.string(),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center">
            <Field
              className="w-full rounded-md border border-gray-300 p-2"
              type="text"
              id="name"
              placeholder="Name"
              name="name"
            />
            <ErrorMessage
              className="text-red-500"
              name="name"
              component="div"
            />
          </div>
          <div className="mb-4 flex flex-col items-center">
            <Field
              className="w-full rounded-md border border-gray-300 p-2"
              type="text"
              id="phone"
              placeholder="Phone"
              name="phone"
            />
            <ErrorMessage
              className="text-red-500"
              name="phone"
              component="div"
            />
          </div>
          <div className="mb-4 flex flex-col items-center">
            <Field
              className="w-full rounded-md border border-gray-300 p-2"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              className="text-red-500"
              name="password"
              component="div"
            />
          </div>
          <div className="mb-4 flex flex-col items-center">
            <Field
              className="w-full rounded-md border border-gray-300 p-2"
              type="text"
              id="speciality"
              placeholder="Speciality"
              name="speciality"
            />
            <ErrorMessage
              className="text-red-500"
              name="speciality"
              component="div"
            />
          </div>
          <div className="mb-4 flex flex-col items-center">
            <Field
              className="w-full rounded-md border border-gray-300 p-2"
              type="text"
              id="address"
              placeholder="Address"
              name="address"
            />
            <ErrorMessage
              className="text-red-500"
              name="address"
              component="div"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Register
          </button>
        </Form>
      </Formik>
    </Layout>
  );
};

export default RegisterPage;
