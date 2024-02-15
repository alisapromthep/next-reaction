import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>HELLO WORLD</h1>
      <Link href='/register'>Register</Link>
    </main>
  );
}
