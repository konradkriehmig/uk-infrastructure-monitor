import { AltcoinPositionsBackingDataSet } from "@ontology/sdk";
import { Client } from "@osdk/client";
import { createEditBatch, Edits } from "@osdk/functions";
import { UserFacingError } from "@osdk/functions";

type OntologyEdit = Edits.Object<AltcoinPositionsBackingDataSet>;

async function increaseDOGE(client: Client): Promise<OntologyEdit[]> {
  // Fetch the Dogecoin position object
  const doge = await client(AltcoinPositionsBackingDataSet).fetchOne("doge");

  if (!doge) {
    throw new UserFacingError("Dogecoin position not found.");
  }

  // Parse current position and add x 
  const currentPosition = Number(doge.position ?? "0");
  if (isNaN(currentPosition)) {
    throw new UserFacingError(
      "Current Dogecoin position is not a valid number."
    );
  }
  let newPosition = currentPosition + 10000000;

  if (newPosition < 0) {
    newPosition = 0;
  }

  // Update the position
  const batch = createEditBatch<OntologyEdit>(client);
  batch.update(doge, { position: newPosition });

  return batch.getEdits();
}

export default increaseDOGE;
