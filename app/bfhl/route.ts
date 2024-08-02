import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';


// POST handler
export async function POST(req: any, res: any) {
  await connectMongoDB();
  const { userid, usermail, collegeEmailID, collegeRollNumber, numbersArray, alphabetsArray } = await req.json();

  if (!userid || !usermail || !collegeEmailID || !collegeRollNumber || !numbersArray || !alphabetsArray) {
    return NextResponse.json({ message: "Fill all the details" }, { status: 422 });
  }

  try {
    const preuser = await User.findOne({ usermail: usermail });
    if (preuser) {
      return NextResponse.json({ message: "This email already exists" }, { status: 422 });
    } else {
     

      const newUser = new User({
        userid, 
        usermail, 
        collegeEmailID,
        collegeRollNumber,
        numbersArray,
        alphabetsArray
      });

      const storeData = await newUser.save();
      return NextResponse.json({
        status: "User successfully added",
        userId: storeData._id,
        collegeEmailID: storeData.collegeEmailID,
        collegeRollNumber: storeData.collegeRollNumber,
        numbersArray: storeData.numbersArray,
        alphabetsArray: storeData.alphabetsArray
      }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}

// GET handler
export async function GET(req: any, res: any) {
  await connectMongoDB();

  try {
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
}
