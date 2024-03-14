"use client"

import Image from "next/image";
import Link from 'next/link';
import heroImg from '../../public/images/home-hero.jpg';
import {FaGithubSquare, FaLinkedin} from 'react-icons/fa';
import NavBar from "@/components/NavBar/NavBar";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import React, {FormEvent} from 'react';
import {useAuthContext} from '@/context/authContext';


export default function Home() {

  const [login, setLogin] = useState<Boolean>(true);

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
          <h1 className="text-green-dark font-bold text-3xl">Welcome to Track Reaction</h1>
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
      <div className="w-full bg-green-light flex flex-col items-center rounded-l-3xl">
        
        <div className="py-4 rounded-xl border-1 border-white bg-white bg-opacity-50">
          <button className="p-4 rounded-xl">Register</button>
          <button className="p-4 bg-white rounded-xl">Login</button>
        </div>
      </div>
    </main>
  );
}
