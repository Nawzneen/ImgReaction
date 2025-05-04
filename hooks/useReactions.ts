import { ReactionsResponseType, getReactions } from "@/api/reactions";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
export function useReactions(imageId: string, userId?: string) {
  return useQuery<
    ReactionsResponseType,
    AxiosError,
    ReactionsResponseType,
    readonly ["reactions", string, string | undefined]
  >({
    queryKey: ["reactions", imageId, userId] as const,
    queryFn: () => getReactions(imageId, userId),
    enabled: true,
    initialData: {
      counts: {
        LOVE: 0,
        ADMIRE: 0,
        FIRE: 0,
        CLAP: 0,
      },
      yourReaction: null,
    },
  });
}
