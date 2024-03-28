export const getRoomId = (userId: string, otherUserId: string) => {
  const sortedIds = [userId, otherUserId].sort((a, b) => a.localeCompare(b));
  const roomId = sortedIds.join('-');
  return roomId;
};
