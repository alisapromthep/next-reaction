import Image from "next/image";
import Link from 'next/link';
import heroImg from '../../public/images/home-hero.jpg';

export default function Home() {
  return (
    <main className="bg-white flex flex-col font-NunitoSans">
      <div className="bg-transparent">
        <Image
        src={heroImg}
        width={500}
        height={500}
        alt="illustration of three people with fruits"
        />
      </div>
      <div className="flex flex-col items-center bg-green-light h-auto">
        <h1 className="text-green-dark font-bold text-3xl">Welcome to Track Reaction</h1>
        <h2>Navigate life with allergies</h2>
        <p>Keep track and manage your allergies and food intolerance, and enjoy eating!</p>
        <div>
          <Link href='/register'>Register</Link>
          <Link href='/login'>Login</Link>
        </div>
        <p>Made with ♡ by <a href="https://alisapromthep.dev/" target="_blank">Alisa</a> </p>
      </div>
    </main>
  );
}
