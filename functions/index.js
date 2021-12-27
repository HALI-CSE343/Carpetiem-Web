const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

exports.getUsersByCollection = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    var documents = [];
    var temp = [];
    var collectionRef = db.collection(data.collection);
    var allDocuments = await collectionRef.get();
    allDocuments.forEach((doc) => {
      temp.push(doc);
    });
    for (const doc of temp) {
      const userCred = await admin.auth().getUser(doc.id);
      const userInfo = doc.data();
      const user = {
        ...userCred,
        ...userInfo,
      };
      documents.push(user);
    }
    return documents;
  });

exports.deleteUser = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    await admin.auth().deleteUser(data.uid);
  });

exports.createUser = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    const user = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      displayName: "employee",
    });
    db.collection("employees").doc(user.uid).set({
      name: data.name,
      phone: data.phone,
      address: data.addr,
      city: data.city,
      district: data.dist,
      neighborhood: data.nbhd,
    });
  });

exports.getUser = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    /*const userCred = await admin.auth().getUser(data.id);
  const userInfo = (
    await db.collection(data.collection).doc(data.id).get()
  ).data();*/
    const [userCred, userInfo] = await Promise.all([
      admin.auth().getUser(data.id),
      db.collection(data.collection).doc(data.id).get(),
    ]);
    return {
      ...userCred,
      ...userInfo.data(),
    };
  });

exports.getUserByEmail = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    return await admin.auth().getUserByEmail(data.email);
  });

exports.getAllUsers = functions
  .region("europe-west1")
  .https.onCall(async (data, context) => {
    try {
      const users = [];
      var res;
      if (data === "") {
        res = await admin.auth().listUsers(1000);
      } else {
        res = await admin.auth().listUsers(1000, data);
      }
      res.users.forEach((record) => {
        users.push(record.toJSON());
      });
      if (res.pageToken) {
        return users.concat(this.getAllUsers(res.pageToken));
      } else {
        return users;
      }
    } catch (err) {
      throw err;
    }
  });
