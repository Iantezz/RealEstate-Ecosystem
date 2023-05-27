import React, { FunctionComponent } from "react";

const BaseLayout: FunctionComponent = ({ children }) => {
  return (
    <>
      <div className="py-16 bg-green-500 overflow-hidden min-h-screen">
        {/* Your content here */}
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </>
  );
};

export default BaseLayout;
