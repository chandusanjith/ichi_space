import { NextResponse } from "next/server";

// Using a global cache for simple ephemeral storage across API route calls
const globalForWebhooks = global as unknown as { webhooks: Record<string, any[]> };
if (!globalForWebhooks.webhooks) {
  globalForWebhooks.webhooks = {};
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!globalForWebhooks.webhooks[id]) {
    globalForWebhooks.webhooks[id] = [];
  }

  try {
    const headers = Object.fromEntries(req.headers.entries());
    let body = null;
    
    // Try to parse JSON body
    const text = await req.text();
    try {
      body = JSON.parse(text);
    } catch {
      body = text; // fallback to raw text
    }

    const payload = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      method: req.method,
      headers,
      body,
      query: req.url.split('?')[1] || null
    };

    // Store up to 20 requests per ID
    globalForWebhooks.webhooks[id].unshift(payload);
    if (globalForWebhooks.webhooks[id].length > 20) {
      globalForWebhooks.webhooks[id].pop();
    }

    return NextResponse.json({ success: true, message: "Webhook received" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const searchParams = new URL(req.url).searchParams;
  if (searchParams.get("action") === "fetch") {
    // Return stored webhooks for UI
    return NextResponse.json(globalForWebhooks.webhooks[id] || []);
  }

  // Otherwise treat as a webhook hit
  if (!globalForWebhooks.webhooks[id]) {
    globalForWebhooks.webhooks[id] = [];
  }

  const payload = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    method: "GET",
    headers: Object.fromEntries(req.headers.entries()),
    body: null,
    query: req.url.split('?')[1] || null
  };

  globalForWebhooks.webhooks[id].unshift(payload);
  if (globalForWebhooks.webhooks[id].length > 20) {
    globalForWebhooks.webhooks[id].pop();
  }

  return NextResponse.json({ success: true, message: "Webhook GET received" });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  globalForWebhooks.webhooks[id] = [];
  return NextResponse.json({ success: true });
}
