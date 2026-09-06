/**
 * Interface representing normalized resume links for embedding, viewing, and downloading.
 */
export interface ResolvedResumeUrls {
  rawUrl: string;
  previewUrl: string;
  downloadUrl: string;
  viewUrl: string;
  isGoogleDrive: boolean;
  filename: string;
}

/**
 * Extracts Google Drive file ID from common Google Drive URL patterns:
 * - https://drive.google.com/file/d/<id>/view...
 * - https://drive.google.com/file/d/<id>
 * - https://drive.google.com/open?id=<id>
 * - https://drive.google.com/uc?id=<id>
 * - https://docs.google.com/document/d/<id>/...
 */
export function extractGoogleDriveFileId(url: string): string | null {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();

  const isGoogleHost = /drive\.google\.com|docs\.google\.com/.test(trimmed);
  if (!isGoogleHost) return null;

  // Format: /file/d/<id> or /d/<id>
  const pathMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (pathMatch && pathMatch[1]) return pathMatch[1];

  // Format: id=<id> or fileId=<id>
  const queryMatch = trimmed.match(/[?&](?:id|fileId)=([a-zA-Z0-9_-]+)/);
  if (queryMatch && queryMatch[1]) return queryMatch[1];

  return null;
}

/**
 * Resolves any resume URL (Google Drive, Cloudinary/S3, relative or external direct PDF)
 * into appropriate preview (for iframe), download, and open URLs.
 */
export function resolveResumeUrls(rawUrl: string): ResolvedResumeUrls {
  const trimmed = (rawUrl || "").trim();

  if (!trimmed) {
    return {
      rawUrl: "",
      previewUrl: "",
      downloadUrl: "",
      viewUrl: "",
      isGoogleDrive: false,
      filename: "resume.pdf",
    };
  }

  const driveId = extractGoogleDriveFileId(trimmed);
  if (driveId) {
    return {
      rawUrl: trimmed,
      // Google Drive's official embed player allows iframe embedding without SAMEORIGIN blocking
      previewUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      // Direct download query
      downloadUrl: `https://drive.google.com/uc?export=download&id=${driveId}`,
      viewUrl: `https://drive.google.com/file/d/${driveId}/view`,
      isGoogleDrive: true,
      filename: "resume.pdf",
    };
  }

  // Derive a friendly filename from URL if possible
  let filename = "resume.pdf";
  try {
    const urlObj = new URL(trimmed, "http://localhost");
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart.toLowerCase().endsWith(".pdf")) {
      filename = decodeURIComponent(lastPart);
    }
  } catch {
    // Keep default filename
  }

  return {
    rawUrl: trimmed,
    previewUrl: trimmed,
    downloadUrl: trimmed,
    viewUrl: trimmed,
    isGoogleDrive: false,
    filename,
  };
}
