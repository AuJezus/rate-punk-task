import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { fetchGQL, TypedDocumentNode, type MappedDocument } from "@/lib/gql";

type DocLike = TypedDocumentNode<any, any> &
  Partial<{
    __select: (data: any) => any;
    __mapVariables: (vars: any) => any;
  }>;

type ResultOf<TDoc extends DocLike> =
  TDoc extends TypedDocumentNode<infer TData, any> ? TData : never;
type VariablesOf<TDoc extends DocLike> =
  TDoc extends TypedDocumentNode<any, infer TVariables> ? TVariables : never;

type SelectedOf<TDoc extends DocLike> = TDoc extends {
  __select?: (data: any) => infer TSelected;
}
  ? TSelected
  : ResultOf<TDoc>;

type UserVariablesOf<TDoc extends DocLike> = TDoc extends {
  __mapVariables?: (vars: infer TUserVars) => any;
}
  ? TUserVars
  : VariablesOf<TDoc>;

export function makeQueryFn<T, V = Record<string, unknown>>(
  query: TypedDocumentNode<T, V>,
  variables: V = {} as V,
) {
  return async (): Promise<T> => {
    return await fetchGQL<T, V>(query, variables);
  };
}

export function makeMutationFn<T, V = Record<string, unknown>>(
  mutation: TypedDocumentNode<T, V>,
) {
  return async (variables: V): Promise<T> => {
    return await fetchGQL<T, V>(mutation, variables);
  };
}

export function useGqlQuery<TDoc extends DocLike, TSelected = SelectedOf<TDoc>>(
  options: {
    key: readonly unknown[];
    document: TDoc;
    variables?: VariablesOf<TDoc>;
  } & Omit<
    UseQueryOptions<ResultOf<TDoc>, Error, TSelected, readonly unknown[]>,
    "queryKey" | "queryFn"
  >,
) {
  const { key, document, variables, ...reactQueryOptions } = options as any;

  const effectiveSelect = ((options as any).select ??
    (document as any).__select) as
    | ((data: ResultOf<TDoc>) => TSelected)
    | undefined;

  return useQuery<ResultOf<TDoc>, Error, TSelected, readonly unknown[]>({
    queryKey: key,
    queryFn: makeQueryFn(document, variables as VariablesOf<TDoc>),
    select: effectiveSelect as any,
    ...reactQueryOptions,
  });
}

export function useGqlMutation<
  TDoc extends DocLike,
  TSelected = SelectedOf<TDoc>,
  TUserVariables = UserVariablesOf<TDoc>,
>(
  options: {
    key: readonly unknown[];
    document: TDoc;
  } & Omit<
    UseMutationOptions<TSelected, Error, TUserVariables, unknown>,
    "mutationKey" | "mutationFn" | "select"
  > & {
      select?: (data: ResultOf<TDoc>) => TSelected;
      mapVariables?: (variables: TUserVariables) => VariablesOf<TDoc>;
    },
) {
  const { key, document, select, mapVariables, ...reactQueryOptions } = options;

  const effectiveSelect = (select ?? (document as any).__select) as
    | ((data: ResultOf<TDoc>) => TSelected)
    | undefined;
  const effectiveMapVariables = (mapVariables ??
    (document as any).__mapVariables) as
    | ((vars: TUserVariables) => VariablesOf<TDoc>)
    | undefined;

  return useMutation<TSelected, Error, TUserVariables>({
    mutationKey: key,
    mutationFn: (async (userVariables: TUserVariables) => {
      const apiVariables = (
        effectiveMapVariables
          ? effectiveMapVariables(userVariables)
          : (userVariables as unknown as VariablesOf<TDoc>)
      ) as VariablesOf<TDoc>;

      const raw = await makeMutationFn<ResultOf<TDoc>, VariablesOf<TDoc>>(
        document,
      )(apiVariables);
      return effectiveSelect
        ? effectiveSelect(raw)
        : (raw as unknown as TSelected);
    }) as (variables: TUserVariables) => Promise<TSelected>,
    ...reactQueryOptions,
  });
}
