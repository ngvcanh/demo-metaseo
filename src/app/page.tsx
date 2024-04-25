"use client";
import { Tabs } from "@/components/tabs/tabs";
import { Form } from "./form";
import { Result } from "./result";

export default function Home() {
  return (
    <main className="w-[100dvw] h-[100dvh] oveflow-hidden bg-slate-100 px-8">
      <h1 className="uppercase font-semibold text-[40px] text-center py-8">
        Demo Metadata SEO
      </h1>
      <div className="bg-white px-8 shadow">
        <Tabs unmountOnExit={false}>
          <Tabs.Tab title="Form" value={0} element={<Form />} />
          <Tabs.Tab title="Result" value={1} element={<Result />} />
        </Tabs>
      </div>
    </main>
  );
}
