import * as apiClient from './apiClient';

export const getGroups = async params => apiClient.get('/api/groups', params);
export const createGroup = async group => apiClient.post(`/api/groups`, group);
export const updateGroup = async group => apiClient.patch(`/api/groups/${group.id}`, group);

export const setGroupUsers = async (group, users) => apiClient.put(`/api/groups/${group.id}/users`, users);
