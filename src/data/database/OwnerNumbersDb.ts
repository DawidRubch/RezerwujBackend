import db from "../../core/DbConfig/firebase";

class OwnerNumbersDataBase {
  collection = "OwnerNumbers";

  getOwnerNumberByRoPName = async (ropName: string): Promise<string | null> => {
    const { docs } = await db.collection(this.collection).get();
    for (const doc of docs) {
      if (doc.id === ropName) return doc.data().ownerNumber;
    }
    return null;
  };
}

export default new OwnerNumbersDataBase();
