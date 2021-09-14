import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createPetAPI, fetchPetAPI, fetchMyPetsAPI, editPetAPI, fetchPetsAPI,
} from 'api/Endpoint';
import { push } from 'connected-react-router';
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
      _thunkApi.dispatch(showSnackbar({ msg: 'ペット登録しました。', isError: false }));
      _thunkApi.dispatch(push('/'));
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
      _thunkApi.dispatch(showSnackbar({ msg: 'ペット更新しました。', isError: false }));
      _thunkApi.dispatch(push('/'));
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

export const fetchMyPets = createAsyncThunk<
  Array<PetType>,
  void,
  { rejectValue: { message: string } }
>(
  'pet/fetchMyPets',
  async (_args, _thunkApi) => {
    try {
      const res = await fetchMyPetsAPI();
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

export const fetchPets = createAsyncThunk<
  Array<PetType>,
  string,
  { rejectValue: { message: string } }
  >(
    'pet/fetchPets',
    async (_args, _thunkApi) => {
      try {
        const res = await fetchPetsAPI(_args);
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
    builder.addCase(fetchMyPets.fulfilled, (state, action) => {
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
