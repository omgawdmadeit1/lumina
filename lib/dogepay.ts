// Lumina DogePay integration
// Generates realistic Dogecoin payment URIs + QR data for bundles and listings.
// For live use: set real DOGE wallet address (via DOGE_PAY_ADDRESS env or replace here).
// This matches patterns from the dogepay-deploy skill + real /pay flows.

const DEFAULT_DOGE_ADDRESS = "D7Y7v5vL3kQvN9pX2mR8sT4wU6iO0pA1sD3fG5hJ7kL"; // DEMO only — replace with real for payments

export function generateDogePayLink(
  projectTitle: string,
  amountDogecoin: number = 42,
  addressOverride?: string
) {
  const memo = encodeURIComponent(`${projectTitle} - Lumina Bundle`);
  const address = addressOverride || process.env.NEXT_PUBLIC_DOGE_PAY_ADDRESS || DEFAULT_DOGE_ADDRESS;
  const uri = `dogecoin:${address}?amount=${amountDogecoin}&message=${memo}`;

  return {
    uri,
    address,
    amount: amountDogecoin,
    memo: `${projectTitle} - Lumina Bundle`,
  };
}

export function getDogePayAddress(): string {
  return process.env.NEXT_PUBLIC_DOGE_PAY_ADDRESS || DEFAULT_DOGE_ADDRESS;
}

// Client QR generation uses the 'qrcode' package (already in deps). See creation page for example.
