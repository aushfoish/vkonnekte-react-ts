import { nameDeclension } from "@/entities/user/lib/nameDeclesion";
import { expect, it, describe } from "vitest";

describe("formatName", () => {
  it("Должен правильно просклонять введённые имена", () => {
    expect(nameDeclension("Роман")).toBe("Романа");
    expect(nameDeclension("Аркадий")).toBe("Аркадия");
    expect(nameDeclension("Игорь")).toBe("Игоря");
    expect(nameDeclension("Дима")).toBe("Димы");
  });
  it("Должен правильно просклонять введённые имена-исключения", () => {
    expect(nameDeclension("Пётр")).toBe("Петра");
    expect(nameDeclension("Лев")).toBe("Льва");
  })

});