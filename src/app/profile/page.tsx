// src/app/profile/page.tsx
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, MapPin, ListOrdered, Lock } from 'lucide-react';

// --- Contoh Tipe Data (Sesuaikan dengan skema Prisma User Anda) ---
type UserData = {
    name: string;
    email: string;
    phone: string;
    role: 'USER' | 'ADMIN';
};

type Address = {
    id: number;
    label: string;
    fullAddress: string;
    city: string;
    postalCode: string;
    isPrimary: boolean;
};

type Order = {
    id: number;
    total: number;
    status: string;
    createdAt: string;
    itemsCount: number;
};
// ------------------------------------------------------------------
const BACKGROUND_IMAGE_URL = 'https://i.pinimg.com/1200x/de/ef/48/deef48f5c00df6d050a11278b903026d.jpg';
// --- Data Dummy (Ganti dengan data yang diambil dari API/Database) ---
const DUMMY_USER: UserData = {
    name: 'DWI AGUS WIBISANA',
    email: 'user@example.com',
    phone: '+62857xxxxxx',
    role: 'USER',
};

const DUMMY_ADDRESSES: Address[] = [
    { id: 1, label: 'Rumah', fullAddress: 'Jl. Contoh No. 123, Desa Maju', city: 'Kudus', postalCode: '59353', isPrimary: true },
    { id: 2, label: 'Kantor', fullAddress: 'Jl. Bisnis Raya, Kav. A', city: 'Semarang', postalCode: '50232', isPrimary: false },
];

const DUMMY_ORDERS: Order[] = [
    { id: 1001, total: 4299000, status: 'Completed', createdAt: '2025-09-15', itemsCount: 2 },
    { id: 1002, total: 1899000, status: 'Processing', createdAt: '2025-09-20', itemsCount: 1 },
    { id: 1003, total: 2699000, status: 'Cancelled', createdAt: '2025-09-22', itemsCount: 1 },
];
// ------------------------------------------------------------------

// === Gaya Glassmorphism Dasar ===
const GLASS_STYLE = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Latar belakang putih semi-transparan
    backdropFilter: 'blur(12px)',               // Efek blur
    WebkitBackdropFilter: 'blur(12px)',         // Dukungan Webkit
    border: '1px solid rgba(255, 255, 255, 0.2)', // Border semi-transparan
};

const CARD_BG_CLASS = 'bg-white bg-opacity-10'; // Latar belakang untuk item di dalam card
// ================================


// --- Komponen Tab Content ---

const AccountTab = ({ user }: { user: UserData }) => (
    <div className="space-y-4 text-white">
        <h3 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Informasi Dasar</h3>
        <div className={`${CARD_BG_CLASS} p-4 rounded-md`}>
            <p className="text-sm text-gray-300">Nama</p>
            <p className="text-lg">{user.name}</p>
        </div>
        <div className={`${CARD_BG_CLASS} p-4 rounded-md`}>
            <p className="text-sm text-gray-300">Email</p>
            <p className="text-lg">{user.email}</p>
        </div>
        <div className={`${CARD_BG_CLASS} p-4 rounded-md`}>
            <p className="text-sm text-gray-300">Telepon</p>
            <p className="text-lg">{user.phone}</p>
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-md transition-colors font-medium mt-4 text-white">Edit Profil</button>
    </div>
);

