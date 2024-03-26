export const getRoomId = (userId: string, otherUserId: string) => {
  const sortedIds = [userId, otherUserId].sort();
  const roomId = sortedIds.join('-');
  return roomId;
};

export const getGroupRoomId = (usersId: string[]) => {
  const sortedIds = usersId.sort();
  const roomId = sortedIds.join('-');
  return roomId;
};
