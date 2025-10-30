import { print, type DocumentNode } from "graphql";
import gql from "graphql-tag";

export type TypedDocumentNode<
  Result = unknown,
  Variables = Record<string, unknown>,
> = DocumentNode & { __resultType?: Result; __variablesType?: Variables };

export type MappedDocument<
  TData,
  TVariables,
  TSelected = TData,
  TUserVariables = TVariables,
> = TypedDocumentNode<TData, TVariables> & {
  __select?: (data: TData) => TSelected;
  __mapVariables?: (vars: TUserVariables) => TVariables;
};

export interface GraphQLErrorDetail {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: Array<string | number>;
  extensions?: {
    code?: string;
    stacktrace?: string[];
    originalError?: {
      message?: string | string[];
      error?: string;
      statusCode?: number;
    };
  };
}

export interface GraphQLResponse<T> {
  data: T | null;
  errors?: GraphQLErrorDetail[];
}

export function gqlT<Result = unknown, Variables = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...expr: Array<string | number | DocumentNode>
): TypedDocumentNode<Result, Variables> {
  return gql(strings, ...expr) as unknown as TypedDocumentNode<
    Result,
    Variables
  >;
}

export function withGqlMapping<
  TData,
  TVariables,
  TSelected = TData,
  TUserVariables = TVariables,
>(
  doc: TypedDocumentNode<TData, TVariables>,
  mapping: {
    select?: (data: TData) => TSelected;
    mapVariables?: (vars: TUserVariables) => TVariables;
  },
): MappedDocument<TData, TVariables, TSelected, TUserVariables> {
  const augmented = doc as unknown as MappedDocument<
    TData,
    TVariables,
    TSelected,
    TUserVariables
  >;
  if (mapping.select) augmented.__select = mapping.select;
  if (mapping.mapVariables) augmented.__mapVariables = mapping.mapVariables;
  return augmented;
}

export class GraphQLError extends Error {
  public readonly errors: GraphQLErrorDetail[];
  public readonly response: GraphQLResponse<unknown>;

  constructor(
    errors: GraphQLErrorDetail[],
    response: GraphQLResponse<unknown>,
  ) {
    const message = GraphQLError.extractMessage(errors);
    super(message);

    this.name = "GraphQLError";
    this.errors = errors;
    this.response = response;
  }

  public static extractMessage(errors: GraphQLErrorDetail[]): string {
    if (errors.length === 0) return "Unknown GraphQL error";

    const firstError = errors[0];

    if (firstError.extensions?.originalError) {
      const originalError = firstError.extensions.originalError;

      if (Array.isArray(originalError.message)) {
        return originalError.message.join(", ");
      }

      if (originalError.message) {
        return originalError.message;
      }
    }

    return firstError.message;
  }

  get code(): string | undefined {
    return this.errors[0]?.extensions?.code;
  }

  get statusCode(): number | undefined {
    return this.errors[0]?.extensions?.originalError?.statusCode;
  }
}

export const fetchGQL = async <T, V = Record<string, unknown>>(
  query: TypedDocumentNode<T, V>,
  variables = {} as V,
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: print(query),
        variables,
      }),
    },
  );

  const result: GraphQLResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  if (result.errors && result.errors.length > 0) {
    throw new GraphQLError(result.errors, result);
  }

  return result?.data as T;
};

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

export const fetchGQLMapped = async <
  TDoc extends DocLike,
  TSelected = SelectedOf<TDoc>,
  TUserVariables = UserVariablesOf<TDoc>,
>(
  query: TDoc,
  options: {
    variables?: TUserVariables;
    mapVariables?: (vars: TUserVariables) => VariablesOf<TDoc>;
    select?: (data: ResultOf<TDoc>) => TSelected;
  } = {},
): Promise<TSelected> => {
  const { variables, mapVariables, select } = options;

  const effectiveSelect = (select ?? (query as any).__select) as
    | ((data: ResultOf<TDoc>) => TSelected)
    | undefined;
  const effectiveMapVariables = (mapVariables ??
    (query as any).__mapVariables) as
    | ((vars: TUserVariables) => VariablesOf<TDoc>)
    | undefined;

  const apiVariables = (
    effectiveMapVariables
      ? effectiveMapVariables(
          (variables ?? ({} as TUserVariables)) as TUserVariables,
        )
      : ((variables ?? ({} as VariablesOf<TDoc>)) as VariablesOf<TDoc>)
  ) as VariablesOf<TDoc>;

  const raw = await fetchGQL<ResultOf<TDoc>, VariablesOf<TDoc>>(
    query,
    apiVariables,
  );
  return (
    effectiveSelect ? effectiveSelect(raw) : (raw as unknown as TSelected)
  ) as TSelected;
};
