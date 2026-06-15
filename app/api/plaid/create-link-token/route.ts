import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';

/**
 * Real Plaid Link token creation endpoint.
 * Call this from the frontend instead of (or in addition to) the simulated modal flow.
 *
 * Required env vars (add to .env.local):
 *   PLAID_CLIENT_ID=your_client_id
 *   PLAID_SECRET=your_secret
 *   PLAID_ENV=sandbox  (or development / production)
 *
 * In production you would also pass a real user id (from your auth system)
 * and persist the resulting link_token usage.
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

export async function POST() {
  try {
    if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
      return NextResponse.json(
        { error: 'Plaid credentials not configured. Set PLAID_CLIENT_ID and PLAID_SECRET in .env.local' },
        { status: 500 }
      );
    }

    const request = {
      user: {
        // In a real app, use a stable ID for the logged-in user (e.g. from Supabase/Auth)
        client_user_id: 'lumina-user-' + Date.now(),
      },
      client_name: 'Lumina',
      products: [Products.Transactions, Products.Auth], // Adjust based on what cashflow features you need
      country_codes: [CountryCode.Us],
      language: 'en',
      // redirect_uri: process.env.PLAID_REDIRECT_URI, // only needed for OAuth institutions in production
    };

    const response = await plaidClient.linkTokenCreate(request);
    return NextResponse.json({ link_token: response.data.link_token });
  } catch (error: any) {
    console.error('Plaid create-link-token error:', error.response?.data || error);
    return NextResponse.json(
      { error: 'Failed to create Plaid link token' },
      { status: 500 }
    );
  }
}
