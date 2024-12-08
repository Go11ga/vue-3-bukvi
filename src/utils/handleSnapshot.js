const handleSnapshot = (snapshot) => {
  const arr = [];

  snapshot.forEach((doc) => {
    arr.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return arr;
};

export default handleSnapshot;
