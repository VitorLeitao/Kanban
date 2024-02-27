"use client"
import React from "react";

export const NavBar = () => {

  return (
    <div className="w-full">
      <nav className="bg-gray-800 p-7 w-full">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <a href="http://localhost:3000/"><h1 className="text-2xl font-bold">Progress Board</h1></a>
            </div>
            <div className="flex space-x-4">
              <a href="http://localhost:3000/dashboard" className="text-white hover:text-gray-300">DashBoard</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};