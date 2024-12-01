import API from '@/api';
import { NextResponse } from 'next/server';

const api = new API();

export async function GET() {
  try {
    const response = await api.GET('/vacancies');

    if (response.status) {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching vacancies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vacancies' },
      { status: 500 },
    );
  }
}

export async function GET_DETAIL(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const response = await api.GET(`/vacancies/${id}`);

    if (response.status) {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error fetching vacancy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vacancy' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const response = await api.POST('/vacancies', data);

    if (response.status) {
      return NextResponse.json(response.data, { status: 201 });
    } else {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating vacancy:', error);
    return NextResponse.json(
      { error: 'Failed to create vacancy' },
      { status: 500 },
    );
  }
}
