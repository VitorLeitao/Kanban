"use client";
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createRoot } from "react-dom/client"; 
import client from './gql/apolloClient';
import KanbanPage from '@/components/kanbanPage';

function Home() {
  return (
    <ApolloProvider client={client}>
      <KanbanPage />
    </ApolloProvider>
  );
}

export default Home; 