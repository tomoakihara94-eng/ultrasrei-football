import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { imageData, teamName } = await req.json() as {
    imageData: string;
    teamName?: string;
  };

  if (!imageData?.startsWith('data:image/png;base64,')) {
    return NextResponse.json({ error: 'invalid image data' }, { status: 400 });
  }

  const base64 = imageData.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const filename = `${id}.png`;

  const { error } = await supabase.storage
    .from('share-images')
    .upload(filename, buffer, { contentType: 'image/png', upsert: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabase.storage
    .from('share-images')
    .getPublicUrl(filename);

  return NextResponse.json({ shareId: id, imageUrl: publicUrl, teamName: teamName ?? '' });
}
