import { FC } from "react";
import { Collapse } from "@/components/collapse";
import { FormInput } from "./form-input";
import { OffInput } from "./off-input";

export const Form: FC = () => {
  return (
    <div>
      <Collapse title="Primary" className="my-4">
        <div className="p-4">
          <OffInput name="charSet" label="Charset" title="Charset" placeholder="Enter charset" />
          <FormInput name="title" label="Title" placeholder="Enter title" className="mt-3" />
          <FormInput name="keywords" label="Keywords" placeholder="Enter keywords" className="mt-3" />
          <FormInput name="description" label="Description" placeholder="Enter description" className="mt-3" multiline rows={3} />
        </div>
      </Collapse>
      <Collapse title="http equiv" className="my-4">
        <div className="p-4">
          
        </div>
      </Collapse>
    </div>
  );
};
