export const getRoomId = (userId: string, otherUserId: string) => {
  const sortedIds = [userId, otherUserId].sort();
  const roomId = sortedIds.join('-');
  return roomId;
};
