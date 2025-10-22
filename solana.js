import { Connection, clusterApiUrl, Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

// ✅ Connect to Solana Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// ✅ Generate or load a wallet (temporary keypair for testing)
const wallet = Keypair.generate();

// ✅ Function to get SOL balance
export async function getBalance(pubKey) {
  const balance = await connection.getBalance(new PublicKey(pubKey));
  return balance / LAMPORTS_PER_SOL;
}

// ✅ Function to airdrop SOL for testing
export async function requestAirdrop(pubKey) {
  const signature = await connection.requestAirdrop(new PublicKey(pubKey), LAMPORTS_PER_SOL);
  await connection.confirmTransaction(signature);
  return signature;
}

// ✅ Function to send SOL (dummy transfer)
export async function sendSol(fromKeypair, toPubKey, amount) {
  const transaction = await connection.requestAirdrop(
    new PublicKey(toPubKey),
    amount * LAMPORTS_PER_SOL
  );
  return transaction;
}

// ✅ Quick test when run directly
if (process.argv[1].includes("solana.js")) {
  (async () => {
    console.log("Wallet public key:", wallet.publicKey.toBase58());
    await requestAirdrop(wallet.publicKey);
    const balance = await getBalance(wallet.publicKey);
    console.log("Balance after airdrop:", balance, "SOL");
  })();
}
