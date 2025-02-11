import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, database, ref, set, createUserWithEmailAndPassword, signInWithPopup, googleProvider } from '../firebase';
import Swal from 'sweetalert2';

// تسجيل مستخدم جديد
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ fullName, email, phone, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // حفظ بيانات المستخدم في قاعدة البيانات
      await set(ref(database, `users/${user.uid}`), { fullName, email, phone });

      Swal.fire({
        title: 'Registration Successful!',
        text: 'Redirecting to login...',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      return { uid: user.uid, fullName, email, phone };
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
      return rejectWithValue(error.message);
    }
  }
);

// تسجيل الدخول باستخدام Google
export const signUpWithGoogle = createAsyncThunk(
  'auth/signUpWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await set(ref(database, `users/${user.uid}`), {
        fullName: user.displayName,
        email: user.email,
        phone: user.phoneNumber || '',
      });

      Swal.fire({
        title: 'Google Sign-Up Successful!',
        text: 'Redirecting to dashboard...',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });

      return { uid: user.uid, fullName: user.displayName, email: user.email, phone: user.phoneNumber || '' };
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
      return rejectWithValue(error.message);
    }
  }
);

// إنشاء Slice لإدارة المصادقة
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
