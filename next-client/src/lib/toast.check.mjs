import assert from "node:assert/strict";
import { toast } from "./toast.ts";

console.log("[CHECK] Testing toast.api with backend responseHandler payloads...");

// 1. Test success payload: res.success = (data, message, statusCode) => { success: 1, message, data }
const successPayload = {
  success: 1,
  message: "Message created successfully",
  data: { id: "123", fullName: "Test User" },
};
const successResult = toast.api(successPayload);
assert.equal(successResult.success, true);
assert.deepEqual(successResult.data, successPayload.data);

// 2. Test error payload: res.error = (message, statusCode, error) => { success: 0, message, error }
const errorPayload = {
  success: 0,
  message: "Validation error",
  error: ["Full name is required", "Email is required"],
};
const errorResult = toast.api(errorPayload);
assert.equal(errorResult.success, false);
assert.deepEqual(errorResult.error, errorPayload.error);

// 3. Test Axios/fetch response error wrapper: { response: { data: { success: 0, message: "Too many requests" } } }
const axiosErrorPayload = {
  response: {
    data: {
      success: 0,
      message: "Too many requests from this IP",
    },
  },
};
const axiosResult = toast.api(axiosErrorPayload);
assert.equal(axiosResult.success, false);

// 4. Test standard Error instance
const errorObj = new Error("Network offline");
const errObjResult = toast.api(errorObj);
assert.equal(errObjResult.success, false);
assert.equal(errObjResult.error, "Network offline");

// 5. Test toast.dismiss()
toast.dismiss();

console.log("[CHECK] All toast.api assert checks passed successfully ✓");
