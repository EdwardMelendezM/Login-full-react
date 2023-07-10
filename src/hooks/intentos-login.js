import  {create} from 'zustand'


export const intentosLogin = create ((set, get) => ({
  intentos: 4,
  actualizarIntentos: () => {

    const amountState = get().intentos

    set({ intentos: amountState - 1 })
    //is the same as:
    // set(state => ({ amount: newAmount + state.amount  }))
  },
}));