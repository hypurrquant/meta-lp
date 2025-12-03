"use client";

import { ChevronDown, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function User() {
  // Mock connected state - will be replaced with actual wallet connection
  const isConnected = true;
  const address = "0x1234...abcd";

  return (
    <div className="flex h-16 items-center border-b border-border px-2">
      {isConnected ? (
        <div className="flex w-full items-center justify-between rounded-md px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-800">
          <div className="flex items-center">
            <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
              <Wallet size={16} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{address}</span>
              <span className="text-xs text-muted-foreground">Connected</span>
            </div>
          </div>
          <ChevronDown size={16} />
        </div>
      ) : (
        <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600">
          <Wallet size={16} className="mr-2" />
          Connect
        </Button>
      )}
    </div>
  );
}
