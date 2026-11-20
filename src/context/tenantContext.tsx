'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type TenantConfig, DEFAULT_TENANT, resolveTenantByHostname } from "@/config/tenants";

interface TenantContextValue {
  tenant: TenantConfig;
  setTenant: (t: TenantConfig) => void;
}

const TenantContext = createContext<TenantContextValue>({
  tenant: DEFAULT_TENANT,
  setTenant: () => {},
});

export function TenantProvider({
  initialTenant = DEFAULT_TENANT,
  children,
}: {
  initialTenant?: TenantConfig;
  children: ReactNode;
}) {
  const [tenant, setTenant] = useState<TenantConfig>(initialTenant);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const detected = resolveTenantByHostname(window.location.hostname);
      setTenant(detected);
    }
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    return { tenant: DEFAULT_TENANT, setTenant: () => {} };
  }
  return ctx;
}
