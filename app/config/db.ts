// lib/mongodb.ts or utils/db.ts

import { connectToDatabase } from "@/utils/mongodb";

export const ConnectDB = async () => {
  await connectToDatabase();
};
