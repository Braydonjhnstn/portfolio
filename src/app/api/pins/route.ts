import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const pinsFilePath = path.join(process.cwd(), 'public', 'pinboard', 'pins.json');

// GET - Fetch all pins
export async function GET() {
  try {
    const pinsData = fs.readFileSync(pinsFilePath, 'utf8');
    const pins = JSON.parse(pinsData);
    return NextResponse.json(pins);
  } catch (error) {
    console.error('Error reading pins:', error);
    return NextResponse.json([], { status: 200 });
  }
}

// POST - Add a new pin
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { lat, lng, name, message, color } = body;

    // Validate required fields
    if (lat === undefined || lng === undefined) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // Create new pin
    const newPin = {
      id: Date.now().toString(),
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      name: name || 'Anonymous',
      message: message || '',
      color: color || '#ff4757',
      timestamp: new Date().toISOString()
    };

    // Read existing pins
    let pins = [];
    try {
      const pinsData = fs.readFileSync(pinsFilePath, 'utf8');
      pins = JSON.parse(pinsData);
    } catch {
      // File doesn't exist or is empty, start with empty array
      pins = [];
    }

    // Add new pin
    pins.push(newPin);

    // Write back to file
    fs.writeFileSync(pinsFilePath, JSON.stringify(pins, null, 2));

    return NextResponse.json(newPin, { status: 201 });
  } catch (error) {
    console.error('Error adding pin:', error);
    return NextResponse.json(
      { error: 'Failed to add pin' },
      { status: 500 }
    );
  }
}
