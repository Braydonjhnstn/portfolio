'use client';

import { useState, useEffect } from "react";
import Navigation from "./Navigation";

export default function NavigationWrapper() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleIntroComplete = () => setShowNav(true);
    window.addEventListener('introComplete', handleIntroComplete);
    return () => window.removeEventListener('introComplete', handleIntroComplete);
  }, []);

  return <Navigation showNav={showNav} />;
} 