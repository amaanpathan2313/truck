
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { async } from '@firebase/util';

//  Sign Up

export const signupUser = createAsyncThunk('auth/signupUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let userCredencials = await createUserWithEmailAndPassword(auth, email, password);
            return userCredencials.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)


//  Login

export const loginUser = createAsyncThunk('auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredencials = await signInWithEmailAndPassword(auth, email, password);
            return userCredencials.user;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

//  Logout

export const logoutUser = createAsyncThunk('auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



const authSlice = createSlice({

    name: 'auth',

    initialState: {
        user: null,
        isLoading: false,
        isError: null,
        isSuccess: false,
    },


    reducers: {
        logoutLocal: (state) => {
            state.user = null;
        }
    },    

    extraReducers: (builder) => {
        builder

            //  Signup
            .addCase((signupUser.pending), (state) => {
                state.isLoading = true;
            })
            .addCase((signupUser.fulfilled), (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                // console.log("I am payload :: ",     action.payload.email)
                state.isSuccess = true;
            })
            .addCase((signupUser.rejected), (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })

            //  Login

            .addCase((loginUser.pending), (state) => {
                state.isLoading = true;
            })
            .addCase((loginUser.fulfilled), (state, action) => {
                state.isLoading = false;
                state.user = action.payload.email;
                state.isSuccess = true;;
            })
            .addCase((loginUser.rejected), (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
                // console.log(action.payload)
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isSuccess = true;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })


    }
})


export default authSlice.reducer;

export const { logout } = authSlice.actions;