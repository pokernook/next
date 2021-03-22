import { useMeQuery, UserFieldsFragment } from "../graphql/types";

export const useUser = (): UserFieldsFragment | null | undefined => {
  const [meQuery] = useMeQuery();
  const { data } = meQuery;

  return data?.me;
};
