import { print } from "graphql";
import type { TypedDocumentNode } from "./gqlT";

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

export class GraphQLError extends Error {
  public readonly errors: GraphQLErrorDetail[];
  public readonly response: GraphQLResponse<unknown>;

  constructor(
    errors: GraphQLErrorDetail[],
    response: GraphQLResponse<unknown>
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
  variables = {} as V
): Promise<T> => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const response = await fetch(`${backendUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: print(query),
      variables,
    }),
  });

  const result: GraphQLResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  if (result.errors && result.errors.length > 0) {
    throw new GraphQLError(result.errors, result);
  }

  return result?.data as T;
};
