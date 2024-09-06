import React from 'react'
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableClients from '@/components/Clients/TableClients';

export const metadata: Metadata = {
    title: "Clients",
    description:
        "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ClientsPage = () => {
    return (
        <DefaultLayout>
            <TableClients />
        </DefaultLayout>
    )
}

export default ClientsPage;