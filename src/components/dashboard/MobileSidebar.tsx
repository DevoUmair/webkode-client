// src/components/dashboard/MobileSidebar.tsx
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

import {
    Home,
    Wallet,
    ArrowLeftRight,
    History,
    FileText,
    Settings
} from 'lucide-react';

export function MobileSidebar() {
    const navItems = [
        { to: '/dashboard', icon: Home, label: 'Overview' },
        { to: '/dashboard/transfers', icon: ArrowLeftRight, label: 'Transfers' },
        { to: '/dashboard/transactions', icon: History, label: 'Transactions' },
        { to: '/dashboard/invoices', icon: FileText, label: 'Invoices' },
        { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ];
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4">
                <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="p-4 bg-white">
                <Link to="/" className="flex items-center gap-2 w-full">
                    <motion.div
                        initial={{ rotate: -10, scale: 0.9 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-8 w-8 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white">FC</span>
                        </div>
                    </motion.div>
                    <span className="font-bold text-xl hidden sm:block">FinConnect</span>
                </Link>
                <nav className="space-y-4 mt-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 text-lg font-medium rounded-md ${isActive
                                    ? 'text-blue-600'
                                    : 'text-gray-700 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}