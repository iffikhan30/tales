// src/apollo.ts
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const GRAPHQL_URL = 'https://www.usemyweb.com/graphql'; // <- replace
const GRAPHQL_URL = 'http://192.168.0.139:8000/graphql'; //WIFI

// auth middleware
const authLink = new ApolloLink((operation, forward) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // null if none
      if (token) {
        operation.setContext(({ headers = {} }: any) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        }));
      }
      resolve(forward(operation));
    } catch (err) {
      reject(err);
    }
  });
});


export const client = new ApolloClient({
  //link: authLink.concat(httpLink),
  link: new HttpLink({
    uri: GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
});
