"use client"

import Image from "next/image";
import Link from 'next/link';
import heroImg from '../../public/images/home-hero.jpg';
import {FaGithubSquare, FaLinkedin} from 'react-icons/fa';
import NavBar from "@/components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import React, {FormEvent} from 'react';
import {useAuthContext} from '@/context/authContext';
import Login from '@/components/AuthComponents/Login';
import Register from "@/components/AuthComponents/Register";


export default function Home() {

  const [login, setLogin] = useState<boolean>(true);

  return (
    <main className= "h-screen bg-white flex font-NunitoSans">
      <div className="w-full bg-transparent flex flex-col items-center justify-center">
        <Image
        src={heroImg}
        width={500}
        height={500}
        alt="illustration of three people with fruits"
        />
        <div className="flex flex-col items-center">
          <h1 className="text-green-dark font-bold text-3xl text-center">Welcome to Track Reaction</h1>
          <h2 className="font-bold text-green">Navigate life with allergies</h2>
          <p>Keep track and manage your allergies and food intolerance, and enjoy eating!</p>
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
      <div className="w-full bg-green-light flex flex-col items-center justify-center rounded-l-3xl">
        <div className="mt-5 h-3/6 flex items-center">
          {
          login ? (<Login />):(<Register/>)
          }
        </div>
        <div className="group relative mt-5 rounded-xl border-1 border-white bg-white bg-opacity-50">
          <div className={`w-3/6 h-full absolute top-0 bg-white rounded-xl fill-mode-forwards
          ${login ? "group-hover:animate-slide-left end-0":"group-hover:animate-slide-right left-0"}
          `}></div>
          <button onClick={()=> setLogin(false)} className="w-28 relative z-10 p-4 bg-transparent rounded-xl">Register</button>
          <button onClick={()=> setLogin(true)} className="w-28 relative z-10 p-4 bg-transparent rounded-xl">Login</button>
        </div>
      </div>
    </main>
  );
}
