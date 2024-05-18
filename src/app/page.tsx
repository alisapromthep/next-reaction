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

  const router = useRouter();

  const {currentUser, isLogin} = useAuthContext();

  useEffect(()=>{
      if(isLogin && currentUser.username){
          router.push(`profile/${currentUser.username}`)
      }

  },[isLogin,currentUser,router])

  return (
    <main className= "h-screen bg-white flex flex-col md:flex-row font-NunitoSans">
      <div className="w-full bg-transparent flex flex-col items-center justify-center">
        <Image
        src={heroImg}
        width={500}
        height={500}
        alt="illustration of three people with fruits"
        />
        <div className="md:p-4 mb-2 flex flex-col items-center text-center">
          <h1 className="text-green-dark font-bold text-xl md:text-3xl">Welcome to Track Reaction</h1>
          <h2 className="font-bold text-green">Navigate life with allergies</h2>
          <p className="text-sm md:text-base">Keep track and manage your allergies and food intolerance, and enjoy eating!</p>
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center">
            <a href='https://github.com/alisapromthep' target="_blank" rel="noreferrer">
              <FaGithubSquare className="text-3xl"/>
            </a>
              <a href='https://www.linkedin.com/in/alisa-promthep/' target="_blank" rel="noreferrer">
                <FaLinkedin className="text-3xl"/>
              </a>
          </div>
          <p>Made with ♡ by <a href="https://alisapromthep.dev/" target="_blank">Alisa</a> </p>
        </div>
      </div>
      <div className="md:py-10 w-full bg-green-light flex flex-col items-center justify-center rounded-t-3xl md:rounded-r-none md:rounded-l-3xl">
        <div className="md:w-full mt-8 mb-6 md:my-0 h-4/6 flex items-center justify-center">
          {
          login ? (<Login />):(<Register/>)
          }
        </div>
        <div className="group relative my-6 md:mb-0 rounded-xl border-1 border-white bg-white bg-opacity-50">
          <div className={`w-3/6 h-full absolute top-0 bg-white rounded-xl
          ${login ? "group-hover:animate-slide-left end-0 fill-mode-forwards":"group-hover:animate-slide-right left-0 fill-mode-forwards"}
          `}></div>
          <button onClick={()=> setLogin(false)} className="w-28 relative z-10 p-4 bg-transparent rounded-xl">Register</button>
          <button onClick={()=> setLogin(true)} className="w-28 relative z-10 p-4 bg-transparent rounded-xl">Login</button>
        </div>
        <div className="mt-6 mb-4 md:hidden">
          <div className="flex justify-center">
            <a href='https://github.com/alisapromthep' target="_blank" rel="noreferrer">
              <FaGithubSquare className="text-3xl"/>
            </a>
              <a href='https://www.linkedin.com/in/alisa-promthep/' target="_blank" rel="noreferrer">
                <FaLinkedin className="text-3xl"/>
              </a>
          </div>
          <p>Made with ♡ by <a href="https://alisapromthep.dev/" target="_blank">Alisa</a></p>
        </div>
      </div>
    </main>
  );
}
