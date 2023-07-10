import  {create} from 'zustand'

export const intentosLogin = create((set)=>({
  intentos:0,
  reducirIntentos: (newIntento) => set({ intentos: newIntento })
}))