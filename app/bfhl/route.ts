import connectMongoDB from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(req:any) {
  try {
    const { data } = await req.json();
    
    if (!Array.isArray(data)) {
      return NextResponse.json({ message: "Invalid data format", is_success: false }, { status: 400 });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

    // Find the highest alphabet (case insensitive)
    const highestAlphabet = alphabets.reduce((max, curr) => {
      return curr.toUpperCase() > max.toUpperCase() ? curr : max;
    }, "");

    // Format the result
    return NextResponse.json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_alphabet: [highestAlphabet]
    }, { status: 200 });
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