import { getAllBoardsResult } from "../lib/boards";

const { boards, errors } = getAllBoardsResult();

if (boards.length === 0 && errors.length === 0) {
  console.warn("No boards found in content/boards/.");
}

for (const board of boards) {
  const status = board.metadata.published ? "published" : "draft";
  console.log(`✔ ${board.slug} (${status})`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} board(s) failed validation:\n`);
  for (const error of errors) {
    console.error(`✘ ${error.slug}: ${error.message}`);
  }
  process.exit(1);
}

console.log(`\n${boards.length} board(s) valid.`);
