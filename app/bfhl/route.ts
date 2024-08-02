import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

// POST handler
export async function POST(req:any) {
  await connectMongoDB();
  const { full_name, dob, usermail, collegeEmailID, collegeRollNumber, numbersArray, alphabetsArray } = await req.json();

  if (!full_name || !dob || !usermail || !collegeEmailID || !collegeRollNumber || !numbersArray || !alphabetsArray) {
    return NextResponse.json({ message: "Fill all the details", is_success: false }, { status: 422 });
  }

  try {
    const preuser = await User.findOne({ usermail: usermail });
    if (preuser) {
      return NextResponse.json({ message: "This email already exists", is_success: false }, { status: 422 });
    } else {
      const newUser = new User({
        full_name, 
        dob,
        usermail, 
        collegeEmailID,
        collegeRollNumber,
        numbersArray,
        alphabetsArray
      });

      const storeData = await newUser.save();
      return NextResponse.json({
        status: "User successfully added",
        is_success: true,
        user_id: storeData.user_id,
        collegeEmailID: storeData.collegeEmailID,
        collegeRollNumber: storeData.collegeRollNumber,
        numbersArray: storeData.numbersArray,
        alphabetsArray: storeData.alphabetsArray
      }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ message: (error as Error).message, is_success: false }, { status: 500 });
  }
}


export async function GET(req:any) {
    
    try {
      // Return hardcoded response
      return NextResponse.json({
        operation_code: 1
      }, { status: 200 });
    } catch (error) {
      // Handle unexpected errors
      return NextResponse.json({ message: (error as Error).message, is_success: false }, { status: 500 });
    }
  }