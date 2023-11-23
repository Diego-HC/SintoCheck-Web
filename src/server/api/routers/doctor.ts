import { createTRPCRouter, publicProcedure } from "sintocheck/server/api/trpc";

import { z } from "zod";
import bcrypt from "bcryptjs";

function generateCode() {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let retVal = "";
  for (let i = 0, n = charset.length; i < 6; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n)).toUpperCase();
  }
  return retVal;
}

export const doctorRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ phone: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log("login", input);
      const doctor = await ctx.db.doctor.findFirst({
        where: {
          phone: input.phone,
        },
      });

      console.log("doctor", doctor);
      if (!doctor) {
        throw new Error("Invalid email or password");
      }

      const valid = await bcrypt.compare(input.password, doctor.password);

      if (!valid) {
        console.log("invalid password");
        throw new Error("Invalid email or password");
      }

      return doctor;
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        phone: z.string().length(10),
        password: z.string().min(8),
        speciality: z.string().optional(),
        address: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // verify password contains at least 1 number and 1 special character
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(input.password)) {
        throw new Error(
          "Password must contain at least 1 number and 1 special character",
        );
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);
      let foundDoctor = true;

      let cont = 0;
      let code = "";
      while (foundDoctor && cont < 5) {
        code = generateCode();
        const doctor = await ctx.db.doctor.findFirst({
          where: {
            code: code,
          },
        });
        if (doctor === null) {
          foundDoctor = false;
        }
        //contador para no hacer esta funcion muchas veces
        cont++;
      }
      //creamos al nuevo doctor y lo retornamos.
      const doctor = await ctx.db.doctor.create({
        data: {
          name: input.name,
          phone: input.phone,
          password: hashedPassword,
          code,
          speciality: input.speciality,
          address: input.address,
        },
      });

      return doctor;
    }),

  getSharedData: publicProcedure
    .input(z.object({ doctorId: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!input.doctorId) {
        return [];
      }

      const data = await ctx.db.patient.findMany({
        where: {
          doctorIds: {
            hasSome: [input.doctorId],
          },
        },
        select: {
          name: true,
          phone: true,
          medicalBackground: true,
          medicine: true,
          healthData: {
            select: {
              name: true,
              healthDataRecord: {
                select: {
                  value: true,
                  note: true,
                  createdAt: true,
                },
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
          },
        },
      });

      return data;
    }),
});
