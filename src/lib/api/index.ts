import { folders } from '@prisma/client';
import api from './axios';

export const getFolders = async (body: Partial<folders>) => {
  const { data } = await api.post('/folders', {
    user_id: body.user_id,
  });
  return data;
};

export const createFolderToDb = async (body: Partial<folders>) => {
  const { data } = await api.post('/folders/create', {
    name: body.name,
    user_id: body.user_id,
  });
  return data;
};

export const updateDataFolder = async (body: Partial<folders>) => {
  const { data } = await api.post('/folders/update', {
    id: body.id,
    name: body.name,
  });
  return data;
};

export const deleteDataFolder = async (body: Partial<folders>) => {
  const { data } = await api.post('/folders/delete', {
    id: body.id,
  });
  return data;
};
