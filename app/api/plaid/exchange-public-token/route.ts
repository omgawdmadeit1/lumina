import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

/**
 * Exchange the public_token returned by Plaid Link for an access_token + item_id.
 * 
 * IMPORTANT: Store access_token and item_id securely on the SERVER SIDE (DB, encrypted).
 * NEVER return the access_token to the client.
 * 
 * In this prototype we just acknowledge success and return the item_id.
 * In production you would associate this with the current user and use the access_token
 * to call /transactions/get, /accounts/get, etc.
 */
const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments[(process.env.PLAID_ENV as keyof typeof PlaidEnvironments) || 'sandbox'],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '',
        'PLAID-SECRET': process.env.PLAID_SECRET || '',
      },
    },
  })
);

export async function POST(request: Request) {
  try {
    if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
      return NextResponse.json(
        { error: 'Plaid credentials not configured' },
        { status: 500 }
      );
    }

    const { public_token } = await request.json();

    if (!public_token) {
      return NextResponse.json({ error: 'Missing public_token' }, { status: 400 });
    }

    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // TODO: Persist accessToken + itemId for this user in your database
    // e.g. await db.plaidItems.create({ userId: currentUser.id, accessToken, itemId });

    console.log(`[Plaid] Exchanged public_token. item_id=${itemId} (access_token stored server-side only)`);

    // Only return non-sensitive data to the client
    return NextResponse.json({
      success: true,
      item_id: itemId,
      // In a real app you might also return accounts summary here by calling accountsGet
    });
  } catch (error: any) {
    console.error('Plaid exchange error:', error.response?.data || error);
    return NextResponse.json(
      { error: 'Failed to exchange public token' },
      { status: 500 }
    );
  }
}
