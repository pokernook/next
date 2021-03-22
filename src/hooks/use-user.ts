import { useRouter } from "next/router";
import { useEffect } from "react";

import { useMeQuery, UserFieldsFragment } from "../graphql/types";

type UseUserArgs = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

type UseUserReturn = {
  user: UserFieldsFragment | null | undefined;
  fetching: boolean;
};

export const useUser = ({
  redirectTo = "",
  redirectIfFound = false,
}: UseUserArgs = {}): UseUserReturn => {
  const router = useRouter();
  const [meQuery] = useMeQuery();
  const { data, fetching } = meQuery;

  useEffect(() => {
    if (!redirectTo || fetching) {
      return;
    }

    if ((!redirectIfFound && !data?.me) || (redirectIfFound && data?.me)) {
      void router.push(redirectTo);
    }
  }, [data?.me, fetching, redirectIfFound, redirectTo, router]);

  return { user: data?.me, fetching };
};
