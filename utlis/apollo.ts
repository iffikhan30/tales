// src/apollo.ts

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const isDev = process.env.EXPO_PUBLIC_DEV_MODE === 'false';

const GRAPHQL_URL = isDev
  ? process.env.EXPO_PUBLIC_LOCAL
  : process.env.EXPO_PUBLIC_LIVE;

// --------------------------------------------------
// Auth middleware
// --------------------------------------------------

const authLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    AsyncStorage.getItem('authToken')
      .then((token) => {
        if (token) {
          operation.setContext(({ headers = {} }: any) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
            },
          }));
        }

        const subscription = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });

        return () => subscription.unsubscribe();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
});

// --------------------------------------------------
// GraphQL HTTP link
// --------------------------------------------------

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

// --------------------------------------------------
// Network error handling
// --------------------------------------------------

const errorLink = new ApolloLink((operation, forward) => {
  return new Observable((observer) => {
    const subscription = forward(operation).subscribe({
      next: observer.next.bind(observer),

      error: (error) => {
        console.log('Apollo Network Error:', error);

        // Network / fetch failure
        if (
          error?.message?.toLowerCase().includes('fetch') ||
          error?.message?.toLowerCase().includes('network') ||
          error?.message?.toLowerCase().includes('internet')
        ) {
          observer.error(
            new Error(
              'No internet connection. Please check your internet connection and try again.'
            )
          );

          return;
        }

        observer.error(error);
      },

      complete: observer.complete.bind(observer),
    });

    return () => subscription.unsubscribe();
  });
});

// --------------------------------------------------
// Apollo Client
// --------------------------------------------------

export const client = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),

  cache: new InMemoryCache(),
});
