import { useState, useEffect, useCallback } from 'react';
import {
  deleteEkubMember,
  getEkubMembers,
  registerUserToEkubApi,
  updateEkubMember,
} from '../../../util/ApiUtil';
import { notify } from '../../../util/notify';

export const useUsers = (token) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEkubMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getEkubMembers(token);
      if (response.status === 1) {
        setUsers(response.payload.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const addUser = async (newUser) => {
    try {
      const response = await registerUserToEkubApi(
        newUser.fullname,
        newUser.email,
        newUser.phone,
        '123',
        token,
      );

      if (response.status == 1) {
        notify(response);
        fetchEkubMembers();
      }
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const editUser = async (updatedUser) => {
    try {
      const response = await updateEkubMember(
        token,
        updatedUser._id,
        updatedUser,
      );
      if (response.status == 1) {
        notify(response);
        fetchEkubMembers();
      }
    } catch (error) {
      console.error('Failed to edit user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await deleteEkubMember(token, id);
      if (response.status == 1) {
        notify(response);
        fetchEkubMembers();
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  useEffect(() => {
    fetchEkubMembers();
  }, [fetchEkubMembers]);

  return { users, isLoading, fetchEkubMembers, addUser, editUser, deleteUser };
};
