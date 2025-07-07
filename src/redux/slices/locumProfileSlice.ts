import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Specialty {
  id?: string;
  locumId?: string;
  speciality: string;
  numberOfYears: number;
}

export interface LocumProfile {
  id?: string;
  fullName: string;
  emailAddress: string;
  contactNumber: string;
  address: string;
  password?: string;
  gdcNumber?: string;
  employeeType: string;
  dateOfBirth?: Date;
  location?: string;
  software?: string;
  status?: string;
  referenceNumber?: string;
  specialties?: Specialty[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const locumProfileApiSlice = createApi({
  reducerPath: 'locumProfileApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['LocumProfile'],
  endpoints: (builder) => ({
    getLocumProfiles: builder.query<LocumProfile[], void>({
      query: () => 'locum-profile/register',
      providesTags: ['LocumProfile'],
    }),
    getLocumProfileById: builder.query<LocumProfile, string>({
      query: (id) => `locum-profile/register?id=${id}`,
      providesTags: ['LocumProfile'],
    }),
    addLocumProfile: builder.mutation<LocumProfile, Omit<LocumProfile, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (newProfile) => ({
        url: 'locum-profile/register',
        method: 'POST',
        body: newProfile,
      }),
      invalidatesTags: ['LocumProfile'],
    }),
    updateLocumProfile: builder.mutation<LocumProfile, Partial<LocumProfile> & { id: string }>({
      query: (updatedProfile) => ({
        url: 'locum-profile/register',
        method: 'PUT',
        body: updatedProfile,
      }),
      invalidatesTags: ['LocumProfile'],
    }),
    deleteLocumProfile: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `locum-profile/register?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LocumProfile'],
    }),
  }),
});

export const {
  useGetLocumProfilesQuery,
  useGetLocumProfileByIdQuery,
  useAddLocumProfileMutation,
  useUpdateLocumProfileMutation,
  useDeleteLocumProfileMutation,
} = locumProfileApiSlice; 