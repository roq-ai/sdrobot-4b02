import axios from 'axios';
import queryString from 'query-string';
import { ProspectingCustomerInterface, ProspectingCustomerGetQueryInterface } from 'interfaces/prospecting-customer';
import { GetQueryInterface } from '../../interfaces';

export const getProspectingCustomers = async (query?: ProspectingCustomerGetQueryInterface) => {
  const response = await axios.get(`/api/prospecting-customers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProspectingCustomer = async (prospectingCustomer: ProspectingCustomerInterface) => {
  const response = await axios.post('/api/prospecting-customers', prospectingCustomer);
  return response.data;
};

export const updateProspectingCustomerById = async (id: string, prospectingCustomer: ProspectingCustomerInterface) => {
  const response = await axios.put(`/api/prospecting-customers/${id}`, prospectingCustomer);
  return response.data;
};

export const getProspectingCustomerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/prospecting-customers/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteProspectingCustomerById = async (id: string) => {
  const response = await axios.delete(`/api/prospecting-customers/${id}`);
  return response.data;
};
