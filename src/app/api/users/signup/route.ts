import { NextRequest, NextResponse } from "next/server";
import { connect } from "~/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import User from "~/models/userModel";
import { sendEmail } from "~/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // check if user exists
    const user = await User.findOne({ email });

    if (user)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    const savedUser = await newUser.save();

    await sendEmail(email);

    return NextResponse.json(
      {
        message: "OTP has been sent to your regisitered email address",
        success: true,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
