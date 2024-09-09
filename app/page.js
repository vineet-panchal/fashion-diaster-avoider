'use client'
import { useState } from "react";
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Spline from '@splinetool/react-spline/next';

import "@/app/css/Home.css";
import { Height } from "@mui/icons-material";
import Link from "next/link";
import Footer from "./components/Footer";

export default function Home() {

  return (
    <>
      <div className="home-ctr">
        <Link className="getStarted-btn" href={"/chat"} passHref>Get Started</Link>
        <Footer />
        <Spline
          scene="https://prod.spline.design/E3nvVT3kt0P9425i/scene.splinecode" 
        />
      </div>
    </>
  )
} 
