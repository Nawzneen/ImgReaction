import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});

export type ReactionType = "LOVE" | "ADMIRE" | "FIRE" | "CLAP";

export interface ReactionsResponseType {
  counts: Record<ReactionType, number>;
  userReaction: ReactionType | null;
}

// GET
export function getReactions(imageId: string, userId?: string) {
  return api
    .get<Record<ReactionType, { count: number; hasReacted?: boolean }>>(
      `/reactions/${imageId}`,
      {
        headers: userId ? { userid: userId } : undefined,
      }
    )
    .then((res) => {
      const raw = res.data;
      const counts = (Object.keys(raw) as ReactionType[]).reduce((acc, key) => {
        acc[key] = raw[key].count;
        return acc;
      }, {} as Record<ReactionType, number>);

      let userReaction: ReactionType | null = null;
      if (userId) {
        userReaction =
          (Object.keys(raw) as ReactionType[]).find((r) => raw[r].hasReacted) ||
          null;
      }

      return {
        counts,
        userReaction,
      };
    });
}
// POST
export function addReaction(
  imageId: string,
  reaction: ReactionType,
  userId: string
) {
  return api.post(
    `/reactions/${imageId}/${reaction}`,
    {},
    {
      headers: { userid: userId },
    }
  );
}

// DELETE
export function removeReaction(
  imageId: string,
  reaction: ReactionType,
  userId: string
) {
  return api.delete(`/reactions/${imageId}/${reaction}`, {
    headers: { userid: userId },
  });
}
