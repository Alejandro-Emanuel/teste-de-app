import React, { createContext, useContext, useState } from 'react';

interface CaixaData {
  litros: number;
  volume: number;
  fLotar: number;
}

interface CaixaContextType {
  dados: CaixaData;
  setDados: (dados: CaixaData) => void;
}

const CaixaContext = createContext<CaixaContextType | null>(null);

export function CaixaProvider({ children }: { children: React.ReactNode }) {
  const [dados, setDados] = useState<CaixaData>({
    litros: 450,
    volume: 75,
    fLotar: 25,
  });

  return (
    <CaixaContext.Provider value={{ dados, setDados }}>
      {children}
    </CaixaContext.Provider>
  );
}

export function useCaixa() {
  const ctx = useContext(CaixaContext);
  if (!ctx) throw new Error('useCaixa deve ser usado dentro de CaixaProvider');
  return ctx;
}