const AddressTab = ({ addresses }: { addresses: Address[] }) => (
    <div className="space-y-6 text-white">
        <h3 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Alamat Pengiriman</h3>
        <button className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded-md transition-colors font-medium text-white">Tambah Alamat Baru</button>
        {addresses.map((addr) => (
            <div key={addr.id} className={`p-5 rounded-md border ${addr.isPrimary ? 'border-yellow-400' : 'border-gray-700'} ${CARD_BG_CLASS}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <span className="font-semibold">{addr.label}</span>
                        {addr.isPrimary && <span className="ml-2 text-xs bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full">Utama</span>}
                        <p className="mt-1 text-gray-300">{addr.fullAddress}, {addr.city} {addr.postalCode}</p>
                    </div>
                    <div className="space-x-2 text-sm">
                        <button className="text-blue-300 hover:text-blue-200">Edit</button>
                        {!addr.isPrimary && <button className="text-red-300 hover:text-red-200">Hapus</button>}
                        {!addr.isPrimary && <button className="text-yellow-300 hover:text-yellow-200">Set Utama</button>}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const OrdersTab = ({ orders }: { orders: Order[] }) => {
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-500';
            case 'Processing': return 'bg-yellow-500';
            case 'Cancelled': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="space-y-4 text-white">
            <h3 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Riwayat Pesanan</h3>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className={`${CARD_BG_CLASS} p-4 rounded-md flex justify-between items-center hover:bg-opacity-20 transition-colors`}>
                        <div>
                            <p className="font-semibold">Order ID: #{order.id}</p>
                            <p className="text-gray-300 text-sm">Tanggal: {order.createdAt}</p>
                            <p className="text-gray-300 text-sm">{order.itemsCount} item</p>
                        </div>
                        <div className="text-right">
                            <span className={`text-xs text-white px-2 py-0.5 rounded-full ${getStatusClass(order.status)}`}>
                                {order.status}
                            </span>
                            <p className="text-lg font-bold mt-1">Rp {new Intl.NumberFormat('id-ID').format(order.total)}</p>
                            <button className="text-blue-300 text-sm hover:underline mt-1">Lihat Detail</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SecurityTab = () => (
    <div className="space-y-6 text-white">
        <h3 className="text-xl font-semibold border-b border-gray-300 pb-2 mb-4">Keamanan Akun</h3>
        <div className={`${CARD_BG_CLASS} p-4 rounded-md`}>
            <h4 className="font-medium">Ubah Password</h4>
            <p className="text-sm text-gray-300 mb-2">Pastikan password Anda kuat dan unik.</p>
            <button className="bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded-md transition-colors font-medium">Reset Password</button>
        </div>
        <div className={`${CARD_BG_CLASS} p-4 rounded-md`}>
            <h4 className="font-medium">Verifikasi Dua Langkah (2FA)</h4>
            <p className="text-sm text-gray-300 mb-2">Tambahkan lapisan keamanan ekstra pada akun Anda.</p>
            <button className="bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded-md transition-colors font-medium">Aktifkan 2FA</button>
        </div>
    </div>
);


// --- Komponen Utama Profile ---

export default function UserProfilePage() {
    // State untuk mengontrol tab mana yang sedang aktif
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', label: 'Akun Saya', icon: User, component: <AccountTab user={DUMMY_USER} /> },
        { id: 'address', label: 'Alamat', icon: MapPin, component: <AddressTab addresses={DUMMY_ADDRESSES} /> },
        { id: 'orders', label: 'Pesanan', icon: ListOrdered, component: <OrdersTab orders={DUMMY_ORDERS} /> },
        { id: 'security', label: 'Keamanan', icon: Lock, component: <SecurityTab /> },
    ];

    return (
        <>
            <Header />
            <div className="bg-transparent text-gray-100 min-h-screen pt-32 pb-16 relative">
                <div className="absolute inset-0 z-0" style={{ backgroundImage  : BACKGROUND_IMAGE_URL}}></div>
                <div className="container mx-auto px-4 relative z-10"> 
                    <h1 className="text-4xl font-bold mb-10 text-center">User Profile</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div
                            className="col-span-1 p-6 rounded-xl shadow-2xl h-fit sticky top-32"
                            style={GLASS_STYLE}
                        >
                            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3">Settings</h2>
                            <nav className="space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full text-left flex items-center p-3 rounded-md transition-colors ${activeTab === tab.id
                                                    ? 'bg-white bg-opacity-20 text-white font-semibold border-l-4 border-yellow-400' // Tab aktif sedikit lebih menonjol
                                                    : 'hover:bg-white hover:bg-opacity-10 text-gray-300' // Hover juga semi-transparan
                                                }`}
                                        >
                                            <Icon size={20} className="mr-3" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                            </nav>
                            <button className="w-full text-left text-red-300 hover:text-red-200 p-3 rounded-md transition-colors mt-6">
                                Logout
                            </button>
                        </div>

                        {/* Konten Utama - Diberi Glassmorphism */}
                        <div
                            className="lg:col-span-3 p-8 rounded-xl shadow-2xl"
                            style={GLASS_STYLE}
                        >
                            {tabs.find(tab => tab.id === activeTab)?.component}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}