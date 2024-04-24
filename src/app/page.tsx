import { Tab } from "@/components/tabs/tab";
import { Tabs } from "@/components/tabs/tabs";
import { Form } from "./form";

export default function Home() {
  return (
    <main className="w-[100dvw] h-[100dvh] oveflow-hidden bg-slate-100">
      <h1 className="uppercase font-semibold text-[40px] text-center py-8">
        Demo Metadata SEO
      </h1>
      <Tabs>
        <Tab title="Form" value={0} element={<Form />} />
      </Tabs>
    </main>
  );
}
