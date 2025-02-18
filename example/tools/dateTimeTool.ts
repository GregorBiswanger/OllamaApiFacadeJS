import { tool } from "@langchain/core/tools";
import { z } from "zod";

// Schema für das Tool (keine Eingaben, Rückgabe ist ein String)
const dateTimeSchema = z.object({}).describe("Returns the current date and time as a string.");

function dateTime() {
  const options = { timeZone: "Europe/Berlin", hour12: false };
  return new Date().toLocaleString("de-DE", options);
}

export const dateTimeTool = tool(dateTime, {
  name: "dateTimeTool",
  description: "Returns the current date and time in the Europe/Berlin timezone.",
  schema: dateTimeSchema, // Korrektes Schema für ein Tool ohne Parameter
});
