import connect from "./connect.js";

const schoolCollection = connect().collection("schools");

export const getAllSchools = async () => {
  try {
    const snapshot = await schoolCollection.get();
    const result = snapshot.docs.map((doc) => {
      const school = doc.data();
      school.id = doc.id;
      return school;
    });

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const createschool = async (school) => {
  try {
    const result = await schoolCollection.add(school);
    school.id = result.id;
    return school;
  } catch (error) {
    console.error(error);
  }
};
