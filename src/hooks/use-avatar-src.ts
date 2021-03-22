import { useMemo } from "react";

import { UserFieldsFragment } from "../graphql/types";
import { generateAvatarSvg } from "../utils/generate-avatar";

export const useAvatarSrc = (
  user?: UserFieldsFragment | null
): string | undefined =>
  useMemo(() => (user ? generateAvatarSvg(user.id) : undefined), [user]);
