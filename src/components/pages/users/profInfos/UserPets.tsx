import {
  FC, useEffect, useRef, useState,
} from 'react';
import { AppDispatch } from 're-ducks/store/store';
import { useDispatch } from 'react-redux';
import showSnackbar from 'hook/showSnackbar';
import { fetchPets, PetType } from 'modules/petModule';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const UserPets: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const mountedRef = useRef(false);

  const [pets, setPets] = useState<Array<PetType>>();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const execApi = async () => {
      try {
        const data = await dispatch(fetchPets()).unwrap();
        if (mountedRef.current) {
          setPets(data);
        }
      } catch (e) {
        dispatch(showSnackbar({ e }));
      }
    };
    execApi();
  }, [dispatch]);

  return (
    <List>
      {
        pets && pets.map((pet) => (
          <ListItem
            key={pet.id}
          >
            <ListItemText primary={pet.name} />
          </ListItem>
        ))
      }
    </List>
  );
};

export default UserPets;
