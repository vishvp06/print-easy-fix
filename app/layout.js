'use client';

import './globals.css';
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>PrintEasy - Smart Printing Service</title>
                <meta name="description" content="Find nearby xerox shops and get your documents printed instantly" />
                <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            </head>
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
