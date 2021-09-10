import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createPetAPI, fetchPetAPI, fetchPetsAPI, editPetAPI,
} from 'api/Endpoint';
import showSnackbar from 'hook/showSnackbar';

export type PetType = {
  id: string,
  name: string,
  age: number,
  gender: {
    id: string,
    name: string,
  },
};

export type PetStateType ={
  pet: PetType,
  pets: Array<PetType>,
}

export const initialState: PetStateType = {
  pet: {
    id: '',
    name: '',
    age: 0,
    gender: {
      id: '0',
      name: '',
    },
  },
  pets: [],
};

export const fetchPet = createAsyncThunk<
  PetType,
  string,
  { rejectValue: { message: string } }
>(
  'pet/fetchPet',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchPetAPI(_args);
      return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const createPet = createAsyncThunk<
  PetType,
  FormData,
  {rejectValue: { message: string } }
>(
  'pet/createPet',
  async (_args, _thunkApi) => {
    try {
      const res = await createPetAPI(_args);
      return res;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const editPet = createAsyncThunk<
  PetType,
  { id: string, data: FormData },
  {rejectValue: { message: string } }
>(
  'pet/editPet',
  async (_args, _thunkApi) => {
    try {
      const res = await editPetAPI(_args.id, _args.data);
      return res;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const fetchPets = createAsyncThunk<
  Array<PetType>,
  void,
  { rejectValue: { message: string } }
>(
  'pet/fetchPets',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchPetsAPI();
      return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      _thunkApi.dispatch(showSnackbar({ e }));
      return _thunkApi.rejectWithValue({
        message: e.message,
      });
    }
  },
);

export const petModule = createSlice({
  name: 'pet',
  initialState,
  reducers: {
    getSuccessPet: (state, action) => {
      state.pet = action.payload;
    },
    getSuccessPets: (state, action) => {
      state.pets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPet.fulfilled, (state, action) => {
      const getAction = petModule.actions.getSuccessPet(action.payload);
      petModule.caseReducers.getSuccessPet(state, getAction);
    });
    builder.addCase(fetchPets.fulfilled, (state, action) => {
      const getAction = petModule.actions.getSuccessPets(action.payload);
      petModule.caseReducers.getSuccessPets(state, getAction);
    });
    builder.addCase(createPet.fulfilled, (state, action) => {
      const getAction = petModule.actions.getSuccessPet(action.payload);
      petModule.caseReducers.getSuccessPet(state, getAction);
    });
    builder.addCase(editPet.fulfilled, (state, action) => {
      const getAction = petModule.actions.getSuccessPet(action.payload);
      petModule.caseReducers.getSuccessPet(state, getAction);
    });
  },
});

export const {
  getSuccessPet,
  getSuccessPets,
} = petModule.actions;

export default petModule.reducer;
