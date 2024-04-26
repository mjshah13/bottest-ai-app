"use client";
import React from "react";
import { useAuth } from "@clerk/nextjs";

const Organization = () => {
  const { orgRole } = useAuth();

  return (
    <>
      <div className="h-[90vh] flex justify-center flex-col items-center">
        Organization
      </div>
    </>
  );
};

export default Organization;
