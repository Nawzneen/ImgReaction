import {
  ReactionType,
  ReactionsResponseType,
  addReaction,
  getReactions,
  removeReaction,
} from "@/api/reactions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useReactions(imageId: string, userId?: string) {
  const queryClient = useQueryClient();
  const queryKey = ["reactions", imageId, userId];

  const query = useQuery<ReactionsResponseType, Error>({
    queryKey,
    queryFn: () => getReactions(imageId, userId),
    enabled: Boolean(imageId),
  });

  const addMut = useMutation<
    unknown,
    unknown,
    ReactionType,
    { prev: ReactionsResponseType | undefined }
  >({
    mutationFn: (reaction) => addReaction(imageId, reaction, userId!),
    onMutate: async (reaction) => {
      console.log("add reaction clicked on mutate", imageId, reaction, userId);
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData<ReactionsResponseType>(queryKey);

      // 1) delete the any possible old reaction before update
      if (prev?.userReaction) {
        console.log("removing old reaction", prev.userReaction);
        await removeReaction(imageId, prev.userReaction, userId!);
      }
      // 2) set new reaction
      if (prev) {
        const nextCounts = { ...prev.counts };
        if (prev.userReaction) nextCounts[prev.userReaction]--;
        nextCounts[reaction]++;
        queryClient.setQueryData<ReactionsResponseType>(queryKey, {
          counts: nextCounts,
          userReaction: reaction,
        });
      }

      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData(queryKey, context.prev);
      }
    },
    onSettled: () => {
      console.log("💡 onSettled – invalidating");
      queryClient.invalidateQueries({ queryKey }); //refresh after each POST
    },
  });

  const removeMut = useMutation<
    unknown,
    unknown,
    ReactionType,
    { prev: ReactionsResponseType | undefined }
  >({
    mutationFn: (reaction) => removeReaction(imageId, reaction, userId!),
    onMutate: async (reaction) => {
      await queryClient.cancelQueries({ queryKey });
      const prev = queryClient.getQueryData<ReactionsResponseType>(queryKey);
      if (prev) {
        const nextCounts = {
          ...prev.counts,
          [reaction]: prev.counts[reaction] - 1,
        };
        queryClient.setQueryData(queryKey, {
          counts: nextCounts,
          userReaction: null,
        });
      }
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) {
        queryClient.setQueryData(queryKey, context.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    ...query,
    addReaction: addMut.mutate,
    removeReaction: removeMut.mutate,
  };
}
