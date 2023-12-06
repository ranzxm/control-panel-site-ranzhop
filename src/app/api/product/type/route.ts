import { productTypeSchema } from "@/app/panel/product/data/schema";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.typeProduct.findMany();

    return NextResponse.json(
      {
        data: res,
        ok: true,
        message: 'All data "Type Product" collected',
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name } = productTypeSchema.parse(body);

    const existingId = await db.typeProduct.findUnique({
      where: {
        id,
      },
    });
    if (existingId) {
      return NextResponse.json(
        {
          ok: false,
          message: "product type with this id is already on database",
        },
        { status: 409 }
      );
    }

    const res = await db.typeProduct.create({
      data: {
        id,
        name,
        label: name.toLowerCase(),
        value: name,
      },
    });
    return NextResponse.json(
      {
        ok: true,
        message: "product type has been created!",
        data: res,
      },
      { status: 201 }
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
  try {
    const body = await req.json();
    const typeProduct = await db.typeProduct.findUnique({
      where: { id: body.id },
    });
    if (!typeProduct) {
      return NextResponse.json(
        {
          ok: false,
          message: `Type Product with ID '${body.id}' isn't avaiable on database`,
        },
        { status: 404 }
      );
    }
    const res = await db.typeProduct.deleteMany({
      where: {
        id: typeProduct?.id,
      },
    });
    return NextResponse.json({
      ok: true,
      message: `type with id "${typeProduct?.id}" has been deleted!`,
      data: res,
    });
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
