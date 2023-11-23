import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { api } from "sintocheck/utils/api";
import { useEffect, useState } from "react";
import { type Doctor } from "@prisma/client";
import Layout from "sintocheck/components/layout";

const Dashboard: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<Doctor | null>(null);
  const [csvs, setCsvs] = useState<string[]>();
  const [showRawData, setShowRawData] = useState(false);

  const { mutateAsync: login } = api.doctor.login.useMutation();
  const { data } = api.doctor.getSharedData.useQuery({
    doctorId: user?.id ?? "",
  });

  useEffect(() => {
    if (!data) return;
    const csvs = data.map((d) => {
      const csv = [
        "name,phone,medical_background,medicine,healthData,value,note,timestamp",
        ...d.healthData.map((h) =>
          [
            ...h.healthDataRecord.map((hdr) =>
              [
                d.name,
                d.phone,
                d.medicalBackground,
                d.medicine,
                h.name,
                hdr.value,
                hdr.note,
                hdr.createdAt,
              ].join(","),
            ),
          ].join("\n"),
        ),
      ].join("\n");
      return URL.createObjectURL(new Blob([csv], { type: "text/csv;" }));
    });

    console.log(csvs);
    setCsvs(csvs);
  }, [data]);

  const handleLogin = async (values: { phone: string; password: string }) => {
    console.log("Logging in...", values);
    const result = await login(values).catch((err) => {
      console.log(err);
      return;
    });

    if (!result) {
      console.log("Login failed!");
      return;
    }

    setLoggedIn(true);
    setUser(result);
    console.log("Logged in!", user);
  };

  if (loggedIn && user) {
    return (
      <Layout>
        <h1 className="mt-5 text-2xl">Hola, {user.name}!</h1>
        <h2 className="m-3 text-xl">Tu código de doctor es {user.code}</h2>

        {data?.length ? (
          <div className="w-1/3">
            <h2 className="m-2 text-xl">Información de tus pacientes:</h2>
            {data.map((d, i) => (
              <div className="rounded-xl p-3 even:bg-white" key={d.phone}>
                <h4 className="font-bold">{d.name}</h4>
                <p>{d.phone}</p>
                {d.medicalBackground && (
                  <p>
                    - Historial medico: <br /> {d.medicalBackground}
                  </p>
                )}
                {d.medicine && (
                  <p>
                    - Medicamentos: <br /> {d.medicine}
                  </p>
                )}
                <br />
                {d.healthData.length ? (
                  <>
                    <h5 className="font-bold">Datos de salud:</h5>
                    <a
                      className="text-blue-500 underline"
                      href={csvs![i]}
                      download={`${d.name}_data`}
                    >
                      Descargar archivo csv
                    </a>
                  </>
                ) : (
                  <p>No hay datos de salud registrados.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="m-2">No tienes pacientes registrados.</p>
        )}

        <button
          className="rounded bg-blue-500 px-4 py-2 my-10 font-bold text-white hover:bg-blue-700"
          onClick={() => setShowRawData(!showRawData)}
        >
          {showRawData ? "Hide" : "Show"} raw data
        </button>

        {showRawData && (
          <div className="mb-24">
            <h2>Raw data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="m-6 text-2xl">Login</h1>
      <Formik
        initialValues={{ phone: "", password: "" }}
        validationSchema={yup.object({
          phone: yup
            .string()
            .matches(
              /^\d{10}$/,
              "Phone number must be 10 digits (no dashes or spaces)",
            )
            .required("Required"),
          password: yup.string().required("Required"),
        })}
        onSubmit={handleLogin}
      >
        <Form className="flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center">
            <Field
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4 flex flex-col items-center">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Login
          </button>
        </Form>
      </Formik>
      <p className="m-5">
        Don't have an account?{" "}
        <Link className="text-blue-500 hover:underline" href="/register">
          Register
        </Link>
      </p>
    </Layout>
  );
};

export default Dashboard;
