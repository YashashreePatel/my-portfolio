import { NextResponse } from 'next/server';

const STAR_KEY = 'yp-portfolio-stars';

const getKvConfig = () => {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  return url && token ? { url, token } : null;
};

const kvRequest = async <T,>(command: string, key: string) => {
  const config = getKvConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(`${config.url}/${command}/${encodeURIComponent(key)}`, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`KV ${command} failed`);
  }

  const data = await response.json() as { result: T };
  return data.result;
};

const getStarCount = async () => {
  const count = await kvRequest<string | number | null>('get', STAR_KEY);
  return Number(count || 0);
};

export async function GET() {
  try {
    const count = await getStarCount();

    return NextResponse.json({
      count,
      configured: Boolean(getKvConfig()),
    });
  } catch {
    return NextResponse.json({ count: 0, configured: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { action?: 'star' | 'unstar' };

    if (body.action === 'unstar') {
      const currentCount = await getStarCount();

      if (currentCount <= 0) {
        return NextResponse.json({
          count: 0,
          configured: Boolean(getKvConfig()),
        });
      }
    }

    const command = body.action === 'unstar' ? 'decr' : 'incr';
    const updatedCount = await kvRequest<number>(command, STAR_KEY);

    if (updatedCount === null) {
      return NextResponse.json(
        { count: 0, configured: false },
        { status: 503 },
      );
    }

    return NextResponse.json({
      count: Math.max(0, Number(updatedCount)),
      configured: true,
    });
  } catch {
    return NextResponse.json({ count: 0, configured: false }, { status: 500 });
  }
}
