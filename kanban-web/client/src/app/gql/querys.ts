"use client";
import Image from 'next/image';
// Redirecionamento de usuario
import { useRouter } from 'next/navigation';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useLazyQuery } from '@apollo/client';


export const TASKS = gql`
query getTasks {
    getTasks {
    id
    index
    title
    date
  }
}
`;

