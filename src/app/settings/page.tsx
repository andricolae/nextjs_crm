import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SettingsContent from "@/components/Settings/SettingsContent";

export const metadata: Metadata = {
    title: "Settings",
    description: "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Settings = () => {
    return (
        <DefaultLayout>
            <SettingsContent></SettingsContent>
        </DefaultLayout>
    );
};

export default Settings;
