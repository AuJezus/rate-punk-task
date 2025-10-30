import type { DocumentNode } from "graphql";
import gql from "graphql-tag";

export type TypedDocumentNode<
  Result = unknown,
  Variables = Record<string, unknown>,
> = DocumentNode & { __resultType?: Result; __variablesType?: Variables };

export function gqlT<Result = unknown, Variables = Record<string, unknown>>(
  strings: TemplateStringsArray,
  ...expr: Array<string | number | DocumentNode>
): TypedDocumentNode<Result, Variables> {
  return gql(strings, ...expr) as unknown as TypedDocumentNode<
    Result,
    Variables
  >;
}
