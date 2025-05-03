import axios from "axios";
export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

export type ReactionType = "LOVE" | "ADMIRE" | "FIRE" | "CLAP";

export interface ReactionsResponseType {
  counts: Record<ReactionType, number>;
  yourReaction: ReactionType | null;
}

// GET
export function getReactions(imageId: string, userId?: string) {
  return api.get<ReactionsResponseType>(`/reactions/${imageId}`, {
    headers: userId ? { userid: userId } : undefined,
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
