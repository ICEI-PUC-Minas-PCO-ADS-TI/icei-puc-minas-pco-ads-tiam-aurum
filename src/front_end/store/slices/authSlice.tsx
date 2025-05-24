import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  usuario: UsuarioState | null;
}

interface UsuarioState {
  id: number | null;
  nome: string | null;
  email: string | null;
  documento: string | null;
}

const initialState: AuthState = {
  token: null,
  usuario: null
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action: PayloadAction<AuthState | null>) => {
      state.token = action.payload?.token || null;
      state.usuario = action.payload?.usuario || null;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
})

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;