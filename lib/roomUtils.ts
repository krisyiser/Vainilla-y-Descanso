export function getCanonicalRoomId(rawRoomId: string | number): string {
  const roomMap: Record<string, string> = {
    '201': '101', '101': '101', 'moros': '101',
    '202': '102', '102': '102', 'volador': '102',
    '203': '103', '103': '103', 'guagua': '103',
    '204': '104', '104': '104', 'negritos': '104',
    '205': '105', '105': '105', 'santiagueros': '105',
  };
  const key = String(rawRoomId || '').toLowerCase().trim();
  return roomMap[key] || '101';
}
