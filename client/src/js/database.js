import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  db.put("jate", { content, id: 0 });
};

export const getDb = async () => {
  const db = await initdb();
  const data = await db.get("jate", 0);
  return data.content;
};

initdb();
