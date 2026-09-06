import assert from "node:assert/strict";
import { resolveResumeUrls, extractGoogleDriveFileId } from "./resumeUrl.ts";

console.log("[CHECK] Testing resolveResumeUrls with various link formats...");

const TEST_ID = "1vvDlIJRCI9mioIcuGCpy5FUGDuldu6ZT";

// 1. Google Drive direct link
const driveDirect = `https://drive.google.com/file/d/${TEST_ID}`;
const resDirect = resolveResumeUrls(driveDirect);
assert.equal(resDirect.isGoogleDrive, true);
assert.equal(resDirect.previewUrl, `https://drive.google.com/file/d/${TEST_ID}/preview`);
assert.equal(resDirect.downloadUrl, `https://drive.google.com/uc?export=download&id=${TEST_ID}`);
assert.equal(resDirect.viewUrl, `https://drive.google.com/file/d/${TEST_ID}/view`);

// 2. Google Drive sharing link with query params
const driveShare = `https://drive.google.com/file/d/${TEST_ID}/view?usp=sharing`;
const resShare = resolveResumeUrls(driveShare);
assert.equal(resShare.isGoogleDrive, true);
assert.equal(resShare.previewUrl, `https://drive.google.com/file/d/${TEST_ID}/preview`);

// 3. Google Drive open?id=... format
const driveOpen = `https://drive.google.com/open?id=${TEST_ID}`;
const resOpen = resolveResumeUrls(driveOpen);
assert.equal(resOpen.isGoogleDrive, true);
assert.equal(resOpen.previewUrl, `https://drive.google.com/file/d/${TEST_ID}/preview`);

// 4. Generic external PDF URL
const genericPdf = "https://example.com/assets/developer-cv.pdf";
const resGeneric = resolveResumeUrls(genericPdf);
assert.equal(resGeneric.isGoogleDrive, false);
assert.equal(resGeneric.previewUrl, genericPdf);
assert.equal(resGeneric.downloadUrl, genericPdf);
assert.equal(resGeneric.viewUrl, genericPdf);
assert.equal(resGeneric.filename, "developer-cv.pdf");

// 5. Relative / local PDF URL
const relativePdf = "/resume.pdf";
const resRelative = resolveResumeUrls(relativePdf);
assert.equal(resRelative.isGoogleDrive, false);
assert.equal(resRelative.previewUrl, "/resume.pdf");
assert.equal(resRelative.downloadUrl, "/resume.pdf");
assert.equal(resRelative.filename, "resume.pdf");

// 6. Empty or blank input
const empty = resolveResumeUrls("   ");
assert.equal(empty.previewUrl, "");
assert.equal(empty.isGoogleDrive, false);

console.log("[CHECK] All resolveResumeUrls checks passed successfully ✓");
