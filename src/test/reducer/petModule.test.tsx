import reducer, {
  getSuccessPet,
  getSuccessPets,
  initialState,
  PetType,
  fetchPet,
  fetchMyPets,
  fetchPets,
  createPet,
  editPet,
} from 'modules/petModule';

describe('Reducer of petModule', () => {
  const pet: PetType = {
    id: '1',
    name: 'petNmae',
    age: 1,
    gender: {
      id: '0',
      name: 'オス',
    },
    image: {
      imagePath: '',
    },
  };

  it('getSuccessPet', () => {
    const action = { type: getSuccessPet.type, payload: pet };
    const state = reducer(initialState, action);

    expect(state.pet).toEqual(pet);
  });

  it('getSuccessPets', () => {
    const action = { type: getSuccessPets.type, payload: [pet] };
    const state = reducer(initialState, action);

    expect(state.pets).toEqual([pet]);
  });

  describe('extraReducer', () => {
    it('fetchPet', () => {
      const action = { type: fetchPet.fulfilled.type, payload: pet };
      const state = reducer(initialState, action);

      expect(state.pet).toEqual(pet);
    });

    it('fetchMyPets', () => {
      const action = { type: fetchMyPets.fulfilled.type, payload: [pet] };
      const state = reducer(initialState, action);

      expect(state.pets).toEqual([pet]);
    });

    it('fetchPets', () => {
      const action = { type: fetchPets.fulfilled.type, payload: [pet] };
      const state = reducer(initialState, action);

      expect(state.pets).toEqual([pet]);
    });

    it('createPet', () => {
      const action = { type: createPet.fulfilled.type, payload: pet };
      const state = reducer(initialState, action);

      expect(state.pet).toEqual(pet);
    });

    it('editPet', () => {
      const action = { type: editPet.fulfilled.type, payload: { ...pet, name: 'update cats' } };
      const state = reducer({ ...initialState, pet }, action);

      expect(state.pet).toEqual({ ...pet, name: 'update cats' });
    });
  });
});
