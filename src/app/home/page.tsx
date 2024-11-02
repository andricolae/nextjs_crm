import React from 'react'
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableHome from '@/components/Home/TableHome';

export const metadata: Metadata = {
    title: "Home",
    description:
        "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ClientsPage = () => {
    return (
        <DefaultLayout>
            <TableHome />
        </DefaultLayout>
    );
};

export default ClientsPage;
