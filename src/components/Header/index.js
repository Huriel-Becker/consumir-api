import React from 'react';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../services/axios';
import { toast } from 'react-toastify';

import { Nav } from './styled';

import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const id = useSelector((state) => state.auth.user.id);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color="66ff33" />}

      {isLoggedIn && (
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (id) axios.delete(`/users`);
            dispatch(actions.loginFailure());
            history.push('/'); // Se usou history altere
            toast.success('Usuário deletado com sucesso.');
          }}
        >
          Deletar Usuário
        </button>
      )}
    </Nav>
  );
}
