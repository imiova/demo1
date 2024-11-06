'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

declare global {
  interface Window {
    Supademo?: (apiKey: string, options: { variables: { email: string, name: string } }) => void;
  }
}

type LanguageContent = {
  home: string;
  strategies: string;
  aboutUs: string;
  blog: string;
  contact: string;
  getStarted: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  watchDemo: string;
  followUs: string;
}

const content: Record<'en' | 'fr', LanguageContent> = {
  en: {
    home: "Home",
    strategies: "Strategies",
    aboutUs: "About Us",
    blog: "Blog",
    contact: "Contact",
    getStarted: "Get Started",
    heroTitle: "Build Your Financial Future with Tax-Efficient Strategies Tailored for Canadians",
    heroSubtitle: "Discover how to maximize your investments and secure your financial goals with expert advice focused on tax efficiency.",
    heroDescription: "If you're seeking to grow your wealth while keeping more of your hard-earned money, our tax-efficient investment strategies are designed to guide Canadians like you. From understanding tax benefits to creating a portfolio that minimizes liabilities, we'll help you make informed decisions that align with your financial aspirations.",
    watchDemo: "Watch Demo",
    followUs: "Follow us",
  },
  fr: {
    home: "Accueil",
    strategies: "Stratégies",
    aboutUs: "À propos",
    blog: "Blog",
    contact: "Contact",
    getStarted: "Commencer",
    heroTitle: "Construisez votre avenir financier avec des stratégies fiscalement efficaces adaptées aux Canadiens",
    heroSubtitle: "Découvrez comment maximiser vos investissements et atteindre vos objectifs financiers grâce à des conseils d'experts axés sur l'efficacité fiscale.",
    heroDescription: "Si vous cherchez à faire fructifier votre patrimoine tout en conservant une plus grande partie de votre argent durement gagné, nos stratégies d'investissement fiscalement efficaces sont conçues pour guider les Canadiens comme vous. De la compréhension des avantages fiscaux à la création d'un portefeuille qui minimise les passifs, nous vous aiderons à prendre des décisions éclairées qui s'alignent sur vos aspirations financières.",
    watchDemo: "Voir la démo",
    followUs: "Suivez-nous",
  },
}

export default function LandingPage() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const t = content[language];

  useEffect(() => {
    // Function to dynamically load the Supademo SDK script
    const loadSupademoScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (document.getElementById("supademo-script")) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.id = "supademo-script";
        script.src = "https://script.supademo.com/script.js"; // Add your SDK URL
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Supademo SDK"));
        document.body.appendChild(script);
      });
    };

    // Initialize Supademo only after the script has loaded
    loadSupademoScript().then(() => {
      if (typeof window.Supademo === 'function') {
        window.Supademo("676938268ca84b1f3bc3005b5af13069cda8cc8ef4daa395f8ac488c74440311", {
          variables: {
            email: "",
            name: ""
          }
        });
      }
    }).catch(error => console.error(error));
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 bg-white z-50 px-4 py-4 shadow-sm">
        <div className="container mx-auto">
          <nav className="flex items-center justify-between space-x-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Go to home">
              <span className="text-2xl font-bold text-teal-700">ImiovaDemo</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-teal-700">
                {t.home}
              </Link>
              <Link href="/strategies" className="text-sm font-medium text-gray-700 hover:text-teal-700">
                {t.strategies}
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-teal-700">
                {t.aboutUs}
              </Link>
              <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-teal-700">
                {t.blog}
              </Link>
              <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-teal-700">
                {t.contact}
              </Link>
              <div className="flex items-center gap-2 border border-gray-300 rounded-full p-1">
                <button 
                  className={`px-2 py-1 text-sm rounded-full ${language === 'en' ? 'bg-teal-700 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <button 
                  className={`px-2 py-1 text-sm rounded-full ${language === 'fr' ? 'bg-teal-700 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setLanguage('fr')}
                >
                  FR
                </button>
              </div>
            </div>
            <Button size="lg" className="hidden md:flex bg-teal-700 hover:bg-teal-800 text-white" asChild>
              <Link href="/get-started">{t.getStarted}</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-1 flex-wrap max-w-[200px]">
              {Array(20)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-200 rotate-45" />
                ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              {t.heroTitle.split(' ').map((word, index) => (
                <span key={index} className={index % 3 === 0 ? "text-teal-700" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              {t.heroSubtitle}
            </p>
            <p className="text-base text-gray-500 max-w-xl">
              {t.heroDescription}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white" asChild>
                <Link href="/get-started">{t.getStarted}</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2"
                data-supademo-demo="cm35gc9561tnt533hjjx93ftg"
              >
                <Play className="w-4 h-4" />
                {t.watchDemo}
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 border-[3px] border-gray-200 transform rotate-6" />
            <Image
              src="/karan.png"
              alt="Tax-Efficient Investing Illustration"
              width={600}
              height={800}
              className="relative z-10"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 text-gray-400">
              <Link href="#" className="hover:text-teal-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-teal-700 transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-teal-700 transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </Link>
              <div className="writing-mode-vertical-rl rotate-180 text-sm font-medium mt-4">
                {t.followUs}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
