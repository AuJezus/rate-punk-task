"use client";

import type { TypedDocumentNode } from "./gqlT";
import { fetchGQL } from "./fetchGQL";

export function makeQueryFn<T, V = Record<string, unknown>>(
  query: TypedDocumentNode<T, V>,
  variables: V = {} as V
) {
  return async (): Promise<T> => {
    return await fetchGQL<T, V>(query, variables);
  };
}
