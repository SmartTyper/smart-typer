const getKeyFromObjectLocation = (location: string): string => {
  return location.split('amazonaws.com/').pop() as string;
};

export { getKeyFromObjectLocation };
