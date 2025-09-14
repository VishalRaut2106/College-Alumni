import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, year, branch, role } = body

    if (!name || !email || !password) {
      return new NextResponse("Missing name, email, or password", { status: 400 })
    }

    const exist = await prisma.user.findUnique({
      where: { email },
    })

    if (exist) {
      return new NextResponse("User already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        year,
        branch,
        role,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("SIGNUP_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
