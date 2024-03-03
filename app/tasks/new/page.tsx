"use client";

import { TextField } from "@radix-ui/themes";
import React from "react";

const NewTaskPage = () => {
  return (
    <div>
      <TextField.Root>
        <TextField.Input placeholder="Task" />
      </TextField.Root>
    </div>
  );
};

export default NewTaskPage;
