'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if running in standalone mode
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');
    setIsStandalone(standalone);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome to Side Hustle</h1>
          <p className="text-gray-400">Your modern PWA companion</p>
        </div>

        {!isStandalone && (
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Install the App</h2>
            <p className="text-gray-300 mb-4">
              Get the best experience by installing our app to your device.
            </p>
            <Link
              href={isIOS ? '/instructions/ios' : '/instructions/android'}
              className="block w-full bg-white text-black text-center font-semibold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors"
            >
              View Installation Instructions
            </Link>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Push Notifications
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Offline Support
              </li>
              <li className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Modern UI
              </li>
            </ul>
          </div>

          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <p className="text-gray-300 mb-4">
              Follow these simple steps to get started with Side Hustle:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Install the app to your device</li>
              <li>Enable notifications for updates</li>
              <li>Enjoy the seamless experience</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}