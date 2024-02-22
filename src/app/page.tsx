import Image from "next/image";
import Link from 'next/link';
import heroImg from '../../public/images/home-hero.jpg';
import {FaGithubSquare, FaLinkedin} from 'react-icons/fa';

export default function Home() {
  return (
    <main className= "bg-white flex flex-col font-NunitoSans">
      <div className="bg-transparent">
        <Image
        src={heroImg}
        width={500}
        height={500}
        alt="illustration of three people with fruits"
        />
      </div>
      <div className="flex flex-col items-center bg-green-light rounded-t-3xl">
        <h1 className="text-green-dark font-bold text-3xl">Welcome to Track Reaction</h1>
        <h2 className="font-bold text-green">Navigate life with allergies</h2>
        <p>Keep track and manage your allergies and food intolerance, and enjoy eating!</p>
        <div className="py-4 rounded-xl border-1 border-white bg-white bg-opacity-50">
          <Link className="p-4 rounded-xl" href='/register'>Register</Link>
          <Link className="p-4 bg-white rounded-xl" href='/login'>Login</Link>
        </div>
        <div className="flex">
          <a href='https://github.com/alisapromthep' target="_blank" rel="noreferrer">
            <FaGithubSquare className="text-3xl"/>
          </a>
            <a href='https://www.linkedin.com/in/alisa-promthep/' target="_blank" rel="noreferrer">
              <FaLinkedin className="text-3xl"/>
            </a>
        </div>
        <p>Made with ♡ by <a href="https://alisapromthep.dev/" target="_blank">Alisa</a> </p>
      </div>
    </main>
  );
}
