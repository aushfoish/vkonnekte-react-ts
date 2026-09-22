// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest"
import { handleFileReader } from "./useFileReader";
import { imageCompression } from "@/shared/api/compressImage";

vi.mock("@/shared/api/compressImage", () => ({
  imageCompression: vi.fn(),
}));

describe("handleFileReader", () => {
  it("должен очистить инпут и вернуть false, если файл превышает 2 МБ", async () => {
    const bigBlob = new Blob([new Uint8Array(3 * 1024 * 1024)]);
    const largeFile = new File([bigBlob], "photo.jpg", { type: "image/jpeg" });

    const mockInput = {
      files: [largeFile],
      value: "C:\\fakepath\\photo.jpg",
    } as unknown as HTMLInputElement;

    const mockEvent = {
      currentTarget: mockInput,
    } as React.ChangeEvent<HTMLInputElement>;

    const result = await handleFileReader(mockEvent, "jpg", 100, 100);

    expect(mockInput.value).toBe(""); 
    expect(result).toBe(null);
  });

  it("должен вернуть строку со сжатым изображением, если файл валидный", async () => {
    const smallBlob = new Blob([new Uint8Array(1024)]);
    const smallFile = new File([smallBlob], "mini.jpg", { type: "image/jpeg" });

    const mockInput = {
      files: [smallFile],
      value: "C:\\fakepath\\mini.jpg",
    } as unknown as HTMLInputElement;

    const mockEvent = {
      currentTarget: mockInput,
    } as React.ChangeEvent<HTMLInputElement>;

    vi.mocked(imageCompression).mockResolvedValue("mock_base64_string");

    const result = await handleFileReader(mockEvent, "jpg", 100, 100);

    expect(result).toBe("mock_base64_string");
    expect(mockInput.value).toBe("C:\\fakepath\\mini.jpg"); // Строка с файлом осталась
  });
}); 
