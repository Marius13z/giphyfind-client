import React from "react";
import { DotWave } from "@uiball/loaders";

const Loader = () => {
  return (
    <div className="pt-4">
      <DotWave size={47} speed={1} color="white" />
    </div>
  );
};

export default Loader;
