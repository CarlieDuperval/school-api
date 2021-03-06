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

export const createSchool = async (school) => {
  try {
    const result = await schoolCollection.add(school);
    school.id = result.id;
    return school;
  } catch (error) {
    console.error(error);
  }
};

export const updateSchool = async (id, school) => {
  try {
    await schoolCollection.doc(id).update(school);
    return await getSchoolById(id);
  } catch (error) {
    console.error(error);
  }
};

export const getSchoolById = async (id) => {
  try {
    const result = await schoolCollection.doc(id).get();
    return {
      id: result.id,
      ...result.data(),
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteSchool = async (id) => {
  try {
    await schoolCollection.doc(id).delete();
    return "Schoool deleted"
  } catch (error) {
    res.status(500).send(error)
  }
  }



export const getSchoolByFilter = async schoolFilter => {

  if(!schoolFilter){
    schoolFilter = {}
  }
  const {location, address, name, rating, sport, type } = schoolFilter

  let query = schoolCollection
  if(location){
    query = query.where("location", "==", location)
  }

  if(address){
    query = query.where("location", "==", address)
  }

  if(name){
    query = query.where("name", "==", name)
  }
  if(rating){
    query = query.where("rating", "==", rating)
  }
  if(sport){
    query = query.where("sport", "==", sport)
  }
  if(type){
    query = query.where("type", "==", type)
  }
  try {
    const snapshot = await query.get()
    const result = snapshot.docs.map((doc) => {
      const school = doc.data();
      school.id = doc.id
      return school;
    });
    return result;
  } catch (error) {
    console.error(error)
    
  }



}



