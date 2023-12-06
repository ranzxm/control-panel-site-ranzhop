import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcrypt";

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json({
    ok: true,
    message: "Ok",
    users,
  });
}

const userSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  email: z
    .string()
    .min(1, {
      message: "email is required",
    })
    .email(),
  password: z
    .string()
    .min(1, {
      message: "password is required",
    })
    .min(6, {
      message: "password minimum length is 6 character",
    }),
  confirmPassword: z
    .string()
    .min(1, {
      message: "password is required",
    })
    .min(6, {
      message: "password minimum length is 6 character",
    }),
  role: z.string().min(1, {
    message: "role is required",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword, role } = userSchema.parse(body);

    const latestUser = await db.user.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!latestUser) {
      return NextResponse.json(
        {
          ok: false,
          message: "Error server!",
        },
        { status: 500 }
      );
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          ok: false,
          message: "user with this email is already registered",
        },
        { status: 409 }
      );
    }

    const passwordMatch = password === confirmPassword;
    if (!passwordMatch) {
      return NextResponse.json(
        {
          ok: false,
          message: "password and confirmation password isn`t match",
        },
        { status: 409 }
      );
    }

    if (role !== "admin" && role !== "staff") {
      return NextResponse.json(
        {
          ok: false,
          message: "role is not recognized",
        },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);

    const res = await db.user.create({
      data: {
        id: latestUser.id + 1,
        name,
        email,
        password: passwordHash,
        role,
      },
    });

    const { password: newPassword, ...user } = res;

    return NextResponse.json(
      {
        data: { user },
        ok: true,
        message: "user successfully created!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "something went wrong",
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword, role } = userSchema.parse(body);

    const getUser = await db.user.findUnique({
      where: { id: body.id },
    });

    if (email !== getUser?.email) {
      const existingUser = await db.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return NextResponse.json(
          {
            ok: false,
            message: "user with thins email is already registered",
          },
          { status: 409 }
        );
      }
    }

    const passwordMatch = password === confirmPassword;
    if (!passwordMatch) {
      return NextResponse.json(
        {
          ok: false,
          message: "password and confirm password doesn`t match",
        },
        {
          status: 409,
        }
      );
    }

    const passwordHash = await hash(password, 12);

    if (role !== "admin" && role !== "staff") {
      return NextResponse.json(
        {
          ok: false,
          message: "role is not recognized",
        },
        { status: 409 }
      );
    }

    const res = await db.user.update({
      where: { id: body.id },
      data: {
        name,
        email,
        password: passwordHash,
        role,
      },
    });

    const { password: newPassword, ...user } = res;

    return NextResponse.json(
      {
        ok: true,
        message: `user with id ${body.id} has already updated!`,
        data: { user },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const id = body.id;
  try {
    const res = await db.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        ok: true,
        message: "user has been successfully deleted !",
        data: { user: res },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}
